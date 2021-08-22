const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("Admin", AdminSchema);
