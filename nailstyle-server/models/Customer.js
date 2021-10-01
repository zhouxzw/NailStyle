const mongoose = require("mongoose");

const Appointments = mongoose.Schema({
  _id: false,
  appointment: { date: String, service: String, technician: String },
});

const CustomerSchema = mongoose.Schema({
  name: String,
  phone: String,
  visits: [Appointments],
});

module.exports = mongoose.model("Customer", CustomerSchema);
