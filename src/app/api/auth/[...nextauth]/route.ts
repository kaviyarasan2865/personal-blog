import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs"


const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email:{label:"Email", type:"email"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
                try{
                    if(!credentials?.email || !credentials?.password){
                        throw new Error('Please provide both email and password')
                    }

                    await connectDB();
                    const user = await User.findOne({email:credentials.email})

                    if(!user){
                        throw new Error('user not found')
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if(!isPasswordValid){
                        throw new Error('Invalid Password')
                    }

                    return {id:user._id.toString(), email:user.email, authProvider:user.authProvider};

                }catch(error){
                    console.error('\n❌ Manual Login Error:', error);
                    throw error;
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id;
                token.email = user.email;
                token.authProvider = user.authProvider;
            }   
            return token;

        },
    async session({session,token}){
        if(session.user){
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.authProvider = token.authProvider;
        }
        return session;
    },
},
secret:process.env.NEXTAUTH_SECRET,
session:{
    strategy:'jwt',
}
})

export { handler as GET, handler as POST }