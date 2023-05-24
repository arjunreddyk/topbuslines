import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

const server = setupServer();

describe("<App />", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("render heading", () => {
    render(<App />);
    const linkElement = screen.getByText(/TOP TEN BUS LINES/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("handles server error", async () => {
    server.use(
      rest.get("/api/lines", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);

    await screen.findByRole("alert");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Something went wrong. Error Message:Internal Server Error"
    );
  });

  test("renders bus lines", async () => {
    server.use(
      rest.get("/api/lines", (req, res, ctx) => {
        return res(
          ctx.json({
            topLines: [
              [3, 1],
              [2, 1],
            ],
            linesWithStops: {
              3: [{ stopName: "some-bus-stop" }],
              2: [{ stopName: "another-bus-stop" }],
            },
          })
        );
      })
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId("bus-lines")).toHaveLength(2);
    });
  });

  test("renders stop names", async () => {
    server.use(
      rest.get("/api/lines", (req, res, ctx) => {
        return res(
          ctx.json({
            topLines: [["1", 3]],
            linesWithStops: {
              1: [
                { stopName: "1-bus-stop" },
                { stopName: "2-bus-stop" },
                { stopName: "3-bus-stop" },
              ],
            },
          })
        );
      })
    );
    render(<App />);

    const busLine = await waitFor(() => {
      return screen.getByTestId("bus-lines");
    });

    fireEvent.click(busLine);

    await waitFor(() => {
      expect(screen.getAllByTestId("stop-names")).toHaveLength(3);
    });
  });
});
