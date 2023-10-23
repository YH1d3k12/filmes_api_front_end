import React from "react";


const PaginationNumbers = ({
    currentPage,
    totalPages,
    handlePageChange
}) => {
    const pageNumbers = [];

    const totalPagesToShow = 5;
    // The number of pages to show on each side of the current page.
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);

    // Guarantees that startPage is never less than 0.
    let startPage = Math.max(0, currentPage - halfTotalPagesToShow);

    // Guarantees that endPage is never greater than totalPages.
    let endPage = Math.min(
        totalPages - 1,
        startPage + totalPagesToShow - 1
    );

    // If true there aren't enought spaces to render.
    if (endPage - startPage < totalPagesToShow - 1) {
        startPage = Math.max(0, endPage - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={i === currentPage ? "active" : ""}
            >
                {i + 1}
            </button>
        );
    }

    return pageNumbers;
};


export default PaginationNumbers;