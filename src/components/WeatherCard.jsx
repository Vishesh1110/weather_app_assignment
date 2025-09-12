import { WiThermometer, WiStrongWind } from 'react-icons/wi';

export default function WeatherCard({ coords, weather }) {
  return (
    <div className="weather-card">
      <h2>{coords.name}, {coords.country}</h2>
      <div className="weather-details">
        <div className="weather-item">
          <WiThermometer size={48} />
          <p>{weather.temperature_2m}°C</p>
        </div>
        <div className="weather-item">
          <WiStrongWind size={48} />
          <p>{weather.wind_speed_10m} km/h</p>
        </div>
      </div>
    </div>
  );
}