Aquí tienes el README actualizado sin el código del final y con el endpoint correcto para obtener la dirección mediante coordenadas:

---

# Weather API with Redis Caching

This project is an API built with Node.js and Express that fetches weather data from the [Visual Crossing Weather API](https://www.visualcrossing.com/) and location data from the [OpenCage Geocoder API](https://opencagedata.com/), with responses cached using Redis. The application supports fetching weather information based on city names or geographic coordinates (latitude and longitude), as well as detailed address information. Cached results improve performance and reduce external API calls by storing data for one hour.

## Features

- **Weather Data by City**: Fetch current weather information by providing a city name.
- **Weather Data by Coordinates**: Fetch current weather information by providing latitude and longitude.
- **Location Data by Coordinates**: Fetch detailed address information (e.g., road, city, state) by providing latitude and longitude.
- **Redis Caching**: The API caches both weather and location data for one hour to avoid redundant requests to external APIs.
- **Error Handling**: Gracefully handles errors when fetching data from external APIs or Redis.

## Tech Stack

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building the API.
- **Redis**: In-memory key-value store used for caching data.
- **Axios**: HTTP client for making API requests.
- **dotenv**: Loads environment variables from `.env` file.
- **Visual Crossing API**: Third-party API for fetching weather data.
- **OpenCage Geocoder API**: Third-party API for fetching location data.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **Redis** (Ensure you have a Redis instance running locally or in the cloud)
- A **Visual Crossing API Key** to fetch weather data.
- An **OpenCage Geocoder API Key** to fetch location data.

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
   KEY_OPENCAGEDATA='your_opencagedata_api_key'
   ```

4. **Start Redis**: Ensure Redis is running on your machine or connect to a Redis cloud instance.

5. **Run the application**:
   ```bash
   npm run dev
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

### Get Address by Coordinates

- **Endpoint**: `/api/weather/coordinates/:latitude/:longitude`
- **Method**: GET
- **Description**: Fetches detailed address information (road, city, state, etc.) based on latitude and longitude.

**Example**:
```bash
GET http://localhost:3000/api/weather/coordinates/51.5074/-0.1278
```

This endpoint uses the OpenCage Geocoder API to get detailed location data and caches the response for 1 hour. If the data is already cached, it will return the cached version.

## Caching Strategy

- **Weather Data**: When a request is made to the `/api/weather/:city` or `/api/weather/:latitude/:longitude` endpoints, the server first checks Redis for cached weather data.
  - If cached data is found, it is returned immediately.
  - If no cached data is found, the server fetches the data from Visual Crossing API, stores it in Redis, and returns the result. The cache expiration time is set to 1 hour (3600 seconds).
  
- **Location Data**: When a request is made to `/api/weather/coordinates/:latitude/:longitude`, the server first checks Redis for cached location data.
  - If cached data is found, it is returned immediately.
  - If no cached data is found, the OpenCage Geocoder API is called, and the result is cached for 1 hour.

## Project Structure

```bash
├── src
│   ├── config
│   │   └── redisClient.js       # Redis client configuration
│   ├── controllers
│   │   └── weatherController.js # Controller for weather routes
│   ├── models
│   │   └── weatherModel.js      # Model to interact with Redis and external APIs
│   ├── routes
│   │   └── weatherRoutes.js     # Routes for weather and geolocation API
│   └── index.js                 # Main entry point of the app
└── .env                         # Environment variables
```

---
