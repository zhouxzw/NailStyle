const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  name: String,
  date: String,
  service: String,
  technician: String,
  phone: String,
  time: String,
  email: String,
});

module.exports = mongoose.model("Booking", BookingSchema);
