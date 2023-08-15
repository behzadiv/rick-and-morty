import { HeartIcon } from "@heroicons/react/24/outline";

const Navbar = ({ numOfCharacters, children }) => {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO 😄</div>
      {children}
      <div className="navbar__result">Found {numOfCharacters} Results</div>
      <div className="heart">
        <HeartIcon className="icon" />
        <span className="badge">2</span>
      </div>
    </div>
  );
};

export default Navbar;

export const Search = ({ query, setQuery }) => {
  return (
    <input
      value={query}
      className="text-field"
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
