import { HeartIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO 😄</div>
      <input className="text-field" placeholder="Search..." />
      <div className="navbar__result">Found X Results</div>
      <div className="heart">
        <HeartIcon className="icon" />
        <span className="badge">2</span>
      </div>
    </div>
  );
};

export default Navbar;
