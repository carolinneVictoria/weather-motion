import styles from './styles.module.css';

type Weather = {
  date: string;
  temp: number;
  description: string;
  humidity: number;
  condition_slug: string;
  wind_speedy: string;
  sunrise: string;
  sunset: string;
  city_name: string;
  forecast: {
    min: number;
    max: number;
  }[];
};

const WeatherCard = ({ weather, isNight }: { weather: Weather; isNight?: boolean }) => {

    return (
        <section className={`${styles.weatherCard} ${isNight ? styles.night : ''}`}>
            <div className={styles.header}>
                <div>
                    <p className={styles.label}>Hoje</p>
                    <p className={styles.date}>{weather.date}</p>
                </div>
                <span className={styles.city}>{weather.city_name}</span>
            </div>

            <div className={styles.mainInfo}>
                <img className={styles.icon} src={`/icons-weather/${weather.condition_slug}.svg`} alt={weather.description} />
                <div className={styles.temperatureBlock}>
                    <p className={styles.temperature}>{weather.temp}°C</p>
                    <span className={styles.description}>{weather.description}</span>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.humidity}>
                    <div>
                        <img src="/humidity.svg" alt="Icone de umidade"/>
                        <span>Umidade</span>
                    </div>
                    <span>{weather.humidity}%</span>
                </div>

                <div className={styles.minMax}>
                    <div>
                        <img src="/temp.svg" alt="Icone de temperatura"/>
                        <span>Min/Max</span>
                    </div>
                    <span>{weather.forecast[0].min}°C / {weather.forecast[0].max}°C</span>
                </div>
            </div>
        </section>
    )

}

export default WeatherCard;