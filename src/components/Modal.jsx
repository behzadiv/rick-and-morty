import { CharacterItem } from "./CharacterList";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";

const Modal = ({
  isShowModal,
  favoriteCharacters,
  toggleModal,
  onToggleFavorite,
}) => {
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
          <h2 className="title">List of favorites character</h2>
          <XCircleIcon className="icon close" onClick={toggleModal} />
        </div>
        {favoriteCharacters.length ? (
          favoriteCharacters.map((item) => (
            <CharacterItem key={item.id} character={item}>
              <button
                className="icon red"
                onClick={() => onToggleFavorite(item)}
              >
                <TrashIcon />
              </button>
            </CharacterItem>
          ))
        ) : (
          <p className="characters-list__empty">There is nothing here...</p>
        )}
      </div>
    </>
  );
};

export default Modal;
