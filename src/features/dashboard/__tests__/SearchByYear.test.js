import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchByYear from "../SearchByYear";


describe("SearchByYear", () => {
    it("Should update input value", () => {
        const onChangeMock = jest.fn();
        const value = "";

        render(<SearchByYear value={value} onChange={onChangeMock} />);

        const input = screen.getByPlaceholderText("Search by year");
        userEvent.type(input, "1980");

        expect(input).toHaveValue("1980");
    });
});