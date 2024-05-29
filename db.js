const mongoose = require("mongoose");
// require("dotenv").config();

const mongoURL = "mongodb://127.0.0.1:27017/voting";
// const mongoURL =
// "mongodb+srv://22bcs206:Vampire@1@cluster0.m3hubuf.mongodb.net/studentdb";
//const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.once("error", (err) => {
  console.error("mongodb connection error: ", err);
});

db.on("diconnected", () => {
  console.log("MongoDb discconnected");
});
module.exports = db;
