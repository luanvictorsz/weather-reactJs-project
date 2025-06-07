import { useState, useEffect } from 'react';
import './App.css';

const API_KEY = 'dcb679bff05acdac4053c01c78f6e23f'; //consulte https://openweathermap.org/api para adiquirir

function WeatherApp() {
  const [city, setCity] = useState('São Paulo');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      console.warn('Please enter a city name to search for weather.');
      return; 
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`);
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    handleSearch();
  }, []); 

  if (!weatherData) return <p>Carregando...</p>;

  return (
    <div className="bigger-box">
      <input
        className="input-city"
        placeholder="Pesquisar Cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="button-search" onClick={handleSearch}>
        <img
          className="img-search"
          alt="busca"
          src="https://cdn-icons-png.flaticon.com/512/2866/2866321.png"
        />
      </button>
      {weatherData && (
        <div className="media-box">
          <h2 className="city">Tempo em {weatherData.name}</h2>
          <p className="temp">{Math.floor(weatherData.main.temp)}°C</p>
          <div className="minor-box">
            <img
              className="icon-prevision"
              alt="icone-info-tempo"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            />
            <p className="text-prevision">{weatherData.weather[0].description}</p>
          </div>
          <p className="moisture">Umidade: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
