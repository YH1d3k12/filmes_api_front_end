import React, {useState} from "react";

import TableMovieList from "../features/movieList/components/TableMovieList.jsx";
import PaginationButtons from "../components/ui/PaginationButtons.jsx";

import "../features/movieList/movieList.css"


const MovieList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            // If newPage is between 0 and totalPages, setCurrentPage to newPage.
            setCurrentPage(newPage);
        } else if (newPage < 0) {
            // Goes to the first page if newPage is less than zero.
            setCurrentPage(0);
        } else {
            // Goes to the last page if newPage is greater or equal than totalPages.
            setCurrentPage(totalPages - 1);
        }
    };

    return (
        <div className="list-screen">
            <div className="list-screen-table">
                <h1>List Movies</h1>
                <TableMovieList 
                    currentPage={currentPage}
                    setTotalPages={setTotalPages} // Receives the setTotalPages function.
                />
                <PaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange} // Receives the handlePageChange function.
                />
            </div>
        </div>
    );
}


export default MovieList;