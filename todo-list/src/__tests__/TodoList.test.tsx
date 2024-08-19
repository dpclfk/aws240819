import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MockAdapter from "axios-mock-adapter";

import TodoList from "../components/TodoList";
import instance from "../lib/axios";

const mock = new MockAdapter(instance);
const client = new QueryClient();

describe("Test Todo List", () => {
  beforeEach(() => {
    const data = { id: 1, title: "test todo list", isCompleted: false };
    mock.onGet("/todo").reply(200, [data]);
    mock.onPost("/todo", {}).reply(200, { title: "test todo list" });

    render(
      <QueryClientProvider client={client}>
        <TodoList />
      </QueryClientProvider>
    );
  });

  test("Render Todo List", async () => {
    // render(<TodoList />);
    const titleElem = screen.getByText(/now Loading/i);
    expect(titleElem).toBeInTheDocument();
    expect(titleElem.tagName).toBe("DIV");

    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
    });
    expect(screen.getByText(/test todo list/i)).toBeInTheDocument();
  });

  test("include input Element", async () => {
    // render(<TodoList />);
    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
    });
    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();
  });

  test("input text", async () => {
    // render(<TodoList />);
    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
    });
    const inputElem: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(inputElem, { target: { value: "input test" } });
    expect(inputElem.value).toEqual("input test");
  });

  test("include Add Button", () => {
    const buttonElem = screen.getByRole("button", { name: "Add Todo" });
    expect(buttonElem).toBeInTheDocument();
  });

  test("Add New Todo", async () => {
    const data = { id: 1, title: "test todo list", isCompleted: false };
    mock.onGet("/todo").reply(200, [data, { id: 1, title: "first Todo", isComplete: false }]);

    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
    });
    const inputElem: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(inputElem, { target: { value: "test todo list" } });
    const buttonElem: HTMLButtonElement = screen.getByRole("button", { name: "Add Todo" });
    fireEvent.click(buttonElem);

    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
      expect((screen.getByRole("textbox") as HTMLInputElement).value).toEqual("test todo list");
    });
    const listItemElem = screen.getByText("test todo list");
    expect(listItemElem).toBeInTheDocument();
    expect(listItemElem.tagName).toBe("LI");

    // const listItemElem2 = screen.getByRole("listitem");
    // expect(listItemElem2).toHaveTextContent("first Todo");
  });

  // test("Check Todo is work", () => {
  //   //elems
  //   const inputElem: HTMLInputElement = screen.getByRole("textbox");
  //   const buttonElem: HTMLButtonElement = screen.getByRole("button", { name: "Add Todo" });
  //   const result = ["a", "b", "c"];

  //   //work

  //   for (let i = 0; i < result.length; i++) {
  //     fireEvent.change(inputElem, { target: { value: result[i] } });
  //     fireEvent.click(buttonElem);
  //   }

  //   //check
  //   const ui = screen.getByRole("list");

  //   for (let i = 0; i < ui.children.length; i++) {
  //     expect(ui.children[i].tagName).toBe("LI");
  //     expect(ui.children[i]).toHaveTextContent(result[i]);
  //   }

  //   // expect(listItemElem2).toHaveTextContent("first Todo");

  //   const result2 = [{ value: "a" }, { value: "b" }];

  //   for (const { value } of result2) {
  //     console.log(value);
  // }
  // });
});
