import MockAdapter from "axios-mock-adapter";

import instance from "./axios";
import { addTodo, deleteTodo, getList, patchTodo } from "./todoAxios";

const mock = new MockAdapter(instance);

describe("Test Todo Axios", () => {
  test("Get List", async () => {
    const data = [{ id: 1, title: "test todo list", isCompleted: true }];
    mock.onGet("/todo").reply(200, data);

    const response = await getList();
    // expect(response.status).toBe(200);
    // console.log(response);
    expect(response).toEqual(data);
  });

  test("Post add Todo", async () => {
    const data = { id: 1, title: "test todo list", isCompleted: false };
    mock.onPost("/todo", { title: "test todo list" }).reply(201, data);

    const response = await addTodo({ title: "test todo list" });
    expect(response).toEqual(data);
  });

  test("Patch Todo", async () => {
    const data = { id: 1, title: "test todo list", isCompleted: true };
    mock.onPatch("/todo", { id: 1, title: "test todo list", isCompleted: true }).reply(200, data);

    const response = await patchTodo({ id: 1, title: "test todo list", isCompleted: true });
    expect(response).toEqual(data);
  });

  test("Delete Todo", async () => {
    mock.onDelete("/todo/1").reply(200);

    const response = await deleteTodo({ id: 1 });
    expect(response).toBeUndefined();
  });
});
