import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Categories.css";
import allUsers from "./allUsers"; // This is assumed to be a hook

export function Categories({ selectedCategory, onCategorySelect }) {
  const containerRef = useRef(null);
  const location = useLocation(); // Get the current location

  // State to store categories fetched from the API
  const [category, setCategory] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Call the custom hook directly in the component
  const { users, loading, error } = allUsers(); // Call it directly, assuming it's a hook

  // Extract categories when users are fetched
  useEffect(() => {
    if (users && users.length > 0) {
      const extractedCategories = users.map((user) => user.categories).flat(); // Assuming 'category' exists in user
      setCategory(["All", ...new Set(extractedCategories)]); // Add "All" as the first category
      setFiltered(users);
    }
  }, [users]);

  useEffect(() => {
    if (selectedCategory === "All") {
      // If "All" is selected, reset to show all users
      setFiltered(users);
    } else {
      // Filter users based on the selected category
      const newFilteredUsers = users.filter((user) =>
        user.categories.includes(selectedCategory)
      );
      setFiltered(newFilteredUsers);
    }
  }, [selectedCategory, users]); // This useEffect will run whenever 'users' or selectedCategory changes

  // Scroll the container by a certain amount (e.g., 300px)
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Handle loading and error states (optional)
  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  // Check the current path and decide whether to render categories
  const shouldDisplayCategories =
    !location.pathname.startsWith("/User/byChannel/");

  return (
    <div className="categories-wrapper">
      {shouldDisplayCategories && (
        <>
          <button className="scroll-button left" onClick={scrollLeft}>
            &lt;
          </button>
          <div className="categories-container" ref={containerRef}>
            <div className="categories-list">
              {/* Render categories dynamically */}
              {category.map((category, index) => (
                <button
                  key={index}
                  className={`category-button ${
                    selectedCategory === category ? "selected" : ""
                  }`}
                  onClick={() => onCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <button className="scroll-button right" onClick={scrollRight}>
            &gt;
          </button>
        </>
      )}
    </div>
  );
}
