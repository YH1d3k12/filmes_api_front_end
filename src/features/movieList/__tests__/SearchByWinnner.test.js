import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchByWinner from "../SearchByWinner.jsx";
import "@testing-library/jest-dom"


describe("SearchByWinner", () => {
    it("Should update input value", () => {
        // Fakes the passage of time.
        jest.useFakeTimers();

        // Mocks a function to satisfy the onChange prop.
        const onChangeMock = jest.fn();
        const value = "";

        // Renders component.
        render(<SearchByWinner value={value} onChange={onChangeMock} />);

        // Get select element through role.
        const select = screen.getByRole("combobox");

        // // Get input element through text.
        const optionYes = screen.getByText('Yes');

        // State changes should be within an act() callback.
        // To avoid synchronization issues.
        act(() => {
            // Simulate user selecting yes.
            userEvent.selectOptions(select, [optionYes]);
        });

        // Executes all functions with timers immediately.
        jest.runAllTimers();

        // Desired results.
        expect(select).toHaveValue("&winner=true");
        expect(onChangeMock).toHaveBeenCalledWith("&winner=true");
    });
});