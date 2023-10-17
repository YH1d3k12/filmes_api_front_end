import React, { useEffect, useState } from "react";

import Requester from "../data/requester.js";
import Table from "../components/table.jsx";
import NavigationButtons from "../components/navigation_buttons.jsx";
import SearchByYear from "../utilities/searchByYear.js";
import SearchByWinner from "../utilities/searchByWinner.js";

import "./listScreen.css";


export default function ListScreen() {
    // Defines movieData as an empty array.
    // setMovieData is a method which changes the value of movieData.
    const [movieData, setMovieData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filterYear, setFilterYear] = useState("");
    const [filterWinner, setFilterWinner] = useState("");

    const fetchData = async () => {
        try {
            // Adds filterYear to endpoint if its not empty.
            const yearParam = filterYear ? `&year=${filterYear}` : ""; 
            
            let winnerParam = "";

            // Checks the value of fliterWinner and adds it to the endpoint.
            if (filterWinner === "yes") {
                winnerParam = "&winner=true";
            } else if (filterWinner === "no") {
                winnerParam = "&winner=false";
            }

            const data = await Requester(
                "get", `?page=${currentPage}&size=15${winnerParam}${yearParam}`, 
                null,
                response => {
                    setTotalPages(response.data.totalPages);
                    return response.data;
                }
            );
            
            // Checks if the content of the response is an array.
            if (Array.isArray(data.content)) {
                setMovieData(data.content);
            } else {
                console.error("Its not an array:", data);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            // If newPage is between 0 and totalPages, setCurrentPage to newPage.
            setCurrentPage(newPage);
        } else if (newPage < 0) {
            // Goes to the first page if newPage is less than zero.
            setCurrentPage(0);
        } else {
            // Goes to the last page if newPage is greater or equal than totalPages.
            setCurrentPage(totalPages - 1);
        }
    };

    // Sends the currentPage and totalPages to the NavigationButtons component.
    const renderNavigationButtons = () => (
        <NavigationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      );
    
    const CelYear = () => {
        return (
            <div className="list-filter">
                <p>Year</p>
                <SearchByYear value={filterYear} onChange={setFilterYear} />
            </div>
        )
    };

    const CelWinner = () => (
        <div className="list-filter">
            <p>Winner?</p>
            <SearchByWinner value={filterWinner} onChange={setFilterWinner} />
        </div>
    );

    // Defines the column headings and the values to be displayed.
    const table = [
        { heading: "ID", rowName: "id" },
        { heading: <CelYear />, rowName: "year" },
        { heading: "Title", rowName: "title" },
        { heading: <CelWinner />, rowName: "winner" },
    ];

    // When the component is loaded useEffect is executed.
    useEffect(() => {
        // Calls fetchData when fully loaded.
        fetchData();
    }, [currentPage, filterYear, filterWinner]);
    // Second parameter of useEffect is a dependency list, if empty, the method is executed once.
    // If given dependencies, useEffect is executed every time a value is changed.

    return (
        <div className="list-screen">
            <div className="list-screen-wrapper">
                <h1>List Movies</h1>
                <Table data={movieData} table={table}></Table>
                {renderNavigationButtons()}
            </div>
        </div>
    );
}
