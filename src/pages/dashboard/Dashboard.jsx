import React, { useEffect, useState } from "react";

import Requester from "../../data/requester.js";
import Table from "../../components/tables/Table.jsx"
import SearchByYear from "./features/SearchByYear.jsx";

import "./dashboard.css";


export default function MovieListScreen() {
    const [goldenYearsData, setGoldenYearsData] = useState([]);
    const [topWinsData, setTopWinsData] = useState([]);
    const [maxIntervalData, setMaxIntervalData] = useState([]);
    const [minIntervalData, setMinIntervalData] = useState([]);
    const [winnersData, setWinnersData] = useState([]);
    const [filterYear, setFilterYear] = useState("");


    const fetchData = async () => {
        try {


            // gyd = Golden Years Data.
            const gyd = await Requester(
                "get", `?projection=years-with-multiple-winners`, 
                null,
                response => {
                    return response.data;
                }
            );
            setGoldenYearsData(gyd.years);


            // twd = Top Wins Data.
            const twd = await Requester(
                "get", `?projection=studios-with-win-count`, 
                null,
                response => {
                    return response.data;
                }
            );
            setTopWinsData(twd.studios.slice(0, 3));


            const intervalsData = await Requester(
                "get", `?projection=max-min-win-interval-for-producers`, 
                null,
                response => {
                    return response.data;
                }
            );
            setMaxIntervalData(intervalsData.max);
            setMinIntervalData(intervalsData.min);


            const yearParam = filterYear ? `&year=${filterYear}` : "&year=1980"; 
            
            // wd = Winners Data.
            const wd = await Requester(
                "get", `?winner=true${yearParam}`, 
                null,
                response => {
                    return response.data;
                }
            );
            setWinnersData(wd);


        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(error);
        }
    };


    const tableGoldenYears = [
        { heading: "Year", rowName: "year" },
        { heading: "Win Count", rowName: "winnerCount" }
    ];

    const tableTopWins = [
        { heading: "Name", rowName: "name" },
        { heading: "Win Count", rowName: "winCount" }
    ];

    const tableMaxInterval = [
        { heading: "Producer", rowName: "producer" },
        { heading: "Interval", rowName: "interval" },
        { heading: "Previous Year", rowName: "previousWin" },
        { heading: "Following Year", rowName: "followingWin" }
    ];

    const tableMinInterval = [
        { heading: "Producer", rowName: "producer" },
        { heading: "Interval", rowName: "interval" },
        { heading: "Previous Year", rowName: "previousWin" },
        { heading: "Following Year", rowName: "followingWin" }
    ];

    const tableSearch = [
        { heading: "Id", rowName: "winner" },
        { heading: "Year", rowName: "year" },
        { heading: "Title", rowName: "title" }
    ];


    // When the component is loaded useEffect is executed.
    useEffect(() => {
        // Calls fetchData when fully loaded.
        fetchData();
    }, [filterYear]);
    // Second parameter of useEffect is a dependency list, if empty, the method is executed once.
    // If given dependencies, useEffect is executed every time a value is changed.


    return (
        <div className="dashboard-screen">
            <div className="dashboard-wrapper">
                <div className="dashboard-screen-table">
                    <h2>List years with multiple winners</h2>
                    <Table data={goldenYearsData} table={tableGoldenYears}></Table>
                </div>

                <div className="dashboard-screen-table">
                    <h2>Producers with longest and shortest interval between wins</h2>
                    <h3>Maximum</h3>
                    <Table data={maxIntervalData} table={tableMaxInterval}></Table>
                    <h3>Minimum</h3>
                    <Table data={minIntervalData} table={tableMinInterval}></Table>
                </div>
            </div>
            <div className="dashboard-wrapper">
                <div className="dashboard-screen-table">
                    <h2>Top 3 studios with winners</h2>
                    <Table data={topWinsData} table={tableTopWins}></Table>
                </div>
                <div className="dashboard-screen-table">
                    <h2>List movie winners by year</h2>
                    <SearchByYear value={filterYear} onChange={setFilterYear}></SearchByYear>
                    <Table data={winnersData} table={tableSearch}></Table>
                </div>
            </div>
        </div>
    );
};