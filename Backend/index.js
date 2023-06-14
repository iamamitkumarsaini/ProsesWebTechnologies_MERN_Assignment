const express = require("express");
const cors = require("cors");
const { userRoutes } = require("./Routes/User.route");
const { connection } = require("./config/db");
const { dataValidation } = require("./middleware/validation.middleware")
require("dotenv").config();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes.
// Allow requests from any origin.
app.use(
  cors({
    origin: "*",
  })
);

// Parsing JSON request bodies.
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to ProsesWebTechnologies_Assignment" });
});

// Middleware: Data Validation
// Validate the data for "/user/add" and "/user/edit/:id" routes.
// Ensures that the mobile number and email address are valid.
app.use(dataValidation)
app.use("/user", userRoutes);



// Start the server and listen on the specified port.
// Establishing a connection to the database.
// Also logging the status of the database connection.
app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connection to DB successful");
  } catch (err) {
    console.log("Connection to DB failed");
    console.log(err);
  }
});
