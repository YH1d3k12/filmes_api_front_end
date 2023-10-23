import React from "react";

import PaginationNumbers from "./PaginationNumbers";

import "./paginationButtons.css";


const PaginationButtons = ({
    currentPage,
    totalPages,
    handlePageChange
}) => {
    return (
        <div className="pagination-button-container">
            <button 
                onClick={() => handlePageChange(0)} 
                disabled={currentPage === 0}>
                {"|⮜"}
            </button>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}>
                {"⮜"}
            </button>
            <PaginationNumbers
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages - 1}>
                {"⮞"}
            </button>
            <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}>
                {"⮞|"}
            </button>
        </div>
    );
}


export default PaginationButtons;