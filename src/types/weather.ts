// Busca por nome de cidade (ex: "Sao Paulo,SP") ou por coordenadas
// (ex: geolocalização do navegador).
export type CityQuery = string | { lat: number; lon: number };

export type WeatherTheme =
  | "clear-day"
  | "clear-night"
  | "cloudy-day"
  | "cloudy-night"
  | "rain-day"
  | "rain-night"
  | "storm-day"
  | "storm-night"
  | "snow-day"
  | "snow-night";

export type Weather = {
  date: string;
  temp: number;
  description: string;
  humidity: number;
  condition_slug: string;
  theme: WeatherTheme;
  city_name: string;
  forecast: {
    min: number;
    max: number;
  }[];
  daily: {
    date: string;
    min: number;
    max: number;
    condition_slug: string;
    description: string;
  }[];
};
