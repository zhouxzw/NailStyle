const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dateofhire: String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
