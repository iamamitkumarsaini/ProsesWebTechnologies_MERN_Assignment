const express = require("express");
const cors = require("cors");
const { userRoutes } = require("./Routes/User.route");
const { connection } = require("./config/db");
const { dataValidation } = require("./middleware/validation.middleware")
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to ProsesWebTechnologies_Assignment" });
});


app.use(dataValidation)
app.use("/user", userRoutes);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connection to DB successful");
  } catch (err) {
    console.log("Connection to DB failed");
    console.log(err);
  }
});
