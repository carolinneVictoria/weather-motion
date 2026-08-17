import { useEffect, useState } from 'react';
import type { CityQuery, Weather } from '../types/weather';
import { mapWeatherCode } from '../utils/weatherCode';

type UseWeatherResult = {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
};

type Coordinates = {
  latitude: number;
  longitude: number;
  cityName: string;
};

// Resolve a cidade buscada num par de coordenadas + nome de exibição.
// - Nome de cidade: busca via Open-Meteo Geocoding API.
// - Coordenadas (geolocalização do navegador): usa direto; o nome da cidade
//   é resolvido via reverse geocoding (BigDataCloud, gratuito e sem chave) —
//   é best-effort, se falhar cai num nome genérico sem quebrar a busca do clima.
async function resolveCoordinates(query: CityQuery, signal: AbortSignal): Promise<Coordinates> {
  if (typeof query === 'string') {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pt&format=json`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('Não foi possível buscar a cidade. Tente novamente.');

    const data = await res.json();
    const place = data.results?.[0];
    if (!place) throw new Error('Cidade não encontrada.');

    const cityName = place.admin1 && place.admin1 !== place.name ? `${place.name}, ${place.admin1}` : place.name;
    return { latitude: place.latitude, longitude: place.longitude, cityName };
  }

  let cityName = 'Sua localização';
  try {
    const reverseUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${query.lat}&longitude=${query.lon}&localityLanguage=pt`;
    const res = await fetch(reverseUrl, { signal });
    if (res.ok) {
      const data = await res.json();
      const state = data.principalSubdivisionCode?.split('-')[1];
      const locality = data.locality || data.city;
      if (locality) cityName = state ? `${locality}, ${state}` : locality;
    }
  } catch {
    // reverse geocoding é best-effort — mantém o nome genérico em caso de falha
  }

  return { latitude: query.lat, longitude: query.lon, cityName };
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

    (async () => {
      const { latitude, longitude, cityName } = await resolveCoordinates(query, controller.signal);

      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await fetch(forecastUrl, { signal: controller.signal });
      if (!res.ok) throw new Error('Não foi possível obter o clima. Tente novamente.');

      const data = await res.json();
      const { conditionSlug, description, theme } = mapWeatherCode(data.current.weather_code, data.current.is_day === 1);

      setWeather({
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }),
        temp: Math.round(data.current.temperature_2m),
        description,
        humidity: data.current.relative_humidity_2m,
        condition_slug: conditionSlug,
        theme,
        city_name: cityName,
        forecast: [
          {
            min: Math.round(data.daily.temperature_2m_min[0]),
            max: Math.round(data.daily.temperature_2m_max[0]),
          },
        ],
      });
    })()
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Não foi possível obter o clima. Tente novamente.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  return { weather, loading, error };
}
