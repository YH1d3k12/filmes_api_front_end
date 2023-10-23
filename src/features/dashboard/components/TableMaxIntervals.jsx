import React, { useEffect, useState } from "react";

import Requester from "../../../data/Requester.js";
import Table from "../../../components/tables/Table.jsx";


const TableMaxIntervals = () => {
    // State which stores the data to be displayed in the table.
    const [maxIntervalData, setMaxIntervalData] = useState([]);

    // Table structure.
    const tableColumns = [
        { heading: "Producer", rowName: "producer" },
        { heading: "Interval", rowName: "interval" },
        { heading: "Previous Year", rowName: "previousWin" },
        { heading: "Following Year", rowName: "followingWin" }
    ];

    // Fetch data from the API.
    const fetchData = async () => {
        try {
            const data = await Requester(
                "get", `?projection=max-min-win-interval-for-producers`, 
                null,
                response => {
                    return response.data;
                }
            );

            // Update the state with the data fetched from the API.
            setMaxIntervalData(data.max);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(error);
        }
    }

    // Calls fetchData when the component is mounted.
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table data={maxIntervalData} table={tableColumns}></Table>
    );
}


export default TableMaxIntervals;