import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar, { Search } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import "./App.css";
import useFetch from "./hooks/useFetch";

export default function App() {
  const [{ loading, data }, doFetch] = useFetch();
  const [inputValue, setInputValue] = useState("");
  const [characterId, setCharacterId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
 
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    doFetch({
      url: !inputValue ? "" : `/?name=${inputValue}`,
      method: "GET",
      signal,
    });

    return () => {
      controller.abort();
    };
  }, [inputValue]);

  const handleCharacterId = (id) => {
    setCharacterId((prevState) => (prevState === id ? null : id));
  };
  const toggleFavorite = (favCharacter) => {
    const findedCharacter = favorites.findIndex(
      (item) => item.id === favCharacter.id
    );
    if (findedCharacter < 0) {
      setFavorites((prevstate) => [...prevstate, favCharacter]);
    } else {
      const filtered = favorites.filter((item) => item.id !== favCharacter.id);
      setFavorites(filtered);
    }
  };

  return (
    <div className="app">
      <Navbar
        numOfCharacters={data.length}
        favoriteCharacters={favorites}
        onToggleFavorite={toggleFavorite}
      >
        <Search query={inputValue} setQuery={setInputValue} />
      </Navbar>
      {loading ? (
        <p>loading ....</p>
      ) : (
        <div className="main">
          <CharacterList
            allCharacters={data}
            onSetCharacterId={handleCharacterId}
            characterId={characterId}
          />
          <CharacterDetail
            characterId={characterId}
            onToggleFavorite={toggleFavorite}
            favoriteCharacters={favorites}
          />
        </div>
      )}
    </div>
  );
}
