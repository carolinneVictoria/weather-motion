import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {

  const weatherURL = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=Sao Paulo,SP`;
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetch(weatherURL)
      .then(res => res.json())
      .then(data => setWeather(data.results));
  }, []);

  return (
    <div className="app-container">

      <>
      <SearchBar></SearchBar>
      <section className="card-weather">
        {weather && <WeatherCard weather={weather} />}
      </section>
      </>
    </div>
  )
}

export default App
