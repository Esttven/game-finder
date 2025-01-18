import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GENRES, PLATFORMS, AGE_CATEGORIES, QUALITY_CATEGORIES } from '../utils/constants'
import { useRawgApi } from '../hooks/useRawgApi'

function GameForm() {
  const navigate = useNavigate()
  const { searchGames } = useRawgApi()
  const [formData, setFormData] = useState({
    genres: [],
    age: 'any',
    quality: 'any',
    platform: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted with:', formData)

    try {
      const results = await searchGames({
        ...formData,
        genres: formData.genres.length > 0 ? formData.genres : undefined,
        platform: formData.platform || undefined
      })
      
      console.log('API Response:', results)

      if (results.results?.length > 0) {
        const gameId = results.results[0].id
        console.log('Navigating to game:', gameId)
        navigate(`/game/${gameId}`)
      } else {
        console.log('No results found')
        alert('No se encontraron juegos con esos criterios')
      }
    } catch (error) {
      console.error('Error searching games:', error)
      alert('Error al buscar juegos')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Géneros (máximo 2):</label>
        <select
          multiple
          value={formData.genres}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, option => option.value)
            if (selected.length <= 2) {
              setFormData({...formData, genres: selected})
              console.log('Selected genres:', selected)
            }
          }}
        >
          {GENRES.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Antigüedad:</label>
        <select
          value={formData.age}
          onChange={(e) => {
            setFormData({...formData, age: e.target.value})
            console.log('Selected age:', e.target.value)
          }}
        >
          {AGE_CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
        </select>
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
    </form>
  )
}

export default GameForm