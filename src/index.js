import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import responseTime from 'response-time'
import weatherRoutes from './routes/weatherRoutes.js'
import { connectedRedisClient } from './config/redisClient.js'

await connectedRedisClient()

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(responseTime())

app.use('/api/weather', weatherRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
