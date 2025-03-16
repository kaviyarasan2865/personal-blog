import 'dotenv/config';
import { connect } from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Explicitly declare that we expect this to be a string
const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function seedAdmin() {
  await connect(MONGODB_URI);

  const adminEmail = 'kavikarpagam6@gmail.com';
  const adminPassword = 'password123';


  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const newAdmin = new User({ email: adminEmail, password: hashedPassword });
    await newAdmin.save();
    console.log('User seeded:', adminEmail);
  } else {
    console.log('Admin already exists.');
  }

  process.exit();
}

seedAdmin().catch(console.error);