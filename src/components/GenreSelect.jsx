import React, { useState } from 'react';

const genresList = [
  'Acción',
  'Aventura',
  'RPG',
  'Simulación',
  'Estrategia',
  'Deportes',
  'Carreras',
  'Puzzle',
  'Plataformas',
  'Terror',
  'Multijugador',
  'Indie',
];

const GenreSelect = ({ selectedGenres, setSelectedGenres }) => {
  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 2) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div>
      <h3>Selecciona hasta 2 géneros:</h3>
      <div>
        {genresList.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreSelect;