import { useState } from "react";
import axios from "axios";
import "./Register.css"; // Importing the CSS for styling

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasChannel, setHasChannel] = useState(false); // State for checking if the user has a channel
  const [channelId, setChannelId] = useState(""); // State to store the channel ID

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const response = await axios.post("http://localhost:3000/User/register", {
        username,
        email,
        password,
      });

      // Store the username and user ID in local storage
      localStorage.setItem("username", username);
      const userId = response.data.userId; // Assuming the response includes the user ID
      localStorage.setItem("userId", userId);

      // Check if the user has a channel
      await checkUserChannel(userId);

      // Redirect to login page after registration
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const checkUserChannel = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/channel/${userId}`);
      const data = await response.json();

      if (data.hasChannel) {
        // Update state to show "View Channel" button
        setHasChannel(true);
        // Store the channel ID
        setChannelId(data.channelId); // Assuming the response contains the channel ID
      } else {
        // Show "Create Channel" button
        setHasChannel(false);
      }
    } catch (error) {
      console.error("Error checking channel:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
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
          Register
        </button>
      </form>
      {hasChannel && (
        <div>
          <p>You have a channel! Channel ID: {channelId}</p>
          <button
            onClick={() => (window.location.href = `/viewChannel/${channelId}`)}
          >
            View Channel
          </button>
        </div>
      )}
      {!hasChannel && (
        <div>
          <p>You do not have a channel yet.</p>
          <button onClick={() => (window.location.href = "/createChannel")}>
            Create Channel
          </button>
        </div>
      )}
    </div>
  );
}
