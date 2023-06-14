const express = require("express");
const { UserModel } = require("../Models/User.model");

const userRoutes = express.Router();

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

userRoutes.get("/", async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal server error" });
  }
});

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

module.exports = { userRoutes };
