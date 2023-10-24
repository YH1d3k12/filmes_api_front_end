import React, { useState } from "react";
import useDebounce from "../../utilities/UseDebounce.jsx"


const FilterByYear = ({ value, onChange }) => {
    const [filterYear, setFilterYear] = useState(value);
    const debouncedChange = useDebounce(onChange, 500);

    function handleChange(event) {
        setFilterYear(event.target.value);
        debouncedChange(event.target.value);
    }
    
    return (
        <input
            className="list-filter"
            placeholder="Filter by year"
            type="number"
            value={filterYear}
            onChange={handleChange}
        />
    )
};


export default FilterByYear;