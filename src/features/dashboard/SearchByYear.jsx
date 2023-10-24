import React, { useState } from "react";
import useDebounce from "../../utilities/UseDebounce.jsx"


const SearchByYear = ({ value, onChange }) => {
    const [filterYear, setFilterYear] = useState(value);
    const debouncedChange = useDebounce(onChange, 200);

    // Updates the filterYear state when the user types in the input field.
    function handleChange(event) {
        setFilterYear(event.target.value);
    }

    // Handles the search button click event.
    function handleSearchButton() {
        debouncedChange(filterYear);
    }
    
    return (
        <div className="search-container">
            <input
                placeholder="Search by year"
                type="number"
                value={filterYear}
                onChange={handleChange}
            />
            <button data-testid="search-button" onClick={handleSearchButton}>🔍︎</button>
        </div>
    )
};


export default SearchByYear;