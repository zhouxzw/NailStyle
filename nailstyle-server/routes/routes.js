const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const cors = require("cors");
const Customer = require("../models/Customer");
const Booking = require("../models/Bookings");

/*

CORS BLOCKING

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
});*/

/*
router.post("/register", (req, res) => {
  Admin.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newAdmin = new Admin({
        username: req.body.username,
        password: hashPassword,
      });
      await newAdmin.save();
      res.send("User Created");
    }
  });
});
*/

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("true");
        console.log("data", req.user);
      });
    }
  })(req, res, next);
});

//route that checks if a customer is in the database...
router.post("/confirmappointment", async (req, res) => {
  try {
    const customer = await Customer.find({ phone: req.body.phone });
    if (customer.length != 0) {
      console.log("Found customer");
      res.json(customer);
    } else {
      //create new customer
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/book", async (req, res) => {
  const booking = new Booking({
    name: req.body.name,
    date: req.body.date,
    service: req.body.service,
    technician: req.body.technician,
    phone: req.body.phone,
  });
  try {
    const saveBooking = await booking.save();
    res.json(saveBooking);
  } catch (error) {
    res.json({ message: error });
  }
});

//get all bookings
/*
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.json({ message: error });
  }
});
*/

//get bookings based on date
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({ date: req.query.date });
    console.log("Data", bookings);
    res.json(bookings);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
