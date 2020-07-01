import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import mongo from '../config/mongo.js';
// dotenv.config();


try {
  mongoose.connect('mongodb://localhost:27017/mybankapi-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log("MongoDB Connected");

} catch (err) {
  console.log("Problema na conexão com o MongoDB:");
  console.log(err);
}

mongoose.Promise = global.Promise;

export default mongoose;