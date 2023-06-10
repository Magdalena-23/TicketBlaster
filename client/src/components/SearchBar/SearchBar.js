import classes from "./SearchBar.module.css";
// import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <>
      <div className={classes["search-bar"]}>
        <input type="text" placeholder="Search" />
      </div>
    </>
  );
};

export default SearchBar;
