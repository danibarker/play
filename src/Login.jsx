import React from "react";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = React.useState("");
  console.log("user is", user);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
