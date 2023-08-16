import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

const CharacterDetail = ({
  characterId,
  onToggleFavorite,
  favoriteCharacters,
}) => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (!characterId) {
      return setCharacter(null);
    }
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(({ data }) => {
        setCharacter(data);
        const episodesId = data.episode.map((ep) => ep.split("/").at(-1));
        axios
          .get(`https://rickandmortyapi.com/api/episode/${episodesId}`)
          .then(({ data: episodes }) => setEpisodes([episodes].flat())) //flat => when our data was object
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [characterId]);

  return (
    <div className="character-detail__container">
      {character ? (
        <>
          <CharacterDetailInfo
            character={character}
            onToggleFavorite={onToggleFavorite}
            favoriteCharacters={favoriteCharacters}
          />
          <CharacterEpisodes episodes={episodes} />
        </>
      ) : (
        <p className="character-detail__empty">Please Select A Character ...</p>
      )}
    </div>
  );
};

export default CharacterDetail;

const CharacterDetailInfo = ({
  onToggleFavorite,
  character,
  favoriteCharacters,
}) => {
  return (
    <div className="character-detail">
      <img src={character.image} alt="" className="character-detail__img" />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👧"} </span>
          <span>{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>{character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <span>Last known location</span>
          <span> {character.location.name}</span>
        </div>
        <div className="actions">
          <button
            className="btn btn--primary"
            onClick={() => onToggleFavorite(character)}
          >
            {!favoriteCharacters.find((item) => item.id === character.id)
              ? "Add to favorite"
              : "Remove favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CharacterEpisodes = ({ episodes }) => {
  const [isSorted, setIsSorted] = useState(false);

  let sortedEpisodes;

  if (isSorted) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List Of Episodes:</h2>
        <ArrowDownCircleIcon
          className="icon"
          onClick={() => setIsSorted((prevState) => !prevState)}
          style={{ rotate: isSorted ? "0deg" : "180deg" }}
        />
      </div>
      <ul>
        {sortedEpisodes.map((episode, index) => {
          return (
            <li key={episode.id}>
              <div>
                {String(index + 1).padStart(2, 0)} - {episode.episode} :{" "}
                <strong>{episode.name}</strong>
              </div>
              <span className="badge badge--secondary">{episode.air_date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
