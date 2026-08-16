import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

type Weather = {
  date: string;
  temp: number;
  description: string;
  humidity: number;
  condition_slug: string;
  currently: string;
  wind_speedy: string;
  sunrise: string;
  sunset: string;
  city_name: string;
  forecast: {
    min: number;
    max: number;
  }[];
};

type WeatherTheme =
  | "clear-day"
  | "clear-night"
  | "cloudy-day"
  | "cloudy-night"
  | "rain-day"
  | "rain-night"
  | "storm"
  | "snow";

function App() {

  const weatherURL = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=Sao Paulo,SP`;
  const [weather, setWeather] = useState<Weather | null>(null)
  const [weatherTheme, setWeatherTheme] = useState<WeatherTheme>("clear-day");

useEffect(() => {
  if (!weather) return;

  const slug = weather.condition_slug.toLowerCase();
  const isNight = weather.currently?.toLowerCase() === "noite";
  const base = slug.replace(/_day$|_night$/, "");

  if (base === "clear") {
    setWeatherTheme(isNight ? "clear-night" : "clear-day");
    return;
  }

  if (base === "cloud" || base === "cloudly" || base === "fog") {
    setWeatherTheme(isNight ? "cloudy-night" : "cloudy-day");
    return;
  }

  if (base === "rain" || base === "hail") {
    setWeatherTheme(isNight ? "rain-night" : "rain-day");
    return;
  }

  if (base === "storm" || base === "thunderstorm" || base === "risk_thunderstorm") {
    setWeatherTheme("storm");
    return;
  }

  if (base === "snow" || base === "ice") {
    setWeatherTheme("snow");
    return;
  }

  setWeatherTheme(isNight ? "clear-night" : "clear-day");
}, [weather]);

  useEffect(() => {
    fetch(weatherURL)
      .then(res => res.json())
      .then(data => setWeather(data.results));
  }, []);

  const isNight = weatherTheme.endsWith("-night");

  return (
    <div className={`weather-background ${weatherTheme}`}>
      <div className="app-container ">

        <>
        <SearchBar isNight={isNight}></SearchBar>
        <section className="card-weather">
          {weather && <WeatherCard weather={weather} isNight={isNight} />}
        </section>
        </>
      </div>
    </div>
  )
}

export default App
