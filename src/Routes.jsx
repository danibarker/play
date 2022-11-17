import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetLink from "./GetLink";
import Login from "./Login";
import NavBar from "./NavBar";

const TheRoutes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="login" element={<Login />} />
        <Route path="get-link" element={<GetLink />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TheRoutes;
