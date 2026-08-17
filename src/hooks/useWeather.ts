import { useEffect, useState } from 'react';
import type { CityQuery, Weather, WeatherApiResponse } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

type UseWeatherResult = {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
};

function buildWeatherUrl(query: CityQuery) {
  const params = new URLSearchParams({ format: 'json-cors', key: API_KEY });

  if (typeof query === 'string') {
    params.set('city_name', query);
  } else {
    params.set('lat', String(query.lat));
    params.set('lon', String(query.lon));
  }

  return `https://api.hgbrasil.com/weather?${params.toString()}`;
}

export function useWeather(query: CityQuery): UseWeatherResult {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const url = buildWeatherUrl(query);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Falha na requisição');
        return res.json() as Promise<WeatherApiResponse>;
      })
      .then((data) => {
        if (data.valid_key === false || !data.results) {
          throw new Error('Cidade não encontrada');
        }
        setWeather(data.results);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message === 'Cidade não encontrada' ? err.message : 'Não foi possível obter o clima. Tente novamente.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  return { weather, loading, error };
}
