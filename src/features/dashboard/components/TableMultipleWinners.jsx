import React, { useEffect, useState } from "react";

import Requester from "../../../data/Requester.js";
import Table from "../../../components/tables/Table.jsx";


const TableMultipleWinners = () => {
    // State which stores the data to be displayed in the table.
    const [multipleWinnersData, setMultipleWinnersData] = useState([]);

    // Table structure.
    const tableColumns = [
        { heading: "Year", rowName: "year" },
        { heading: "Win Count", rowName: "winnerCount" }
    ];

    // Calls fetchData when the component is mounted.
    useEffect(() => {
        // Fetch data from the API.
        const fetchData = async () => {
            try {
                const data = await Requester(
                    "get", `?projection=years-with-multiple-winners`, 
                    null,
                    response => {
                        return response.data;
                    }
                );
    
                // Update the state with the data fetched from the API.
                setMultipleWinnersData(data.years);
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <Table data={multipleWinnersData} table={tableColumns}></Table>
    );
}


export default TableMultipleWinners;