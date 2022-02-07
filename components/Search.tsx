import React, { useEffect, useState } from "react";
import styles from "../styles/modules/Search.module.scss";

import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";

import {
    fetchProperties,
    fetchPropertyDetails,
    getAvailablePropertyTypes,
} from "../public/api";

const Search = () => {
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filters, setFilters] = useState({});

    const [search, setSearch] = useState("");
    const [foundProperties, setFoundProperties] = useState<string[]>([]);

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

    // get property types (one time)
    useEffect(() => {
        getAvailablePropertyTypes
            .apply((propertyTypes: any) => propertyTypes)
            .then((data) => {
                const types = data.propertyTypes;
                setFilters(types);
            });
    }, []);

    // handle change in property type
    const handleTypeChange = (propertyType: string): void => {
        setSelectedFilter(propertyType);
    };

    // handle change in search
    const handleSearchChange = (search: string): void => {
        setSearch(search);
        setSelectedProperties([]);
    };

    // handle selected properties
    const handlePropertySelect = (property: string): void => {
        const updatedValues = selectedProperties.includes(property)
            ? selectedProperties.filter((i) => i !== property) // remove item
            : [...selectedProperties, property]; // add item

        setSelectedProperties(updatedValues);
    };

    useEffect(() => {
        if (search !== "") {
            const fetchData = async () => {
                return await fetchProperties({
                    address: search,
                    propertyType:
                        selectedFilter !== "" ? selectedFilter : undefined,
                })
                    .then(async (data: any) => {
                        return data.properties.map(async (property: any) => {
                            // get property
                            return await fetchPropertyDetails(property.id)
                                .then((data) => {
                                    return data.property;
                                })
                                .catch((error) => {
                                    return [];
                                    console.log(error);
                                });
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        return [];
                    });
            };

            fetchData().then((properties) => {
                if (properties) {
                    Promise.all(properties).then((items) => {
                        setFoundProperties(items);
                    });
                }
            });
        }
    }, [search, selectedFilter]);

    // render
    return (
        <section className={styles.main}>
            <Sidebar
                className={styles.sidebar}
                types={filters}
                onTypeClick={handleTypeChange}
                selected={selectedFilter}
            />
            <Searchbar
                className={styles.search}
                onSearchChange={handleSearchChange}
            />
            <SearchResults
                className={styles.searchresults}
                results={foundProperties}
                types={filters}
                onPropertySelect={handlePropertySelect}
                selected={selectedProperties}
            />
        </section>
    );
};

export default Search;
