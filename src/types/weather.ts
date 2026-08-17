// Busca por nome de cidade (ex: "Sao Paulo,SP") ou por coordenadas
// (ex: geolocalização do navegador).
export type CityQuery = string | { lat: number; lon: number };

export type Weather = {
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

// HG Brasil retorna erro dentro do JSON com HTTP 200 (ex.: valid_key: false,
// ou "results" ausente/vazio para cidade não encontrada).
export type WeatherApiResponse = {
  valid_key?: boolean;
  results: Weather;
};
