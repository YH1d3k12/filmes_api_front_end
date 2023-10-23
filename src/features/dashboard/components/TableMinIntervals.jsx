import React, { useEffect, useState } from "react";

import Requester from "../../../data/Requester.js";
import Table from "../../../components/tables/Table.jsx";


const TableMinIntervals = () => {
    // State which stores the data to be displayed in the table.
    const [minIntervalData, setMinIntervalData] = useState([]);

    // Table structure.
    const tableColumns = [
        { heading: "Producer", rowName: "producer" },
        { heading: "Interval", rowName: "interval" },
        { heading: "Previous Year", rowName: "previousWin" },
        { heading: "Following Year", rowName: "followingWin" }
    ];

    // Calls fetchData when the component is mounted.
    useEffect(() => {
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
                setMinIntervalData(data.min);
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Table data={minIntervalData} table={tableColumns}></Table>
    );
};


export default TableMinIntervals;