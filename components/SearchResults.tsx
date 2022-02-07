import { resourceLimits } from "worker_threads";
import styles from "../styles/modules/SearchResults.module.scss";

type Props = {
    className: string;
    results: Array<any>;
    types?: any | undefined;
    onPropertySelect: (property: string) => void;
    selected: Array<any>;
};

const SearchResults = (props: Props) => {
    // handle new search
    const handlePropertySelect = (e: any): void => {
        const propertyId =
            undefined !== e.currentTarget.dataset.id
                ? e.currentTarget.dataset.id
                : e.currentTarget.parentNode.parentNode.dataset.id; // push value up

        props.onPropertySelect(propertyId);
    };

    // results
    const Results = (selectedResults = false) => {
        if (selectedResults && props.selected.length == 0) return null; // return if not selected

        // data to show
        const dataToShow = !selectedResults
            ? props.results
            : props.results.filter((property) =>
                  props.selected.includes(property.id)
              );

        // create table
        return (
            <div className={styles.area}>
                <h2>
                    {selectedResults ? "Selected properties" : "Search results"}
                </h2>

                <div className={styles.table}>
                    <table>
                        <thead>
                            <tr>
                                {!selectedResults && <th>&#10003;</th>}
                                <th>Address</th>
                                <th>Postcode</th>
                                {!selectedResults && <th>Property type</th>}
                                <th>Number of rooms</th>
                                <th>
                                    Floor area (m<sup>2</sup>)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataToShow.map((property, index) => {
                                // undefined check
                                if (undefined === property) return null;

                                // property type
                                const propertyType = props.types.find(
                                    (type: any) =>
                                        type.value === property.propertyType
                                );

                                // output property
                                return (
                                    <tr
                                        key={property.id}
                                        data-id={property.id}
                                        onClick={handlePropertySelect}
                                    >
                                        {!selectedResults && (
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    onChange={
                                                        handlePropertySelect
                                                    }
                                                    checked={props.selected.includes(
                                                        property.id
                                                    )}
                                                />
                                            </td>
                                        )}
                                        <td>{property.address}</td>
                                        <td>{property.postcode}</td>
                                        {!selectedResults && (
                                            <td>{propertyType.label}</td>
                                        )}
                                        <td>{property.numberOfRooms}</td>
                                        <td>{property.floorArea}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // render
    return (
        <section className={props.className}>
            {props?.results.length > 0 ? (
                <div>
                    {Results(true)}
                    {Results()}
                </div>
            ) : (
                <div className={styles.start}>
                    <div>
                        Enter address above and then selected{" "}
                        <strong>Search</strong>.
                    </div>
                </div>
            )}
        </section>
    );
};

export default SearchResults;
