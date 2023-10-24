import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import "@testing-library/jest-dom"


describe("Dashboard", () => {
    it("Should render Dashboard correctly", () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        // Checks if titles are present in the document.
        expect(screen.getByText("List years with multiple winners")).toBeInTheDocument();
        expect(screen.getByText("Producers with longest and shortest interval between wins")).toBeInTheDocument();
        expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
        expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
    });
});