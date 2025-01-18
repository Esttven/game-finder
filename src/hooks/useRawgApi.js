import axios from 'axios'
import { API_BASE_URL, API_KEY } from '../utils/constants'

export const useRawgApi = () => {
  const formatDate = (date) => {
    return date ? date.toISOString().split('T')[0] : null
  }

  const searchGames = async (params) => {
    try {
      const { genres, age, quality, platform } = params

      const now = new Date()
      const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate())
      const fiveYearsAgo = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate())
      const tenYearsAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate())

      const dateRanges = {
        new: [formatDate(twoYearsAgo), formatDate(now)],
        recent: [formatDate(fiveYearsAgo), formatDate(twoYearsAgo)],
        not_that_old: [formatDate(tenYearsAgo), formatDate(fiveYearsAgo)],
        ancient: ['1980-01-01', formatDate(tenYearsAgo)]
      }

      const metacriticRanges = {
        excellent: '90,100',
        good: '75,89',
        okay: '60,74',
        any: '1,100'
      }

      const response = await axios.get(`${API_BASE_URL}/games`, {
        params: {
          key: API_KEY,
          genres: genres?.join(','),
          platforms: platform,
          dates: age !== 'any' ? dateRanges[age].join(',') : undefined,
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