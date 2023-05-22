import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";
import App from "./App";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("renders app title", () => {
  render(<App />);
  const linkElement = screen.getByText(/memorise/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the show me around button", () => {
  render(<App />);
  const linkElement = screen.getByText(/show me around/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the start practicing button", () => {
  render(<App />);
  const linkElement = screen.getByText(/start practicing/i);
  expect(linkElement).toBeInTheDocument();
});

// test("renders landing page and navigates to tour page", async () => {
//   render(<App />, { wrapper: BrowserRouter });
//   const user = userEvent.setup();

//   expect(screen.getByText(/memorise/i)).toBeInTheDocument();

//   await user.click(screen.getByRole("button", { name: /show me around/i }));

//   await user.click(screen.getByText(/show me around/i));
//   expect(
//     screen.getByText(/create flashcards to earn XPs/i)
//   ).toBeInTheDocument();
// });
