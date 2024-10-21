import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useState, useEffect } from "react";
import allUsers from "./components/allUsers";
import { Outlet, useLocation } from "react-router-dom";
import { UserSidebar } from "./components/UserSidebar";

function App() {
  const { loading, error } = allUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Seted isHidden to true only on the CardDetail page
    if (location.pathname.startsWith("/User/byChannel/")) {
      setIsOpen(false);
      setIsHidden(true);
    } else {
      setIsOpen(true);
      setIsHidden(false);
    }
  }, [location.pathname]);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleBar = () => {
    // Toggle sidebar visibility only if we are not on the CardDetail page

    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`app ${isOpen ? "sidebar-open" : "sidebar-collapsed"} ${
        isHidden ? "hidden" : ""
      }`}
    >
      <Header isOpen={isOpen} toggleBar={toggleBar} />
      {location.pathname.startsWith("/User/byChannel/") ? (
        <UserSidebar isOpen={isOpen} /> // Render User Sidebar
      ) : (
        <Sidebar isOpen={isOpen} /> // Render Main Sidebar
      )}

      <div className="appcontainer">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
