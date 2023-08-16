import { XCircleIcon } from "@heroicons/react/24/outline";
import CharacterList from "./CharacterList";

const Modal = ({ isShowModal, favoriteCharacters, toggleModal }) => {
  return (
    <>
      <div
        className={isShowModal ? "backdrop" : "hidden"}
        onClick={() => {
          toggleModal();
        }}
      ></div>
      <div className={isShowModal ? "modal" : "hidden"}>
        <div className="modal__header">
          <p className="title"></p>
          <XCircleIcon className="icon close" onClick={toggleModal} />
        </div>
        {favoriteCharacters.length ? (
          <CharacterList
            allCharacters={favoriteCharacters}
            isModalItems={true}
          />
        ) : (
          <p className="characters-list__empty">There is nothing here...</p>
        )}
      </div>
    </>
  );
};

export default Modal;
