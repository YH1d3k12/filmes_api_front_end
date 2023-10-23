import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";


describe("Dashboard", () => {
    it("Should render Dashboard correctly", () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByText("Dashboard")).toBeInTheDocument(
            "List years with multiple winners"
        );
    });
});