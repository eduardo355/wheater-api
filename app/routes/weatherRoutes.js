import express from 'express'
import {
  getWeatherByCity,
  getWeatherByCoordinates,
  getAddressByCoordinates,
} from '../controllers/weatherController.js'

const router = express.Router()

router.get('/:city', getWeatherByCity)
router.get('/:latitude/:longitude', getWeatherByCoordinates)
router.get('/coordinates/:latitude/:longitude', getAddressByCoordinates)

export default router
