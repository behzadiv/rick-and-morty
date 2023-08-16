import { useState, useEffect } from "react";
import axios from "axios";
import Navbar, { Search } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [characterId, setCharacterId] = useState(null);
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    () => JSON.parse(localStorage.getItem("favCharacter")) || []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get(
        !inputValue
          ? "https://rickandmortyapi.com/api/character"
          : `https://rickandmortyapi.com/api/character/?name=${inputValue}`,
        { signal }
      )
      .then(({ data }) => setCharacters(data.results.slice(0, 5)))
      .catch((err) => {
        if (!axios.isCancel()) {
          console.log(err.response.data);
          return setCharacters([]);
        }
      });

    return () => {
      controller.abort();
    };
  }, [inputValue]);
  useEffect(() => {
    console.log(favoriteCharacters);
    localStorage.setItem("favCharacter", JSON.stringify(favoriteCharacters));
  }, [favoriteCharacters]);

  const handleCharacterId = (id) => {
    setCharacterId((prevState) => (prevState === id ? null : id));
  };
  const toggleFavorite = (favCharacter) => {
    const findedCharacter = favoriteCharacters.findIndex(
      (item) => item.id === favCharacter.id
    );
    if (findedCharacter < 0) {
      setFavoriteCharacters((prevstate) => [...prevstate, favCharacter]);
    } else {
      const filtered = favoriteCharacters.filter(
        (item) => item.id !== favCharacter.id
      );
      setFavoriteCharacters(filtered);
    }
  };

  return (
    <div className="app">
      <Navbar
        numOfCharacters={characters.length}
        favoriteCharacters={favoriteCharacters}
        onToggleFavorite={toggleFavorite}
      >
        <Search query={inputValue} setQuery={setInputValue} />
      </Navbar>
      <div className="main">
        <CharacterList
          allCharacters={characters}
          onSetCharacterId={handleCharacterId}
          characterId={characterId}
        />
        <CharacterDetail
          characterId={characterId}
          onToggleFavorite={toggleFavorite}
          favoriteCharacters={favoriteCharacters}
        />
      </div>
    </div>
  );
}
