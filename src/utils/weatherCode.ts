import type { WeatherTheme } from '../types/weather';

type WeatherCodeInfo = {
  conditionSlug: string;
  description: string;
  theme: WeatherTheme;
};

export function mapWeatherCode(code: number, isDay: boolean): WeatherCodeInfo {
  const dayNight = isDay ? 'day' : 'night';

  if (code === 0) {
    return { conditionSlug: `clear_${dayNight}`, description: 'Céu limpo', theme: `clear-${dayNight}` };
  }

  if (code === 1 || code === 2) {
    return { conditionSlug: `cloudly_${dayNight}`, description: 'Parcialmente nublado', theme: `cloudy-${dayNight}` };
  }

  if (code === 3) {
    return { conditionSlug: 'cloud', description: 'Nublado', theme: `cloudy-${dayNight}` };
  }

  if (code === 45 || code === 48) {
    return { conditionSlug: 'fog', description: 'Neblina', theme: `cloudy-${dayNight}` };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { conditionSlug: 'rain', description: 'Garoa', theme: `rain-${dayNight}` };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { conditionSlug: 'rain', description: 'Chuva', theme: `rain-${dayNight}` };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { conditionSlug: 'snow', description: 'Neve', theme: 'snow' };
  }

  if (code === 95) {
    return { conditionSlug: 'storm', description: 'Tempestade', theme: 'storm' };
  }

  if (code === 96 || code === 99) {
    return { conditionSlug: 'hail', description: 'Tempestade com granizo', theme: 'storm' };
  }

  return { conditionSlug: `none_${dayNight}`, description: 'Condição desconhecida', theme: `clear-${dayNight}` };
}
