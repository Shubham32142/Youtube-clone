import { useEffect, useState } from "react";
import allUsers from "./allUsers";
import "./SideVideos.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export function SideVideos() {
  const { channelId } = useParams();
  const { users, loading, error } = allUsers(); // Assuming `allUsers()` is a custom hook that fetches users
  const [channel, setChannel] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios(
          `http://localhost:3000/User/byChannel/${channelId}`
        );
        setUserId(response.data);
        if (response.data.channelId) {
          fetchChannel(response.data.channelId);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    async function fetchChannel(channelId) {
      try {
        const response = await axios(
          `http://localhost:3000/channel/${channelId}`
        );
        setChannel(response.data);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    }

    fetchUser();
  }, [channelId]);

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="side-videos-container">
      <div className="side-videos">
        {users &&
          users.map((user) => (
            <div key={user._id} className="video-card">
              <Link
                to={`/User/byChannel/${user.channelId}`}
                key={user.channelId}
                className="video-card-link"
              >
                <img
                  src={user.thumbnailUrl}
                  alt={user.title}
                  className="video-thumbnail"
                />
                <div className="video-info">
                  <p className="video-title">{user.title}</p>
                  <p className="video-uploader">{channel?.channelName}</p>
                  <p className="video-views">
                    {user.views} views • 1 month ago
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
