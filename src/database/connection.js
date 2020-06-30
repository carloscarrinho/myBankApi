import mongoose from 'mongoose';

try {
  mongoose.connect();
  console.log("MongoDB Connected");

} catch (err) {
  console.log(err);
  
}