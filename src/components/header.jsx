import React from 'react';
import { useNavigate } from "react-router-dom";
import "./header.css"

function Header()
{
    const navigate = useNavigate();
    
    return (
        <header className="navigation-container">
            <navbar>
                <ul>
                    <li><a onClick={() => navigate("/")}>Dashboard</a></li>
                    <li><a onClick={() => navigate("/movies")}>List</a></li>
                </ul>
            </navbar>
            
        </header>
    );
}

export default Header;