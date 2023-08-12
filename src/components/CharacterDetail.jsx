import { character, episodes } from "../../data/data";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

const CharacterDetail = () => {
  return (
    <div>
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
            <button className="btn btn--primary">Add to favorite</button>
          </div>
        </div>
      </div>
      <CharacterEpisodes />
    </div>
  );
};

export default CharacterDetail;

const CharacterEpisodes = () => {
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List Of Episodes:</h2>
        <span className="icon">
          <ArrowDownCircleIcon />
        </span>
      </div>
      <ul>
        {episodes.map((episode, index) => {
          return (
            <li key={episode.id}>
              <div>
                {String(index + 1).padStart(2, 0)} - {episode.episode} :{" "}
                <strong>{episode.name}</strong>
              </div>
              <span></span>
              <span className="badge badge--secondary">{episode.air_date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
