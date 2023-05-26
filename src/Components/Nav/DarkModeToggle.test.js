import { render, screen } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";
import { mockViewport } from "jsdom-testing-mocks";
import userEvent from "@testing-library/user-event";

test("renders toggle button to switch to light mode if dark mode is applied", () => {
  mockViewport({
    "prefers-color-scheme": "dark",
  });
  render(<DarkModeToggle />);
  const linkElement = screen.getByText(/light mode/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders toggle button to switch to dark mode if light mode is applied", async () => {
  mockViewport({
    "prefers-color-scheme": "dark",
  });
  const user = userEvent.setup();

  render(<DarkModeToggle />);
  await user.click(screen.getByText(/light mode/i));
  const linkElement = screen.getByText(/dark mode/i);
  expect(linkElement).toBeInTheDocument();
});
