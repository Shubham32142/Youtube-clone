import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useEffect, useState } from "react";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hasChannel, setHasChannel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      const checkChannel = async () => {
        try {
          const response = await fetch(`/channel/${storedUsername}`);
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setHasChannel(data.hasChannel);
          }
        } catch (error) {
          console.error("Error checking channel:", error);
        }
      };
      checkChannel();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setHasChannel(false);
    setUsername("");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleViewChannel = () => {
    navigate(`/viewChannel`);
  };

  const handleCreateChannel = () => {
    if (username) {
      navigate(`/createChannel`);
    } else {
      alert("You must be logged in to create a channel.");
    }
  };

  return (
    <div className="Sign-Container">
      <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
      {username ? (
        <>
          <button onClick={toggleDropdown} className="userName">
            {username.charAt(0)}
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              {hasChannel ? (
                <button onClick={handleViewChannel} className="create">
                  View Channel
                </button>
              ) : (
                <button onClick={handleCreateChannel} className="create">
                  Create Channel
                </button>
              )}
              <button onClick={handleLogout} className="log-out">
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link to="/register" className="Sign-btn">
          <FontAwesomeIcon icon={faCircleUser} />
          Sign in
        </Link>
      )}
    </div>
  );
}
