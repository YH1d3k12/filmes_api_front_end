import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchByYear from "../SearchByYear";
import "@testing-library/jest-dom"


describe("SearchByYear", () => {
    it("Should call mocked function with the input value when button is pressed", () => {
        // Fakes the passage of time.
        jest.useFakeTimers();

        // Mocks a function to satisfy the onChange prop.
        const onChangeMock = jest.fn();
        const value = "";

        // Renders component.
        render(<SearchByYear value={value} onChange={onChangeMock} />);

        // Get input element through placeholder text.
        const input = screen.getByPlaceholderText("Search by year");
        // Get button element through id.
        const button = screen.getByTestId("search-button");

        // State changes should be within an act() callback.
        // To avoid synchronization issues.
        act(() => {
            // Simulate user typing.
            userEvent.type(input, "1980");

            // Simulate user clicking.
            userEvent.click(button);
        });

        // Executes all functions with timers immediately.
        jest.runAllTimers();

        // Desired results.
        expect(input).toHaveValue(1980);
        expect(onChangeMock).toHaveBeenCalledWith("1980");
    });
});