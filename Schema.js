const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  img: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  books: [booksSchema],
});

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
