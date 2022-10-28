import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";
import Mongoose from "mongoose";
import MongoConfig from './config/MongoDBConfig.js'
// 2 lines below connect to MongoDB
Mongoose.Promise = global.Promise;
Mongoose.connect(MongoConfig.mongodb.uri)


const app = express();
app.use(express.json());
app.use(cors());
app.use(Router);

let port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running at http://localhost:3000'));

