import React from "react";
import { Outlet } from "react-router-dom";

import Aside from "../components/ui/Aside.jsx";

import "../features/body/body.css";


const Body = () => {
    return (
        <div className="body">
            <Aside></Aside>
            <Outlet />
        </div>
    );
};


export default Body;