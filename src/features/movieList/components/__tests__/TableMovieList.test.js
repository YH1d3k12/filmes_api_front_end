import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import TableMovieList from "../TableMovieList.jsx";
import Requester from "../../../../data/Requester.js";

jest.mock("../../../../data/Requester.js");

describe("TableMovieList", () => {
    test("Should render content from response correctly", async () => {
        // Fakes the passage of time.
        jest.useFakeTimers();

        // Mocks the response from the API.
        const mockData = {
            totalPages: 1,
            content: [
                { id: 1, year: 2006, title: "Pirates of The Caribbean", winner: true },
                { id: 2, year: 2001, title: "Lord of The Rings", winner: false },
            ],
        };

        // Simulates a successful response from the API.
        Requester.mockResolvedValue(mockData);

        // Renders component.
        render(
            <BrowserRouter>
                <TableMovieList currentPage={1} setTotalPages={jest.fn()} />
            </BrowserRouter>
        );

        // Executes all functions with timers immediately.
        jest.runAllTimers();

        // Desired results.
        await waitFor(() => {
            expect(screen.getByText("Pirates of The Caribbean")).toBeInTheDocument();
            expect(screen.getByText("Lord of The Rings")).toBeInTheDocument();
        });
    });
});