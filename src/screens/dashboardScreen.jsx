import React, { useEffect, useState } from "react";

import Requester from "../data/requester.js";
import Table from "../components/table.jsx";


export default function DashboardScreen() {
    // Defines movieData as an empty array.
    // setMovieData is a method which changes the value of movieData.
    const [movieData, setMovieData] = useState([]);

    // When the component is loaded useEffect is executed.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Requester("get", "?page=0&size=10", null, (response) => {
                    return response.data;
                });

                console.log("Data", data)

                // Check if data.content is an array before setting the state.
                if (Array.isArray(data.content)) {
                    // console.log("Its an array:", data.content);
                    setMovieData(data.content);
                } 
                else {
                    // console.error("Its not an array:", data);
                }

                // setMovieData(data.content);
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error(error);
            }
        };
        // Calls fetchData when fully loaded.
        fetchData();
    // Second parameter of useEffect is a dependency list, if empty, the method is executed once.
    // If given dependencies, useEffect is executed every time a value is changed.
    }, []); 

    // Defines the column headings and the values to be displayed.
    const table = [
        { heading: "ID", rowName: "id"},
        { heading: "Year", rowName: "year" },
        { heading: "Title", rowName: "title" },
        { heading: "Winner?", rowName: "winner"}
    ];

    return (
        <div className="dashboardScreen">
            <Table data={movieData} table={table}></Table>
        </div>
    );
};