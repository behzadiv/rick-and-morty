import { TrashIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CharacterList = ({ allCharacters, onSetCharacterId, characterId }) => {
  return (
    <div>
      {allCharacters.length ? (
        allCharacters.map((character) => {
          return (
            <CharacterItem character={character} key={character.id}>
              <button
                className="icon red"
                onClick={() => onSetCharacterId(character.id)}
              >
                {characterId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </CharacterItem>
          );
        })
      ) : (
        <p className="characters-list__empty">There is nothing here...</p>
      )}
    </div>
  );
};

export default CharacterList;

export const CharacterItem = ({ character, children }) => {
  return (
    <div className="list__item">
      <img src={character?.image} alt="" />
      <h3 className="name">
        <span>{character?.gender === "Male" ? "👨" : "👧"} </span>
        <span>{character?.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${character?.status === "Dead" ? "red" : ""}`}
        ></span>
        <span>{character?.status}</span>
        <span> - {character?.species}</span>
      </div>
      {children}
    </div>
  );
};
