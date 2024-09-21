import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  // only field specified in my schema will be saved in DB
  mongoose.set('strictQuery', true);

  if (connected) {
    console.log('MongoDB is connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
