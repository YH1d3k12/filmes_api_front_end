import React, { useEffect, useState } from "react";

import Requester from "../data/requester.js";
import Table from "../components/table.jsx";

import "./dashboardScreen.css";


export default function DashboardScreen() {
    // Defines movieData as an empty array.
    // setMovieData is a method which changes the value of movieData.
    const [movieData, setMovieData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // When the component is loaded useEffect is executed.
    useEffect(() => {
        // Calls fetchData when fully loaded.
        fetchData();
    }, [currentPage]);
    // Second parameter of useEffect is a dependency list, if empty, the method is executed once.
    // If given dependencies, useEffect is executed every time a value is changed.

    const fetchData = async () => {
        try {
            const data = await Requester("get", `?page=${currentPage}&size=15`, null, (response) => {
                setTotalPages(response.data.totalPages)

                return response.data;
            });

            console.log("Data", data)

            // Check if data.content is an array before setting the state.
            if (Array.isArray(data.content)) {
                setMovieData(data.content);
            } 
            else {
                console.error("Its not an array:", data);
            }
        } 
        catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(error);
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        } else if (newPage < 0) {
            // Goes to the first page if newPage is less than zero.
            setCurrentPage(0); 
        } else {
            // Goes to the last page if newPage is greater or equal than totalPages.
            setCurrentPage(totalPages - 1); 
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPagesToShow = 5;
        const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);

        let startPage = Math.max(0, currentPage - halfTotalPagesToShow);
        let endPage = Math.min(totalPages - 1, startPage + totalPagesToShow - 1);

        // If the current page is near the end, adjust the start and end
        if (endPage - startPage < totalPagesToShow - 1) {
            startPage = Math.max(0, endPage - totalPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? 'active' : ''}>
                    {i + 1}
                </button>
            );
        }

        return pageNumbers;
    };
    const renderNavigationButtons = () => (
        <div className="dashboard-button-container">
            <button onClick={() => handlePageChange(0)} disabled={currentPage === 0}>
                {"<<"}
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                {"<"}
            </button>
            {renderPageNumbers()}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                {">"}
            </button>
            <button onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1}>
                {">>"}
            </button>
        </div>
    );

    // Defines the column headings and the values to be displayed.
    const table = [
        { heading: "ID", rowName: "id"},
        { heading: "Year", rowName: "year" },
        { heading: "Title", rowName: "title" },
        { heading: "Winner?", rowName: "winner"}
    ];

    return (
        <div className="dashboardScreen">
            <h1>List Movies</h1>
            <Table data={movieData} table={table}></Table>
            {renderNavigationButtons()}
        </div>
    );
};