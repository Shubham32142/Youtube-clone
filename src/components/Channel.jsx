import { useState } from "react";
import "./Channel.css"; // Assuming you have a CSS file for styles
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Channel = ({ onClose }) => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState("");
  const [subscribers, setSubscribers] = useState(0);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const navigate = useNavigate();
  // Get user ID from URL params
  const handlePictureSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file); // Store the file object for upload
    }
  };
  function clickClose() {
    navigate("/");
  }

  const handleCreateChannel = async () => {
    setError(""); // Reset error state
    setSuccess(""); // Reset success state

    const formData = new FormData();
    formData.append("channelName", name);
    formData.append("handle", handle);
    formData.append("channelBanner", profilePicture);
    formData.append("subscribers", subscribers);
    formData.append("description", description);

    try {
      const response = await axios.post(
        `http://localhost:3000/createChannel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type for file uploads
          },
        }
      );
      navigate("/");
      setChannel(response.data.channel); // Save channel data
      setSuccess(response.data.message); // Set success message
      setName(""); // Clear form fields
      setHandle("");
      setDescription("");
      setProfilePicture(null);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong"); // Handle errors
    }
  };

  return (
    <div className="channel-container">
      <div className="channel-modal">
        <h2>Create Your Channel</h2>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Error message */}
        {success && <div className="success-message">{success}</div>}{" "}
        {/* Success message */}
        <div className="profile-picture-container">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile Preview"
              className="profile-picture-preview"
            />
          ) : (
            <div className="default-picture">No Image Selected</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureSelection}
            className="picture-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="handle">Handle</label>
          <input
            type="text"
            id="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            type="textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="modal-actions">
          <button className="create-button" onClick={handleCreateChannel}>
            Create Channel
          </button>
          <button className="cancel-button" onClick={clickClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
