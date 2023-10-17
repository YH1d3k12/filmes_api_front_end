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
    const [filterYear, setFilterYear] = useState("");

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
            setCurrentPage(0);
        } else {
            const filteredTotalPages = Math.ceil(filteredData.length / 15);
            setCurrentPage(filteredTotalPages - 1);
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
        const handleYearChange = (e) => {
            setFilterYear(e.target.value);
        };
    
        return (
            <div>
                <p>Year</p>
                <input 
                    className="list-filter" 
                    placeholder="Filter by year"
                    value={filterYear}
                    onChange={handleYearChange}
                />
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

    const filteredData = movieData.filter(item => {
        // Se o filtroYear estiver vazio ou o ano do filme coincidir com o filtro
        return filterYear === "" || item.year.toString().includes(filterYear);
    });

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
                <Table data={filteredData} table={table}></Table>
                {renderNavigationButtons()}
            </div>
        </div>
    );
}
