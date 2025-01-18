import axios from 'axios'
import { API_BASE_URL, API_KEY } from '../utils/constants'

export const useRawgApi = () => {
  const searchGames = async (params) => {
    try {
      const { genres, startYear, endYear, quality, platform } = params

      const metacriticRanges = {
        excellent: '85,100',
        good: '75,84',
        okay: '60,74',
        any: '0,100'
      }

      const response = await axios.get(`${API_BASE_URL}/games`, {
        params: {
          key: API_KEY,
          genres: genres?.join(','),
          platforms: platform,
          dates: `${startYear}-01-01,${endYear}-12-31`,
          metacritic: quality !== 'any' ? metacriticRanges[quality] : undefined,
          page_size: 10,
          ordering: '-rating'
        }
      })

      console.log('Search results:', response.data)
      return response.data
    } catch (error) {
      console.error('Error searching games:', error)
      throw error
    }
  }

  const getGameDetails = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/games/${id}`, {
        params: {
          key: API_KEY
        }
      })
      console.log('Game details:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching game details:', error)
      throw error
    }
  }

  return { searchGames, getGameDetails }
}