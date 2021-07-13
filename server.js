"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userModel = require("./Schema");
const server = express();
server.use(cors());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function seedUserCollection() {
  const omar = new userModel({
    email: "omx302@gmail.com",
    books: [
      {
        name: "The Growth Mindset",
        description:
          "Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.",
        status: "FAVORITE FIVE",
        img: "https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg",
      },
      {
        name: "The Momnt of Lift",
        description:
          "Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.",
        status: "RECOMMENDED TO ME",
        img: "https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg",
      },
    ],
  });
  const razan = new userModel({
    email: "r.alquran@ltuc.com",
    books: [
      {
        name: "The Growth Mindset",
        description:
          "Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.",
        status: "FAVORITE FIVE",
        img: "https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg",
      },
      {
        name: "The Momnt of Lift",
        description:
          "Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.",
        status: "RECOMMENDED TO ME",
        img: "https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg",
      },
    ],
  });

  omar.save();
  razan.save();
}
// seedUserCollection();

server.get("/books", getUserBooks);

function getUserBooks(req, res) {
  let userEmail = req.query.email;
  userModel.find({ email: userEmail }, function (error, userData) {
    if (error) {
      res.send("did not work");
    } else {
      res.send(userData[0].books);
    }
  });
}
const PORT = process.env.PORT || 3002;

server.get("/test", (request, response) => {
  response.send("OK");
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
