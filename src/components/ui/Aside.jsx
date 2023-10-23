import React from "react";
import { Link } from "react-router-dom";
import "./aside.css"


const Aside = () => {
    
    return (
        <aside className="navigation-container">
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/list">List</Link></li>
                </ul>
            </nav>
            
        </aside>
    );
}


export default Aside;