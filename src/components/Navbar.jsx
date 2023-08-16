import { useState } from "react";
import Modal from "./Modal";
import { HeartIcon } from "@heroicons/react/24/outline";

const Navbar = ({
  numOfCharacters,
  children,
  favoriteCharacters,
  onToggleFavorite,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <>
      <Modal
        isShowModal={isShowModal}
        favoriteCharacters={favoriteCharacters}
        toggleModal={toggleModal}
        onToggleFavorite={onToggleFavorite}
      />
      <div className="navbar">
        <div className="navbar__logo">LOGO 😄</div>
        {children}
        <div className="navbar__result">Found {numOfCharacters} Results</div>
        <div className="heart" onClick={() => toggleModal()}>
          <HeartIcon className="icon" />
          <span className="badge">{favoriteCharacters.length}</span>
        </div>
      </div>
    </>
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
