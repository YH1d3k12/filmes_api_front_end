import React, { useEffect, useState } from "react";

import Requester from "../../../data/Requester.js";
import Table from "../../../components/tables/Table.jsx";


const TableTopStudios = () => {
    // State which stores the data to be displayed in the table.
    const [topStudiosData, setTopStudiosData] = useState([]);

    // Table structure.
    const tableColumns = [
        { heading: "Name", rowName: "name" },
        { heading: "Win Count", rowName: "winCount" }
    ];

    // Calls fetchData when the component is mounted.
    useEffect(() => {
        // Fetch data from the API.
        const fetchData = async () => {
            try {
                const data = await Requester(
                    "get", `?projection=studios-with-win-count`, 
                    null,
                    response => {
                        return response.data;
                    }
                );
    
                // Update the state with the data fetched from the API.
                // First argument of slice is the starting index, second argument is the ending index.
                setTopStudiosData(data.studios.slice(0, 3));
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <Table data={topStudiosData} table={tableColumns}></Table>
    );
}


export default TableTopStudios;