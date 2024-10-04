import redis from 'redis'
import dotenv from 'dotenv'

dotenv.config()

export const client = redis.createClient({
  password: process.env.PASSWORD,
  socket: {
    host: process.env.HOST,
    port: process.env.PORT_REDIS,
  },
})

client.on('connect', () => {
  console.log('Connected to Redis')
})

client.on('error', (err) => {
  console.error('Redis connection error:', err)
})

export const connectedRedisClient = async () => {
  await client.connect()
}
