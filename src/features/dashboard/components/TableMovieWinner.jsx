import React, { useEffect, useState } from "react";

import Requester from "../../../data/Requester.js";
import Table from "../../../components/tables/Table.jsx";


const TableMovieWinner = ({value}) => {
    // State which stores the data to be displayed in the table.
    const [movieWinnerData, setMovieWinnerData] = useState([]);

    // Table structure.
    const tableColumns = [
        { heading: "Id", rowName: "winner" },
        { heading: "Year", rowName: "year" },
        { heading: "Title", rowName: "title" }
    ];

    // Fetch data from the API.
    const fetchData = async () => {
        try {
            // Checks if value is true (not empty or undefined).
            // If true, its value is used as a query parameter.
            // If false, the query parameter is set to 0000.
            const yearParam = value ? `&year=${value}` : "&year=0000"; 

            const data = await Requester(
                "get", `?winner=true${yearParam}`, 
                null,
                response => {
                    return response.data;
                }
            );
            
            console.log("Executed")
            // Update the state with the data fetched from the API.
            setMovieWinnerData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(error);
        }
    };

    // Calls fetchData when the component is mounted.
    useEffect(() => {
        fetchData();
    }, [value]);

    return (
        <Table data={movieWinnerData} table={tableColumns}></Table>
    );
};


export default TableMovieWinner;