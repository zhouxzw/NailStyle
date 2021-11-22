const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dateofhire: String,
  availability: [
    {
      _id: false,
      month: { type: String },
      days: [
        {
          _id: false,
          isBooked: { type: Boolean, default: false },
          date: String,
          timeSlots: {
            type: Array,
            default: [
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
            ],
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
