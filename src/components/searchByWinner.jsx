import React, { useState } from "react";
import useDebounce from "./useDebounce"


const SearchByWinner = ({ value, onChange }) => {
    const [filterWinner, setFilterWinner] = useState(value);
    const debouncedChange = useDebounce(onChange, 500);


    function handleChange(event) {
        setFilterWinner(event.target.value);
        debouncedChange(event.target.value);
    }

    
    return (
        <select
            className="list-filter"
            value={filterWinner}
            onChange={handleChange}
        >
            <option value="">Yes/No</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    )
};


export default SearchByWinner;