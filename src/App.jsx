import { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchCoordinates = async () => {
    try {
      setError('');
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      if (response.data.results && response.data.results.length > 0) {
        const { latitude, longitude, name, country } = response.data.results[0];
        setCoords({ latitude, longitude, name, country });
        fetchWeather(latitude, longitude);
      } else {
        setError('City not found');
      }
    } catch {
      setError('Error fetching coordinates');
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const params = {
        latitude,
        longitude,
        current: 'temperature_2m,wind_speed_10m',
        hourly: 'temperature_2m,wind_speed_10m'
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const response = await axios.get(url, { params });
      setWeather(response.data.current);
    } catch {
      setError('Error fetching weather data');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchCoordinates();
    }
  };

  // return (
  //   <div className="app">
  //     <h1>Weather App</h1>
  //     <form onSubmit={handleSearch}>
  //       <input
  //         type="text"
  //         placeholder="Enter city"
  //         value={city}
  //         onChange={(e) => setCity(e.target.value)}
  //       />
  //       <button type="submit">Search</button>
  //     </form>
  //     {error && <p className="error">{error}</p>}
  //     {weather && coords && <WeatherCard coords={coords} weather={weather} />}
  //   </div>
  // );
  return (
    <div className="app-container">
      <div className="rain">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="drop"></div>
        ))}
      </div>
      <div className="app">
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
        {weather && coords && <WeatherCard coords={coords} weather={weather} />}
      </div>
    </div>
  );
}

export default App;