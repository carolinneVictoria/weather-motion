import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar';
import { useWeather } from './hooks/useWeather';
import type { CityQuery } from './types/weather';

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
    
    const DEFAULT_CITY = 'Sao Paulo,SP';
    const [city, setCity] = useState<CityQuery>(DEFAULT_CITY);
    const { weather, loading, error } = useWeather(city);
    const [weatherTheme, setWeatherTheme] = useState<WeatherTheme>("clear-day");

    // Na primeira carga, tenta usar a localização do navegador como cidade
    // padrão. Se o usuário negar ou o navegador não suportar, mantém
    // DEFAULT_CITY (já é o valor inicial, então não faz nada no erro).
    
    useEffect(() => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCity({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        () => {
          // permissão negada ou falha: mantém DEFAULT_CITY
        }
      );
    }, []);

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

    const isNight = weatherTheme.endsWith("-night");

    return (
      <div className={`weather-background ${weatherTheme}`}>
        <div className="app-container">
          <SearchBar isNight={isNight} onSearch={setCity} />
          <section className="card-weather">
            {loading && <p className="weather-status">Carregando...</p>}
            {!loading && error && <p className="weather-status weather-error">{error}</p>}
            {!loading && !error && weather && <WeatherCard weather={weather} isNight={isNight} />}
          </section>
        </div>
      </div>
    );
  }

export default App
