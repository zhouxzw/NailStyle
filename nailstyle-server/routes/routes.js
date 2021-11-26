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

function addMonths(date, months) {
  let d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() !== d) {
    date.setDate(0);
  }
  return date;
}

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

router.post("/book", async (req, res) => {
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

//https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
function getDays(currentDay, lastDay) {
  for (
    var arr = [], dt = new Date(currentDay);
    dt <= lastDay;
    dt.setDate(dt.getDate() + 1)
  ) {
    let newDate = new Date(dt);
    arr.push({ date: newDate });
  }
  return arr;
}

function getSchedule() {
  //today
  const currentDay = new Date();
  //current day + one month
  const dayOneMonthFromNow = new Date(addMonths(new Date(), 1));
  //last day of current month
  const lastDayOfCurrentMonth = new Date(
    currentDay.getFullYear(),
    currentDay.getMonth() + 1,
    0
  );

  //current month
  const currentMonth = currentDay.toLocaleString("default", { month: "long" });
  //next month
  const nextMonth = dayOneMonthFromNow.toLocaleString("default", {
    month: "long",
  });

  let days = [];
  days = getDays(currentDay, dayOneMonthFromNow);

  const indexToSplit = days.findIndex(
    (obj) =>
      obj.date.toLocaleDateString() ===
      lastDayOfCurrentMonth.toLocaleDateString()
  );

  //list of the days in the current month
  let currentMonthList = days.slice(0, indexToSplit + 1);
  //list of the days in the next month
  let nextMonthList = days.slice(indexToSplit + 1, days.length);

  currentMonthList = currentMonthList.map((obj) => {
    //replaceAll() is not supported by node yet
    let date = obj.date.toLocaleDateString("en-US").replace(/\//gi, "-");
    return { date };
  });

  nextMonthList = nextMonthList.map((obj) => {
    let date = obj.date.toLocaleDateString("en-US").replace(/\//gi, "-");
    return { date };
  });

  return [
    { month: String(currentMonth), days: currentMonthList },
    { month: String(nextMonth), days: nextMonthList },
  ];
}

// add new employee
router.post("/employees", async (req, res) => {
  let availability = getSchedule();

  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dateofhire: req.body.dateofhire,
    availability: availability,
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

router.post("/updatetimeslot", async (req, res) => {
  try {
    //find employee with given name
    let employee = await Employee.find({ name: req.body.name });

    const availabilityList = employee[0].availability;
    let indexOne, indexTwo;
    //loop through the employee to find the time slots on the selected date
    for (let i = 0; i < availabilityList.length; i++) {
      for (let j = 0; j < availabilityList[i].days.length; j++) {
        if (availabilityList[i].days[j].date === req.body.date) {
          indexOne = i;
          indexTwo = j;
          break;
        }
      }
    }

    //remove the time slot
    const filterTime = employee[0].availability[indexOne].days[
      indexTwo
    ].timeSlots.filter((time) => {
      return time !== req.body.time;
    });
    //replace the old time slot with new time slot
    employee[0].availability[indexOne].days[indexTwo].timeSlots = filterTime;

    /*
      Add condition when all time slots are booked
    */

    //update and save!
    const updateTime = await employee[0].save();
    res.json(updateTime);
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

router.get("/employee/times", async (req, res) => {
  try {
    const employee = await Employee.findOne(
      {
        name: req.query.name,
      },
      //find employee by name and only include the fields name and availability and exclude id
      {
        name: 1,
        availability: 1,
        _id: 0,
      }
    );

    res.json(employee);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/timeslots", async (req, res) => {});

module.exports = router;
