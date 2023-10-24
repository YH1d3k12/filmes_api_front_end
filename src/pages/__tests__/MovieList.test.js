import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieList from "../MovieList.jsx";
import "@testing-library/jest-dom"


describe("MovieList", () => {
    it("Should render MovieList correctly", () => {
        render(
            <BrowserRouter>
                <MovieList />
            </BrowserRouter>
        );

        // Checks if title is present in the document.
        expect(screen.getByText("List Movies")).toBeInTheDocument();
    });
});