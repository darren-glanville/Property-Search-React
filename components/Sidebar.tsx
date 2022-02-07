import styles from "../styles/modules/Sidebar.module.scss";

type Props = {
    className: string;
    types?: any | undefined;
    onTypeClick: (propertyType: string) => void;
    selected: string;
};

const Sidebar = (props: Props) => {
    // handle click of property type
    const handleClick = (e: any): void => {
        props.onTypeClick(e.currentTarget.dataset.id);
    };

    // render
    return (
        <div className={props.className}>
            <div className={styles.outer}>
                <h2>Property types</h2>

                {props?.types && (
                    <div className={styles.types}>
                        <div
                            key="all"
                            className={`${styles.type} ${
                                props.selected === "" ? styles.selected : ""
                            }`}
                            onClick={handleClick}
                            data-id={""}
                        >
                            All
                        </div>
                        {Object.keys(props.types).map((item, key) => (
                            <div
                                key={key}
                                className={`${styles.type} ${
                                    props.selected === props.types[item].value
                                        ? styles.selected
                                        : ""
                                }`}
                                onClick={handleClick}
                                data-id={props.types[item].value}
                            >
                                {props.types[item].label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
