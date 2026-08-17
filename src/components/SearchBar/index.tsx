import { useState, type KeyboardEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.css';

type SearchBarProps = {
  isNight?: boolean;
  onSearch: (city: string) => void;
};

const SearchBar = ({ isNight, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className={`${styles.searchBar} ${isNight ? styles.night : ''}`}>
      <input
        type="text"
        className={styles.inputSearch}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua cidade..."
      />
      <button className={styles.buttonSearch} onClick={submit} type="button">
        <FaSearch size={20} color="#333" />
      </button>
    </div>
  );
};

export default SearchBar;