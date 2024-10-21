import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
export function Search() {
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />;
  return (
    <>
      <div className="search-container">
        <input type="search" placeholder="Search" id="search-btn" />
        <button className="btn">{searchIcon}</button>
      </div>
    </>
  );
}
