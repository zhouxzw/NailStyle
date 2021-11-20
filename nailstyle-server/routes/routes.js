const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Customer = require("../models/Customer");
const Booking = require("../models/Bookings");
const bcrypt = require("bcrypt");
require("dotenv/config");
const Employee = require("../models/Employee");

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

//clears the cookie
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.post("/register", (req, res) => {
  Admin.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const newAdmin = new Admin({
        username: req.body.username,
        password: hashPassword,
      });
      await newAdmin.save();
      res.send("User Created");
    }
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await Admin.find({
      username: req.body.username,
    });

    console.log("*user", user);

    //compare password with hashed password
    if (user) {
      const correctPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (!correctPassword) {
        return res.status(401).json({ error: "Wrong Email or Password!" });
      }
      //sign a token
      const token = jwt.sign({ id: user[0]._id }, process.env.KEY);

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send();
    }
  } catch (error) {
    res.json(error);
  }
});

//verify middleware to protect our api routes
const verify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      const verifiedAdmin = jwt.verify(token, process.env.KEY);

      //add user into request obj
      req.user = verifiedAdmin.id;
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    } else {
      jwt.verify(token, process.env.KEY);
      res.send(true);
    }
  } catch (error) {
    return res.json(false);
  }
});

//route (update and insert) that checks finds a customer by phone number and updates their appointments
//if the customer doesn't exist add her to the collection
router.patch("/processappointment", verify, async (req, res) => {
  try {
    const appendVisit = await Customer.updateOne(
      { phone: req.body.phone },
      {
        name: req.body.name,
        email: req.body.email,
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
    email: req.body.email,
  });
  try {
    const saveBooking = await booking.save();
    res.json(saveBooking);
  } catch (error) {
    res.json({ message: error });
  }
});

// add new employee
router.post("/employees", async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dateofhire: req.body.dateofhire,
  });
  try {
    const saveEmployee = await employee.save();
    res.json(saveEmployee);
  } catch (e) {
    res.json({ message: e });
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
router.get("/customers", verify, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.json({ message: error });
  }
});

//get bookings based on date
router.get("/bookings", verify, async (req, res) => {
  try {
    const bookings = await Booking.find({ date: req.query.date });
    console.log("Data", bookings);
    res.json(bookings);
  } catch (error) {
    //res.json({ message: error });
    res.status(403).json("You are not allowed get bookings");
  }
});

//delete a booking
//using query here because of axios params in front end
router.delete("/deletebooking", verify, async (req, res) => {
  try {
    const removeBook = await Booking.deleteOne({ phone: req.query.phone });
    res.json(removeBook);
  } catch (error) {
    res.json({ message: error });
  }
});

// get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
