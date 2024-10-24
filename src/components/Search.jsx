import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
export function Search({ setQuery }) {
  const [searchInput, setSearchInput] = useState("");
  function handleSearchClick() {
    setQuery(searchInput.toLowerCase());
  }
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />;
  return (
    <>
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          id="search-btn"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn" onClick={handleSearchClick}>
          {searchIcon}
        </button>
      </div>
    </>
  );
}
