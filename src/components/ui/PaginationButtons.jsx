import React from "react";

import PaginationNumbers from "./PaginationNumbers";

import "./paginationButtons.css";


const PaginationButtons = ({
    currentPage,
    totalPages,
    handlePageChange
}) => {
    // If current page equals 0, then isFirstPage is true.
    const isFirstPage = currentPage === 0;
    // If current page equals totalPages - 1, then isLastPage is true.
    const isLastPage = currentPage === totalPages - 1;

    const GoToFirstPage = () => handlePageChange(0);
    const GoToPreviousPage = () => handlePageChange(currentPage - 1);
    const GoToNextPage = () => handlePageChange(currentPage + 1);
    const GoToLastPage = () => handlePageChange(totalPages - 1);

    return (
        <div className="pagination-button-container">
            <button onClick={GoToFirstPage} disabled={isFirstPage}>{"|<"}</button>
            <button onClick={GoToPreviousPage} disabled={isFirstPage}> {"<"}</button>
            <PaginationNumbers
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <button onClick={GoToNextPage} disabled={isLastPage}>{">"}</button>
            <button onClick={GoToLastPage} disabled={isLastPage}> {">|"}</button>
        </div>
    );
}


export default PaginationButtons;