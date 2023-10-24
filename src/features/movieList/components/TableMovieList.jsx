import React, { useEffect, useState } from "react";

import Requester from "../../../data/Requester.js";
import Table from "../../../components/tables/Table.jsx";
import FilterByYear from "../FilterByYear.jsx";
import SearchByWinner from "../SearchByWinner.jsx";


const TableMovieList = ({currentPage, setTotalPages}) => {
    // State which stores the data to be displayed in the table.
    const [movieData, setMovieData] = useState([]);
    const [filterYear, setFilterYear] = useState("");
    const [filterWinner, setFilterWinner] = useState("");

    // Table structure.
    const CelYear = () => {
        return (
            <div className="list-filter">
                <p>Year</p>
                <FilterByYear value={filterYear} onChange={setFilterYear} />
            </div>
        )
    };

    const CelWinner = () => (
        <div className="list-filter">
            <p>Winner?</p>
            <SearchByWinner value={filterWinner} onChange={setFilterWinner} />
        </div>
    );

    const tableColumns = [
        { heading: "ID", rowName: "id" },
        { heading: <CelYear />, rowName: "year" },
        { heading: "Title", rowName: "title" },
        { heading: <CelWinner />, rowName: "winner" },
    ];

    // Calls fetchData when the component is mounted.
    useEffect(() => {
        // Fetch data from the API.
        const fetchData = async () => {
            try {
                // Checks if filterYear is true (not empty or undefined).
                // If true, its value is used as an additional query parameter.
                const yearParam = filterYear ? `&year=${filterYear}` : ""; 
                
                const data = await Requester(
                    "get", `?page=${currentPage}&size=15${filterWinner}${yearParam}`, 
                    null,
                    response => {
                        return response.data;
                    }
                );

                setTotalPages(data.totalPages);
                setMovieData(data.content);
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error(error);
            }
        };

        fetchData();
    }, [currentPage, filterYear, filterWinner, setTotalPages]);

    return (
        <Table data={movieData} table={tableColumns}></Table>
    );
};


export default TableMovieList;