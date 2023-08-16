import { useState, useEffect } from "react";
import axios from "axios";
import Navbar, { Search } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Modal from "./components/Modal";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [characterId, setCharacterId] = useState(null);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        !debouncedInputValue
          ? "https://rickandmortyapi.com/api/character"
          : `https://rickandmortyapi.com/api/character/?name=${debouncedInputValue}`
      )
      .then(({ data }) => setCharacters(data.results.slice(0, 5)))
      .catch((err) => {
        console.log(err.response.data);
        return setCharacters([]);
      });
  }, [debouncedInputValue]);

  useEffect(() => {
    const debouncedInputValueId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(debouncedInputValueId);
  }, [inputValue, 500]);

  const handleCharacterId = (id) => {
    setCharacterId((prevState) => (prevState === id ? null : id));
  };
  const addFavorite = (favCharacter) => {
    setFavoriteCharacters((prevstate) => [...prevstate, favCharacter]);
  };
  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };
  const deleteFavItem = (id) => {
    const filtered = favoriteCharacters.filter((item) => item.id !== id);
    setFavoriteCharacters(filtered);
  };

  return (
    <div className="app">
      <Modal
        isShowModal={isShowModal}
        favoriteCharacters={favoriteCharacters}
        toggleModal={toggleModal}
        onDeleteFavItem={deleteFavItem}
      />
      <Navbar
        numOfCharacters={characters.length}
        favoriteCharacters={favoriteCharacters}
        onToggleModal={toggleModal}
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
          onAddFavorite={addFavorite}
        />
      </div>
    </div>
  );
}
