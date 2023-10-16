import React from 'react';
import { Outlet } from "react-router-dom";

import Header from "../components/header";

import "./body.css";


export default function Body() {
    return (
        <div className="body">
            <Header></Header>
            <Outlet />
        </div>
    );
};