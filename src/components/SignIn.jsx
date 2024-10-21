import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./SignIn.css";
import { useEffect, useState } from "react";
export function SignIn() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear the username and token from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // Reset the username in state
    setUsername("");

    // Optionally, redirect to home or login page
    window.location.href = "/";
  };
  const menuDots = <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />;
  const userIcon = <FontAwesomeIcon icon={faCircleUser} />;
  return (
    <>
      <div className="Sign-Container">
        <span className="menuDots">{menuDots}</span>
        {username ? (
          <>
            <span className="userName">{username}</span>
            <button onClick={handleLogout} className="log-out">
              Logout
            </button>
          </>
        ) : (
          <Link to="/register" className="Sign-btn">
            <span>{userIcon}</span>Sign in
          </Link>
        )}
      </div>
    </>
  );
}
