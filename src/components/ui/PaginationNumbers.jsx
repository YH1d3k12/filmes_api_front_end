import React from "react";


const PaginationNumbers = ({
    currentPage,
    totalPages,
    handlePageChange
}) => {
    // This array will store the page numbers to be showed.
    const pageNumbers = [];
    // Defines the number of pages to be showed.
    const totalPagesToShow = 5;
    // Is use to define the number of pages around the current page.
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);

    // Calculates the starting page, the value can never be less than 0.
    let startPage = Math.max(0, currentPage - halfTotalPagesToShow);

    // Calculates the ending page, the value can never be greater than totalPages.
    // Minus 1 because we are working with indexes of an array.
    let endPage = Math.min(totalPages, startPage + totalPagesToShow) - 1;

    // Guarantees that the number of pages to be showed is at least one.
    if (endPage - startPage < totalPagesToShow - 1) {
        startPage = Math.max(0, endPage - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        // Pushes the page number to the array.
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