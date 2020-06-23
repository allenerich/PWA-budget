
const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

//Set reference to express server.
const app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set static to public so all file extensions can begin from public.
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//Set up Mongo database.
const databaseUrl = process.env.MONGODB_URI || "budget";
const collections = ["budget"];

//Set reference to our database.
const db = mongojs(databaseUrl, collections);

//If there is an  error with the database, throw it.
db.on("error", error => {
  console.log("Database Error:", error);
});


app.use(require("./routes/api.js"));




const PORT = process.env.PORT || 3550;


app.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT}`);
});