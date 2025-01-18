import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRawgApi } from '../hooks/useRawgApi'

function GameInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getGameDetails } = useRawgApi()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true)
        const data = await getGameDetails(id)
        console.log('Game data received:', data)
        setGame(data)
      } catch (err) {
        console.error('Error fetching game:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      console.log('Fetching game with ID:', id)
      fetchGame()
    }
  }, [id])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>
  if (!game) return <div>No se encontró el juego</div>

  return (
    <div className="container" style={{ padding: '20px' }}>
      <button onClick={() => navigate('/')}>Volver</button>
      <h1>{game.name}</h1>
      
      {game.background_image && (
        <img 
          src={game.background_image} 
          alt={game.name}
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
        />
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Detalles</h2>
        <p><strong>Fecha de lanzamiento:</strong> {game.released ? new Date(game.released).toLocaleDateString('es-ES') : 'No disponible'}</p>
        <p><strong>Metacritic:</strong> {game.metacritic || 'No disponible'}</p>
        <p><strong>Géneros:</strong> {game.genres?.map(g => g.name).join(', ') || 'No disponible'}</p>
      </div>

      {game.description_raw && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Descripción</h2>
          <p>{game.description_raw}</p>
        </div>
      )}

      {game.stores?.length > 0 && (
        <div>
          <h2>Disponible en:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {game.stores.map(({ store }) => (
              <li key={store.id} style={{ marginBottom: '10px' }}>
                <a 
                  href={`https://${store.domain}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  {store.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GameInfo