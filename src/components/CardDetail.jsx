import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CardDetail.css";
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faDownload,
  faShare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comments } from "./Comments";
import { SideVideos } from "./SideVideos";

export function CardDetail() {
  const { channelId } = useParams();
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `http://localhost:3000/User/byChannel/${channelId}`
        );
        setUser(response.data);
        setVideoId(response.data.videoId);
        if (response.data.channelId) {
          fetchChannel(response.data.channelId);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching user data", error);
        setLoading(false);
      }
    }

    async function fetchChannel(channelId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/channel/${channelId}`
        );
        setChannel(response.data);
      } catch (error) {
        setError("Error fetching channel data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [channelId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card-detail-layout">
      <div className="user-detail-container">
        {user && channel && (
          <>
            <div className="channel-info">
              <img
                src={channel.channelBanner}
                alt="Channel Banner"
                className="channel-banner"
              />
              <h2>{user.title}</h2>
              <div className="channel-details">
                <div className="channel-details-banner">
                  <img
                    src={user.thumbnailUrl}
                    alt={user.title}
                    className="channel-thumbnail"
                  />
                  <div className="channel-subs">
                    <h3>{channel.channelName}</h3>
                    <p> {channel.subscribers} subscribers</p>
                  </div>
                  <button className="Subscribe">Subscribe</button>
                </div>
                <div className="actions">
                  <div className="like-dislike">
                    <button className="Like">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="xl"
                        className="Icons"
                      />
                      {user.likes}
                    </button>
                    <button className="Dislike">
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        size="xl"
                        className="Icons"
                      />
                      {user.dislikes}
                    </button>
                  </div>
                  <button className="Share">
                    <FontAwesomeIcon
                      icon={faShare}
                      size="xl"
                      className="Icons"
                    />
                    Share
                  </button>
                  <button className="Download">
                    <FontAwesomeIcon
                      icon={faDownload}
                      size="xl"
                      className="Icons"
                    />
                    Download
                  </button>
                  <button className="Save">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size="xl"
                      className="Icons"
                    />
                    Save
                  </button>
                  <button className="3-dots">
                    <FontAwesomeIcon icon={faEllipsis} size="xl" />
                  </button>
                </div>
              </div>
              <div className="views-description">
                <span className="views"> {user.views} views</span>
                <span className="upload">{user.uploadDate}</span>
                <p> {user.description}</p>
              </div>
            </div>
          </>
        )}
        {videoId && <Comments videoId={videoId} comments={user.comments} />}
      </div>
      <div className="side-videos-section">
        <SideVideos />
      </div>
    </div>
  );
}
