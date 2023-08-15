import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CharacterList = ({ allCharacters, onSetCharacterId, characterId }) => {
  return (
    <div className="characters-list">
      {allCharacters.length ? (
        allCharacters.map((character) => {
          return (
            <CharacterItem
              character={character}
              key={character.id}
              onSetCharacterId={onSetCharacterId}
              characterId={characterId}
            />
          );
        })
      ) : (
        <p className="characters-list__empty">There is nothing here...</p>
      )}
    </div>
  );
};

export default CharacterList;

const CharacterItem = ({ character, onSetCharacterId, characterId }) => {
  return (
    <div className="list__item">
      <img src={character.image} alt="" />
      <h3 className="name">
        <span>{character.gender === "Male" ? "👨" : "👧"} </span>
        <span>{character.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${character.status === "Dead" ? "red" : ""}`}
        ></span>
        <span>{character.status}</span>
        <span> - {character.species}</span>
      </div>
      <button
        className="icon red"
        onClick={() => onSetCharacterId(character.id)}
      >
        {characterId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};
