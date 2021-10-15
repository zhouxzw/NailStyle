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

//route (update and insert) that checks finds a customer by phone number and updates their appointments
//if the customer doesn't exist add her to the collection
router.patch("/processappointment", async (req, res) => {
  try {
    const appendVisit = await Customer.updateOne(
      { phone: req.body.phone },
      {
        name: req.body.name,
        $push: {
          visits: [
            {
              appointment: {
                date: req.body.visits[0].appointment.date,
                service: req.body.visits[0].appointment.service,
                technician: req.body.visits[0].appointment.technician,
                price: req.body.visits[0].appointment.price,
              },
            },
          ],
        },
      },
      { upsert: true }
    );
    res.json(appendVisit);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/admin/book", async (req, res) => {
  const booking = new Booking({
    name: req.body.name,
    date: req.body.date,
    service: req.body.service,
    technician: req.body.technician,
    phone: req.body.phone,
    time: req.body.time,
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

//route to get all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.json({ message: error });
  }
});

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

//delete a booking
//using query here because of axios params in front end
router.delete("/deletebooking", async (req, res) => {
  try {
    const removeBook = await Booking.deleteOne({ phone: req.query.phone });
    res.json(removeBook);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
