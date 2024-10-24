import allUsers from "./allUsers";
import "./Cards.css";
import { Link } from "react-router-dom";

export function Cards({ query, selectedCategory, hideCategories }) {
  const { users, loading, error } = allUsers();

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="Container">
      <div className="card-container">
        {users
          .filter((user) => {
            const matchesQuery = user.title.toLowerCase().includes(query);
            const matchesCategory =
              hideCategories ||
              selectedCategory === "All" ||
              (user.categories && user.categories.includes(selectedCategory));
            return matchesQuery && matchesCategory;
          })
          .map((user) => (
            <div key={user._id} className="card">
              <Link
                to={`/User/byChannel/${user.channelId}`}
                className="card-link"
              >
                <img
                  src={user.thumbnailUrl}
                  alt={user.title}
                  className="thumbnail"
                />
                <div className="card-info">
                  <p className="card-title">{user.title}</p>
                  <p className="card-uploader">{user.uploader}</p>
                  <p className="card-views">{user.views} views</p>
                  {!hideCategories && (
                    <p className="card-category">{user.category}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
