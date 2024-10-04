import {
  getWeatherDataByCity,
  getWeatherDataByCoordinates,
} from '../models/weatherModel.js'

export const getWeatherByCity = async (req, res) => {
  const { city } = req.params

  if (!city) return res.status(400).json({ error: 'City is required' })

  try {
    const data = await getWeatherDataByCity(city)
    return res.json(data)
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

export const getWeatherByCoordinates = async (req, res) => {
  const { latitude, longitude } = req.params

  if (!latitude || !longitude)
    return res
      .status(400)
      .json({ error: 'Latitude and Longitude are required' })

  try {
    const data = await getWeatherDataByCoordinates(latitude, longitude)
    return res.json(data)
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}
