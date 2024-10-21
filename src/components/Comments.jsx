/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllComments,
  addComment,
  deleteComment,
  editComment,
  selectComments,
} from "./commentSlice";
import "./Comments.css";

export function Comments({ videoId, commentId }) {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const [newComment, setNewComment] = useState("");
  const [editMode, setEditMode] = useState({ id: null, text: "" });

  useEffect(() => {
    if (videoId) {
      dispatch(fetchAllComments(videoId));
    }
  }, [videoId, dispatch]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment) return;

    await dispatch(
      addComment({
        videoId,
        text: newComment,
        userId: "User",
        commentId,
      })
    );
    setNewComment("");
  };

  const handleEditComment = (comment) => {
    setEditMode({ id: comment.commentId, text: comment.text });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      editComment({ videoId, commentId: editMode.id, text: editMode.text })
    );
    setEditMode({ id: null, text: "" });
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment({ videoId, commentId }));
  };

  return (
    <div className="comment-container">
      <form onSubmit={handleCommentSubmit} className="comment-input">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit">Post</button>
      </form>

      <div className="comments">
        {comments.map((comment) => (
          <div className="comment" key={comment.commentId}>
            <div className="comment-header">
              <img
                className="comment-avatar"
                src="https://imgs.search.brave.com/mYuKqM8YeN3Xo0rk0ioz3wRsMz8tw2c9O8pUk5uohlI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw"
                alt="Avatar"
              />
              <div>
                <span className="comment-user">@{comment.userId}</span>
                <span className="comment-timestamp">1 month ago</span>
              </div>
            </div>

            <div className="comment-content">
              {editMode.id === comment.commentId ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    className="update"
                    value={editMode.text}
                    onChange={(e) =>
                      setEditMode({ ...editMode, text: e.target.value })
                    }
                  />
                  <button type="submit" className="update-btn">
                    Update
                  </button>
                </form>
              ) : (
                comment.text
              )}
            </div>

            <div className="comment-buttons">
              <div className="like-button">
                <span>👍</span>
                <span className="like-count">{comment.likes || 0}</span>
              </div>
              <button>Reply</button>
              <button onClick={() => handleEditComment(comment)}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.commentId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
