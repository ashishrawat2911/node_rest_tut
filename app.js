const express = require("express");
const mongose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
app.use(bodyParser.json());
const postsRoute = require("./routes/posts");

//Connncet the db
mongose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connect to db");
  }
);

//Get the default connection
var db = mongose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/posts", postsRoute);

//Middlewares
app.use("/", () => {
  console.log("this is middle ware hosts");
});

app.listen(3000);
