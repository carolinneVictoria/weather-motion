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

const WeatherCard = ({ weather }: { weather: Weather}) => {

    return (
        <section className={styles.weatherCard}>

            <p>Hoje</p>
            <p>{weather.date}</p>
            <img src={`/icons-weather/${weather.condition_slug}.svg`} alt={weather.description}/>

            <p>{weather.temp}°C</p>
            <span>{weather.description}</span>

            <div className={styles.humidity}>
                <div>
                    <img src="/humidity.svg" alt="Icone de umidade"/>
                    <span>Umidade:</span>
                </div>
                <span>{weather.humidity}%</span>
            </div>

            <div className={styles.minMax}>
                <div>
                    <img src="/temp.svg" alt="Icone de temperatura"/>
                    <span>Min/Max:</span>
                </div>
                <span>{weather.forecast[0].min}°C / {weather.forecast[0].max}°C</span>
            </div>

        </section>
    )

}

export default WeatherCard;