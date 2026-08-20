import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar';
import { useWeather } from './hooks/useWeather';
import type { CityQuery } from './types/weather';

const DEFAULT_CITY = 'Sao Paulo,SP';

function App() {

  const [city, setCity] = useState<CityQuery>(DEFAULT_CITY);
  const { weather, loading, error } = useWeather(city);

  // Na primeira carga, tenta usar a localização do navegador como cidade
  // padrão. Se o usuário negar ou o navegador não suportar, mantém
  // DEFAULT_CITY (já é o valor inicial, então não faz nada no erro).
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCity({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      (err) => {
        // permissão negada ou falha: mantém DEFAULT_CITY
        // err.code: 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
        console.warn(`[geolocation] falhou (code=${err.code}): ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const weatherTheme = weather?.theme ?? 'clear-day';
  const isNight = weatherTheme.endsWith('-night');

  return (
    <div className={`weather-background ${weatherTheme}`}>
      <div className="app-container">
        <SearchBar isNight={isNight} onSearch={setCity} />
        <section className="card-weather">
          {loading && <p className={`weather-status ${isNight ? 'night' : ''}`}>Carregando...</p>}
          {!loading && error && <p className={`weather-status weather-error ${isNight ? 'night' : ''}`}>{error}</p>}
          {!loading && !error && weather && <WeatherCard weather={weather} isNight={isNight} />}
        </section>
      </div>
    </div>
  );
}

export default App
