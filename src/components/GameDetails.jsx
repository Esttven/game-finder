import React from 'react';

const GameDetails = ({ game }) => {
  if (!game) {
    return <div>Cargando detalles del juego...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.cover} alt={`${game.name} cover`} />
      <div>
        <h2>Detalles del juego</h2>
        <p><strong>Géneros:</strong> {game.genres.join(', ')}</p>
        <p><strong>Fecha de lanzamiento:</strong> {game.releaseDate}</p>
        <p><strong>Puntuación de Metacritic:</strong> {game.metacriticScore}</p>
        <p><strong>Descripción:</strong> {game.description}</p>
        <h3>Capturas de pantalla</h3>
        <div>
          {game.screenshots.map((screenshot, index) => (
            <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
          ))}
        </div>
        <h3>Enlaces de la tienda</h3>
        <ul>
          {game.storeLinks.map((link, index) => (
            <li key={index}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameDetails;