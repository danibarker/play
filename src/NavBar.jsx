import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const NavBar = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <Link to="/">Home</Link>
      {!user && <Link to="login">Login</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default NavBar;
