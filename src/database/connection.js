import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mongo from '../config/mongo.js';

dotenv.config();

try {
  mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.database}`, mongo.options);
  console.log("MongoDB Connected");

} catch (err) {
  console.log(err);
}

export default mongoose;