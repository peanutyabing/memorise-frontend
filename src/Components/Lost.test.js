// app.test.js
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Lost from "./Lost.js";
import { MemoryRouter } from "react-router-dom";

test("landing on a bad page", () => {
  const badRoute = "/non-existent-route";
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <Lost />
    </MemoryRouter>
  );
  expect(
    screen.getByText(/you seem lost - there's nothing here/i)
  ).toBeInTheDocument();
});
