import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import EditUser from "./EditUser";
import AddUser from "./AddUser";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/edit/:id" element={<EditUser />}></Route>
      <Route path="/add/user" element={<AddUser />}></Route>
    </Routes>
  );
}

export default AllRoutes;
