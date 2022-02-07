import styles from "../styles/modules/Searchbar.module.scss";

type Props = {
    className: string;
    onSearchChange: (search: string) => void;
};

const Searchbar = (props: Props) => {
    // handle new search
    const handleSearchSubmit = (e: any): void => {
        e.preventDefault(); // stop form submit
        props.onSearchChange(e.target[0].value); // push value up
    };

    // render
    return (
        <section className={props.className}>
            <h2>Search</h2>

            <form className={styles.form} onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Address" id="search" />
                <button type="submit">Search</button>
            </form>
        </section>
    );
};

export default Searchbar;
