import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ViewChannel.css"; // Create a CSS file for styling

const ViewChannel = () => {
  const { channelId } = useParams(); // Get channelId from URL params
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  console.log(channelId);
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/channel/${channelId}`
        );
        setChannelData(response.data); // Assuming your API returns channel data
        setVideos(response.data.videos); // Assuming your API returns an array of videos
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, [channelId]);

  if (!channelData) return <div>Loading...</div>; // Loading state

  return (
    <div className="view-channel-container">
      <div className="channel-header">
        <img
          src={channelData.channelBanner}
          alt="Profile"
          className="profile-picture"
        />
        <div className="channel-info">
          <h1 className="channel-name">{channelData.channelName}</h1>
          <p className="subscriber-count">
            {channelData.subscribers} subscribers
          </p>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
      <div className="nav-bar">
        <button className="nav-button">Home</button>
        <button className="nav-button">Videos</button>
        <button className="nav-button">Shorts</button>
      </div>
      {/* <div className="videos-section">
        <h2>Videos</h2>
        <div className="videos-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              <h3 className="video-title">{video.title}</h3>
              <p className="video-duration">{video.duration}</p>
              <p className="video-views">{video.views} views</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ViewChannel;
