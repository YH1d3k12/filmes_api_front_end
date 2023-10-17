import React from 'react';
import { Outlet } from "react-router-dom";

import Aside from "../components/aside";

import "./body.css";


export default function Body() {
    return (
        <div className="body">
            <Aside></Aside>
            <Outlet />
        </div>
    );
};