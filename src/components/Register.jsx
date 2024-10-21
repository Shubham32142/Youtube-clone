// Register.jsx
import { useState } from "react";
import axios from "axios";
import "./Register.css"; // Importing the CSS for styling

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/User/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("username: ", username);
      window.location.href = "/login"; // Redirect to sign-in after registration
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="register-container">
      {" "}
      {/* Added the styling class */}
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        {" "}
        {/* Added the styling class */}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username" // Added id for accessibility
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email" // Added id for accessibility
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password" // Added id for accessibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          {" "}
          {/* Added the styling class */}
          Register
        </button>
      </form>
    </div>
  );
}
