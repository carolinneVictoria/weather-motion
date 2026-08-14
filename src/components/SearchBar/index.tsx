import { FaSearch } from "react-icons/fa";
import styles from './styles.module.css';

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                className={styles.inputSearch}
                // onChange={handleInputChange}
                placeholder="Pesquisar por cidade..."
            />
            <button className={styles.buttonSearch}>
                <FaSearch size={20} color="#333" />
            </button>
        </div>
    )
}

export default SearchBar;