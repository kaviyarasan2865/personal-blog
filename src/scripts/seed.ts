import dotenv from 'dotenv';
dotenv.config();


import connectDB from '../utils/mongodb';
import User from '../models/User';

async function seedAdmin() {
  await connectDB();

  const adminEmail = 'kavikarpagam6@gmail.com';
  const adminPassword = 'password123';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const newAdmin = new User({ email: adminEmail, password: adminPassword });
    await newAdmin.save();
    console.log('User seeded:', adminEmail);
  } else {
    console.log('Admin already exists.');
  }

  process.exit();
}

seedAdmin();