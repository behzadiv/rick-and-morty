import { HeartIcon } from "@heroicons/react/24/outline";

const Navbar = ({ numOfCharacters, onSearchHandler }) => {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO 😄</div>
      <input
        className="text-field"
        placeholder="Search..."
        onChange={(e) => onSearchHandler(e.target.value)}
      />
      <div className="navbar__result">Found {numOfCharacters} Results</div>
      <div className="heart">
        <HeartIcon className="icon" />
        <span className="badge">2</span>
      </div>
    </div>
  );
};

export default Navbar;
