import type { Weather } from '../../types/weather';
import styles from './styles.module.css';

type NextDaysProps = {
  days: Weather['daily'];
  isNight?: boolean;
};

const NextDays = ({ days, isNight = false }: NextDaysProps) => {
  if (!days?.length) return null;

  return (
    <aside
      className={`${styles.nextDays} ${isNight ? styles.night : ''}`}
    >
      <p className={styles.label}>Próximos dias</p>

      <div className={styles.list}>
        {days.slice(0, 3).map((day) => (
          <article className={styles.day} key={day.date}>
            <span className={styles.dayLabel}>{day.date}</span>

            <img
              className={styles.dayIcon}
              src={`/icons-weather/${day.condition_slug}.svg`}
              alt={day.description}
            />

            <div className={styles.dayTemps}>
              <strong>{day.max}°</strong>
              <span>{day.min}°</span>
            </div>

            <span className={styles.description}>
              {day.description}
            </span>
          </article>
        ))}
      </div>
    </aside>
  );
};

export default NextDays;