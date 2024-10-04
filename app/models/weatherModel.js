import { client } from '../config/redisClient.js'
import axios from 'axios'

export const getWeatherDataByCity = async (city) => {
  try {
    const cacheData = await client.get(city)
    if (cacheData) return JSON.parse(cacheData)

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.KEY_WEATHER}`
    const response = await axios.get(url)

    await client.set(city, JSON.stringify(response.data), 'EX', 3600)

    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const getWeatherDataByCoordinates = async (latitude, longitude) => {
  const cacheKey = `${latitude}_${longitude}`
  try {
    const cachedData = await client.get(cacheKey)
    if (cachedData) return JSON.parse(cachedData)

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${process.env.KEY_WEATHER}`
    const response = await axios.get(url)

    await client.set(cacheKey, JSON.stringify(response.data), 'EX', 3600)

    return response.data
  } catch (error) {
    throw new Error('Error fetching data from API')
  }
}
