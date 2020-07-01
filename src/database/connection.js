import mongoose from "mongoose";
import mongo from "../config/mongo.js";

try {
  mongoose.connect(
    `mongodb://${mongo.host}:${mongo.port}/${mongo.dbname}`,
    mongo.options
  );
  console.log("MongoDB Connected");
} catch (err) {
  console.log("Problema na conexão com o MongoDB:");
  console.log(err);
}

mongoose.Promise = global.Promise;

export default mongoose;
