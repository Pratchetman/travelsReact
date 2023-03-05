import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavBarTravels } from "../components/NavBarTravels";
import { About } from "../pages/about/About";
import { Admin } from "../pages/admin/Admin";
import { AllUsers } from "../pages/allUsers/AllUsers";
import { Login } from "../pages/auth/login/Login";
import { Error } from "../pages/error/Error";
import { Home } from "../pages/home/Home";
import { EditUser } from "../pages/user/EditUser";
import { Register } from "../pages/auth/register/Register";
import { User } from "../pages/user/User";
import { Services } from "../pages/services/Services";

import "./travelsApp.scss";


export const TravelsApp = () => {
  return (
    <div className="principal">
      <BrowserRouter>
        <NavBarTravels />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
