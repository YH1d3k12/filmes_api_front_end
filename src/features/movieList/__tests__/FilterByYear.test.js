import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterByYear from "../FilterByYear.jsx";
import "@testing-library/jest-dom"


describe("FilterByYear", () => {
    it("Should update input value", () => {
        // Fakes the passage of time.
        jest.useFakeTimers();

        // Mocks a function to satisfy the onChange prop.
        const onChangeMock = jest.fn();
        const value = "";

        // Renders component.
        render(<FilterByYear value={value} onChange={onChangeMock} />);

        // Get input element through placeholder text.
        const input = screen.getByPlaceholderText("Filter by year");

        // State changes should be within an act() callback.
        // To avoid synchronization issues.
        act(() => {
            // Simulate user typing.
            userEvent.type(input, "2011");
        });

        // Executes all functions with timers immediately.
        jest.runAllTimers();

        // Desired results.
        expect(input).toHaveValue(2011);
        expect(onChangeMock).toHaveBeenCalledWith("2011");
    });
});