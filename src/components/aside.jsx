import React from "react";
import { useNavigate } from "react-router-dom";
import "./aside.css"

function Aside()
{
    const navigate = useNavigate();
    
    return (
        <aside className="navigation-container">
            <navbar>
                <ul>
                    <li><a onClick={() => navigate("/")}>Dashboard</a></li>
                    <li><a onClick={() => navigate("/movies")}>List</a></li>
                </ul>
            </navbar>
            
        </aside>
    );
}

export default Aside;