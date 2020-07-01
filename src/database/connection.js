import mongoose from "mongoose";
import mongo from "../config/mongo.js";

try {
  mongoose.connect(process.env.CON_STR, mongo.options);
  console.log("MongoDB Connected");
} catch (err) {
  console.log("Problema na conexão com o MongoDB:");
  console.log(err);
}

mongoose.Promise = global.Promise;

export default mongoose;
