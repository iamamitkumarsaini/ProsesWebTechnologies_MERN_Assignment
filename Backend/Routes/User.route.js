const express = require("express");
const { UserModel } = require("../Models/User.model");

const userRoutes = express.Router();

//  Creates a new user profile.
// POST  /user/add
// Request Body:
// username (string): The username for the new user.
// mobileNum (number): The mobile number for the new user.
// email (string): The email address for the new user.
// address (string): The address for the new user.

// Response:
// If the username is available, the response will contain:
// - message (string): "User Profile has been created"
// - data (object): The created user profile.

// If the username is already taken, the response will contain:
// - message (string): "This Username is already taken"

userRoutes.post("/add", async (req, res) => {
  const { username, mobileNum, email, address } = req.body;

  try {
    const isUsername = await UserModel.findOne({ username });

    if (isUsername) {
      res.send({ message: "This Username is already taken" });
    } else {
      const userData = new UserModel({ username, mobileNum, email, address });
      await userData.save();

      res
        .status(201)
        .send({ message: "User Profile has been created", data: userData });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Interval server error" });
  }
});


// Sending All user Data to client side
// Retrieve all user profiles.
// GET  /user
// Response:
// - If successful, the response will contain an array of user profiles.

userRoutes.get("/", async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal server error" });
  }
});


//  Updating an existing user profile.
// PUT  /user/edit/:id

// Request Parameters:
// - id (string): The ID of the user to be updated.

// Request Body:
//  - username (string): The updated username for the user.
//  - mobileNum (number): The updated mobile number for the user.
//  - email (string): The updated email address for the user.
//  - address (string): The updated address for the user.
 
//  Response:
//  - If successful, the response will contain:
//  - message (string): "User Details Updated successfully"
//  - data (object): The updated user profile.
//  - If the user is not found, the response will contain:
//  - message (string): "User not found"
//  - If the requested username is already taken, the response will contain:
//  - message (string): "Username is not available"

userRoutes.put("/edit/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
      return res.send({ message: "User not found" });
    }

    const newUsername = payload.username;

    if (existingUser.username !== newUsername) {
      const usernameTaken = await UserModel.exists({ username: newUsername });

      if (usernameTaken) {
        return res.send({ message: "Username is not available" });
      }
    }

    existingUser.username = payload.username;
    existingUser.mobileNum = payload.mobileNum;
    existingUser.email = payload.email;
    existingUser.address = payload.address;

    const userUpdate = await existingUser.save();
    res
      .status(203)
      .send({ message: "User Details Updated successfully", data: userUpdate });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal server error" });
  }
});



//  Deleting user profile.
// DELETE  /user/delete/:id

// Request Parameters:
// - id (string): The ID of the user to be deleted.
 
//  Response:
//  - If successful, the response will contain:
//  - message (string): "User deleted Successfully"

userRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal server error" });
  }
});



// Sending Single user Data to client side
// GET  /user/:id

// Request Parameters
//  id (string): The ID of the user whom data to be send.
// Response:
// - If successful, the response will contain an array having a single element.

userRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await UserModel.find({ _id: id });
    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal server error" });
  }
});


// exporting userRoutes
module.exports = { userRoutes };
