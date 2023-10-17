import React, { useEffect, useState } from 'react';

import Requester from '../data/requester.js';
import Table from '../components/table.jsx';
import NavigationButtons from '../components/navigation_buttons.jsx';

import './listScreen.css';

export default function ListScreen() {
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
            const data = await Requester(
                'get', `?page=${currentPage}&size=15`, null,
                response => {
                    setTotalPages(response.data.totalPages);

                    return response.data;
                }
            );

            console.log('Data', data);

            // Check if data.content is an array before setting the state.
            if (Array.isArray(data.content)) {
                setMovieData(data.content);
            } else {
                console.error('Its not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(error);
        }
    };

    const handlePageChange = newPage => {
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

    const renderNavigationButtons = () => (
        <NavigationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      );

    const CelYear = () => {
        return (
            <div>
                <p>Year</p>
                <input className="list-filter" placeholder="Filter by year"></input>
            </div>
        );
    };

    const CelWinner = () => {
        return (
            <div className="list-filter">
                <p>Winner?</p>
                <select className="list-filter">
                    <option value="yes">Yes/No</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
        );
    };

    // Defines the column headings and the values to be displayed.
    const table = [
        { heading: 'ID', rowName: 'id' },
        { heading: <CelYear />, rowName: 'year' },
        { heading: 'Title', rowName: 'title' },
        { heading: <CelWinner />, rowName: 'winner' },
    ];

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
