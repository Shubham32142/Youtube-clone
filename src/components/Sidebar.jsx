/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHistory,
  faUser,
  faShoppingCart,
  faMusic,
  faFilm,
  faTv,
  faGamepad,
  faNewspaper,
  faTrophy,
  faSchool,
  faTshirt,
  faPodcast,
  faCircleUser,
  faCog,
  faFlag,
  faQuestionCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

export function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <ul className="sidebar-section">
        <li className="sidebar-item active">
          <FontAwesomeIcon icon={faHome} /> <p>Home</p>
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faTv} /> <p>Shorts</p>
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faShoppingCart} /> <p>Subscriptions</p>
        </li>
      </ul>

      <ul className="sidebar-section">
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faUser} /> <p>You</p>
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faHistory} /> <p>History</p>
        </li>
      </ul>

      <div className="sidebar-section sign-in-section">
        <p>Sign in to like videos, comment, and subscribe.</p>
        <button className="sign-in-btn">
          <FontAwesomeIcon icon={faCircleUser} /> Sign in
        </button>
      </div>

      <ul className="sidebar-section explore">
        <h4>Explore</h4>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faTrophy} /> Trending
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faShoppingCart} /> Shopping
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faMusic} /> Music
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faFilm} /> Movies
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faTv} /> Live
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faGamepad} /> Gaming
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faNewspaper} /> News
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faTrophy} /> Sports
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faSchool} /> Courses
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faTshirt} /> Fashion & Beauty
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faPodcast} /> Podcasts
        </li>
      </ul>

      <ul className="sidebar-section More">
        <h4>More from YouTube</h4>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faTrophy} /> YouTube Premium
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faMusic} /> YouTube Music
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faTrophy} /> YouTube Kids
        </li>
      </ul>

      <ul className="sidebar-section Setting">
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faCog} /> Settings
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faFlag} /> Report history
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faQuestionCircle} /> Help
        </li>
        <li className="sidebar-item">
          <FontAwesomeIcon icon={faComment} /> Send feedback
        </li>
      </ul>
    </div>
  );
}
