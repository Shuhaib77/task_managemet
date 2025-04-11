import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import AuthLayOut from "./pages/auth/AuthLayOut";
import Register from "./pages/auth/register/Register";
import Message from "./pages/nonauth/message/Message";
import HomeLayOut from "./pages/nonauth/home/HomeLayOut";

function UserRoute() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthLayOut />}>
          <Route index element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/home" element={<HomeLayOut />}></Route>
      </Routes>
    </div>
  );
}

export default UserRoute;
