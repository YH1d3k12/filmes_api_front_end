import React from "react";

import './navigation_buttons.css';

const NavigationButtons = ({
    currentPage,
    totalPages,
    handlePageChange
}) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPagesToShow = 5;
        const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);

        let startPage = Math.max(0, currentPage - halfTotalPagesToShow);
        let endPage = Math.min(
            totalPages - 1,
            startPage + totalPagesToShow - 1
        );

        // If the current page is near the end, adjust the start and end
        if (endPage - startPage < totalPagesToShow - 1) {
            startPage = Math.max(0, endPage - totalPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i + 1}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="navigation-button-container">
            <button onClick={
                () => handlePageChange(0)} 
                disabled={currentPage === 0}>
                {'|⮜'}
            </button>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}>
                {'⮜'}
            </button>
            {renderPageNumbers()}
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages - 1}>
                {'⮞'}
            </button>
            <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}>
                {'⮞|'}
            </button>
        </div>
    );
}

export default NavigationButtons;