/* eslint-disable react/prop-types */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Search } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SignIn } from "./SignIn";
import "./Header.css";
import { Categories } from "./Categories";

export function Header({
  isOpen,
  toggleBar,
  setQuery,
  selectedCategory,
  onCategorySelect,
}) {
  const menuIcon = <FontAwesomeIcon icon={faBars} size="xl" />;
  const youtubeIcon = (
    <FontAwesomeIcon icon={faYoutube} style={{ color: "#d43725" }} size="xl" />
  );

  return (
    <div className="container">
      <div className="header">
        <div className="Icon-header">
          <span className="icon" onClick={toggleBar}>
            {isOpen ? menuIcon : menuIcon}
          </span>
          <span className="heading">{youtubeIcon} YouTube</span>
          <span className="in">IN</span>
        </div>
        <Search setQuery={setQuery} />
        <SignIn onClick={toggleBar} isOpen={isOpen} />
      </div>
      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />
    </div>
  );
}
