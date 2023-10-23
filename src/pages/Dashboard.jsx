import React, { useState } from "react";

import TableMultipleWinners from "../features/dashboard/components/TableMultipleWinners.jsx";
import TableTopStudios from "../features/dashboard/components/TableTopStudios.jsx";
import TableMinIntervals from "../features/dashboard/components/TableMinIntervals.jsx";
import TableMaxIntervals from "../features/dashboard/components/TableMaxIntervals.jsx";
import TableMovieWinner from "../features/dashboard/components/TableMovieWinner.jsx";
import SearchByYear from "../features/dashboard/SearchByYear.jsx";

import "../features/dashboard/dashboard.css";


export default function MovieListScreen() {
    const [filterYear, setFilterYear] = useState("");
    
    return (
        <div className="dashboard-screen">
            <div className="dashboard-wrapper">
                <div className="dashboard-screen-table">
                    <h2>List years with multiple winners</h2>
                    <TableMultipleWinners></TableMultipleWinners>
                </div>
                <div className="dashboard-screen-table">
                    <h2>Producers with longest and shortest interval between wins</h2>
                    <h3>Maximum</h3>
                    <TableMaxIntervals></TableMaxIntervals>
                    <h3>Minimum</h3>
                    <TableMinIntervals></TableMinIntervals>
                </div>
            </div>
            <div className="dashboard-wrapper">
                <div className="dashboard-screen-table">
                    <h2>Top 3 studios with winners</h2>
                    <TableTopStudios></TableTopStudios>
                </div>
                <div className="dashboard-screen-table">
                    <h2>List movie winners by year</h2>
                    <SearchByYear value={filterYear} onChange={setFilterYear}></SearchByYear>
                    <TableMovieWinner value={filterYear}></TableMovieWinner>
                </div>
            </div>
        </div>
    );
};