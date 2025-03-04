const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const sequelize = require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
const defaultPort = 3000 || process.env.PORT;

app.listen(defaultPort, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server running on http://localhost:${defaultPort}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});

module.exports = app;
