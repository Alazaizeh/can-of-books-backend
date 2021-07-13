"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userModel = require("./Schema");
const server = express();
server.use(cors());

server.use(express.json());

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

  // omar.save();
  // razan.save();
}
// seedUserCollection();

server.get("/books", getUserBooks);

function getUserBooks(req, res) {
  let userEmail = req.query.email;
  userModel.find({ email: userEmail }, (error, userData) => {
    if (error) {
      res.send("did not work");
    } else {
      res.send(userData[0].books);
    }
  });
}
const PORT = process.env.PORT || 3002;

// localhost:3001/addCat?catName=fluffy&catBreed=baldi&ownerName=razan
server.post("/addBook", addBookHandler);

function addBookHandler(req, res) {
  console.log(req);
  let { name, description, status, img } = req.body;

  userModel.find({ email: req.query.email }, (error, ownerData) => {
    if (error) {
      res.send("cant find user");
    } else {
      ownerData[0].books.push({
        name: name,
        description: description,
        status: status,
        img: img,
      });
      // console.log("after adding", ownerData[0]);
      ownerData[0].save();
      res.send(ownerData[0].books);
    }
  });
}

// localhost:3001/deleteCat/1?ownerName=razan
server.delete("/deleteBook/:bookId", deleteBookHandler);

function deleteBookHandler(req, res) {
  let index = Number(req.params.bookId);
  console.log(index);
  console.log(req.query.email);

  userModel.find({ email: req.query.email }, (error, ownerData) => {
    if (error) {
      res.send("cant find user");
    } else {
      console.log("before deleting", ownerData[0].books);

      let newCatsArr = ownerData[0].books.filter((book, idx) => idx !== index);
      ownerData[0].books = newCatsArr;
      console.log("after deleting", ownerData[0].books);
      ownerData[0].save();
      res.send(ownerData[0].books);
    }
  });
}

server.get("/test", (request, response) => {
  response.send("OK");
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
