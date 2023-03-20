import { render, screen } from "@testing-library/react";
import App from "./App";

test("main header", () => {
    render(<App />);
    const linkElement = screen.getByText(/challenge boro/i);
    expect(linkElement).toBeInTheDocument();
});
