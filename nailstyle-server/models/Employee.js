const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
