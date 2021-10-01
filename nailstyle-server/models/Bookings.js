const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  name: String,
  date: String,
  service: String,
  technician: String,
  phone: String,
});

module.exports = mongoose.model("Booking", BookingSchema);
