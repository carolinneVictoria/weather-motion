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
  | "storm"
  | "snow";

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
};
