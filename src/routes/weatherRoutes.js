import express from 'express'
import {
  getWeatherByCity,
  getWeatherByCoordinates,
} from '../controllers/weatherController.js'

const router = express.Router()

router.get('/:city', getWeatherByCity)
router.get('/:latitude/:longitude', getWeatherByCoordinates)

export default router
