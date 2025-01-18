import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GENRES, PLATFORMS, QUALITY_CATEGORIES } from '../utils/constants'
import { useRawgApi } from '../hooks/useRawgApi'

function GameForm() {
  const navigate = useNavigate()
  const { searchGames } = useRawgApi()
  const currentYear = new Date().getFullYear()
  const [formData, setFormData] = useState({
    genre1: '',
    genre2: '',
    startYear: '',
    endYear: currentYear,
    quality: 'any',
    platform: ''
  })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted with:', formData)

    try {
      const genres = [formData.genre1, formData.genre2].filter(Boolean)
      const results = await searchGames({
        genres,
        startYear: formData.startYear,
        endYear: formData.endYear,
        quality: formData.quality,
        platform: formData.platform || undefined
      })
      
      console.log('API Response:', results)

      if (results.results?.length > 0) {
        const filteredGames = results.results.filter(game => {
          const gameGenres = game.genres.map(g => g.id)
          const matchesGenres = genres.every(genre => gameGenres.includes(parseInt(genre)))
          return matchesGenres && !game.added_by_status.dlc
        })

        if (filteredGames.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredGames.length)
          const gameId = filteredGames[randomIndex].id
          console.log('Navigating to game:', gameId)
          navigate(`/game/${gameId}`)
        } else {
          console.log('No results found')
          setError('No se encontraron juegos con esos criterios')
        }
      } else {
        console.log('No results found')
        setError('No se encontraron juegos con esos criterios')
      }
    } catch (error) {
      console.error('Error searching games:', error)
      setError('Error al buscar juegos')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Género 1:</label>
        <select
          value={formData.genre1}
          onChange={(e) => {
            setFormData({...formData, genre1: e.target.value})
            console.log('Selected genre1:', e.target.value)
          }}
        >
          <option value="">Seleccione un género</option>
          {GENRES.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Género 2:</label>
        <select
          value={formData.genre2}
          onChange={(e) => {
            setFormData({...formData, genre2: e.target.value})
            console.log('Selected genre2:', e.target.value)
          }}
        >
          <option value="">Seleccione un género</option>
          {GENRES.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Año de salida:</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <label>Desde:</label>
            <input
              type="number"
              value={formData.startYear}
              onChange={(e) => {
                setFormData({...formData, startYear: e.target.value})
                console.log('Selected startYear:', e.target.value)
              }}
            />
          </div>
          <div>
            <label>Hasta:</label>
            <input
              type="number"
              value={formData.endYear}
              onChange={(e) => {
                setFormData({...formData, endYear: e.target.value})
                console.log('Selected endYear:', e.target.value)
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <label>Calidad:</label>
        <select
          value={formData.quality}
          onChange={(e) => {
            setFormData({...formData, quality: e.target.value})
            console.log('Selected quality:', e.target.value)
          }}
        >
          {QUALITY_CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Plataforma:</label>
        <select
          value={formData.platform}
          onChange={(e) => {
            setFormData({...formData, platform: e.target.value})
            console.log('Selected platform:', e.target.value)
          }}
        >
          <option value="">Todas</option>
          {PLATFORMS.map(platform => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
      </div>

      <button type="submit">Buscar</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default GameForm