import React from "react";
import { useNavigate } from "react-router-dom";
import "./aside.css"


const Aside = () => {
    const navigate = useNavigate();
    
    return (
        <aside className="navigation-container">
            <nav>
                <ul>
                    <li><a onClick={() => navigate("/")}>Dashboard</a></li>
                    <li><a onClick={() => navigate("/list")}>List</a></li>
                </ul>
            </nav>
            
        </aside>
    );
}


export default Aside;