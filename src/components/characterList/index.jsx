"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./characterList.module.css";

const CharacterList = () => {
  const url = "https://hp-api.onrender.com/api/characters"; // Link da API externa

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setCharacters(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar personagens na API");
        setError(
          "Não foi possível carregar os personagens. Tente novamente mais tarde! #Sorry"
        );
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Carregando personagens...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personagens do Harry Potter⚡</h1>
      <div className={styles.characterGrid}>
        {characters.map((character) => (
          <div key={character.id} className={styles.characterCard}>
            <div className={styles.imageContainer}>
              <img src={character.image} alt={character.title} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.characterTitle}>{character.name}</h2>
              <p className={styles.house}>House: {character.house}</p>
              <p className={styles.year}>Date Of Birth: {character.dateOfBirth}</p>
              <p className={styles.actor}>Actor: {character.actor}</p>
              <div className={styles.rating}>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;