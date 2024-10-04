# Weather API with Redis Caching

This project is an API built with Node.js and Express that fetches weather data from the [Visual Crossing Weather API](https://www.visualcrossing.com/) and caches the responses using Redis. The application supports fetching weather information based on city names or geographic coordinates (latitude and longitude) and caches the results for 1 hour to improve performance and reduce external API calls.

## Features

- **Weather Data by City**: Fetch current weather information by providing a city name.
- **Weather Data by Coordinates**: Fetch current weather information by providing latitude and longitude.
- **Redis Caching**: The API caches the weather data for one hour to avoid redundant requests to the external weather API.
- **Error Handling**: Gracefully handles errors when fetching data from the weather API or Redis.

## Tech Stack

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building the API.
- **Redis**: In-memory key-value store used for caching weather data.
- **Axios**: HTTP client for making API requests.
- **dotenv**: Loads environment variables from `.env` file.
- **Visual Crossing API**: Third-party API for fetching weather data.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **Redis** (Ensure you have a Redis instance running locally or in the cloud)
- A **Visual Crossing API Key** to fetch weather data.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/weather-api.git
   cd weather-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your environment variables**:
   Create a `.env` file in the root of your project and add the following keys:
   ```plaintext
   PORT=3000
   PASSWORD='your_redis_password'
   HOST='your_redis_host'
   PORT_REDIS=your_redis_port
   KEY_WEATHER='your_visualcrossing_api_key'
   ```

4. **Start Redis**: Ensure Redis is running on your machine or connect to a Redis cloud instance.

5. **Run the application**:
   ```bash
   npm start
   ```

6. The API will be running on `http://localhost:3000`.

## API Endpoints

### Get Weather by City

- **Endpoint**: `/api/weather/:city`
- **Method**: GET
- **Description**: Fetches weather data for a specified city.

**Example**:
```bash
GET http://localhost:3000/api/weather/London
```

### Get Weather by Coordinates

- **Endpoint**: `/api/weather/:latitude/:longitude`
- **Method**: GET
- **Description**: Fetches weather data for a specified latitude and longitude.

**Example**:
```bash
GET http://localhost:3000/api/weather/51.5074/-0.1278
```

## Project Structure

```bash
├── src
│   ├── config
│   │   └── redisClient.js       # Redis client configuration
│   ├── controllers
│   │   └── weatherController.js # Controller for weather routes
│   ├── models
│   │   └── weatherModel.js      # Model to interact with the Redis client
│   ├── routes
│   │   └── weatherRoutes.js     # Routes for weather API
│   └── index.js                 # Main entry point of the app
└── .env                         # Environment variables
```

## Caching Strategy

- When a request is made to the `/api/weather/:city` or `/api/weather/:latitude/:longitude` endpoints, the server first checks Redis for cached data.
- If cached data is found, it is returned immediately without calling the Visual Crossing API.
- If no cached data is found, the server fetches the data from Visual Crossing API, stores it in Redis, and returns the result.
- The cache expiration time is set to 1 hour (3600 seconds).
