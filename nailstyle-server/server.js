const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const passport = require("passport");
//const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
//const cookie = require("cookie-parser");
const cookieParser = require("cookie-parser");
require("dotenv/config");

const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Routes
const routes = require("./routes/routes");
app.use("/", routes);

//Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!")
);

//Server
app.listen(4000, () => {
  console.log("server running");
});
