import { client } from '../config/redisClient.js'
import axios from 'axios'

export const getAddress = async (latitude, longitude) => {
  try {
    const cacheData = await client.get(`${latitude},${longitude}`)
    if (cacheData) return JSON.parse(cacheData)
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.KEY_OPENCAGEDATA}`
    const response = await fetch(url)
    const data = await response.json()
    const components = data.results[0].components
    const road = components.road
    const state = components.state
    const county = components.county
    const country = components.country
    const postcode = components.postcode
    const city = components._normalized_city
    const residential = components.residential

    await client.set(
      `${latitude}_${longitude}`,
      JSON.stringify({
        road,
        city,
        state,
        county,
        country,
        postcode,
        latitude,
        longitude,
        residential,
      }),
      'EX',
      3600
    )

    return {
      road,
      city,
      state,
      county,
      country,
      postcode,
      latitude,
      longitude,
      residential,
    }
  } catch (error) {
    console.error('Error al obtener los datos de ubicación:', error)
    res.status(500).json({ error: 'Error fetching location data' })
  }
}

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
