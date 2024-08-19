import instance from "./axios";

export interface Todo {
  id?: number;
  title?: string;
  isCompleted?: boolean;
}

export const getList = async (): Promise<Todo[]> => {
  try {
    const response = await instance.get("/todo");
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to Get List");
  }
};

export const addTodo = async ({ title }: Todo): Promise<Todo> => {
  try {
    const response = await instance.post("/todo", { title });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to Add List");
  }
};

export const patchTodo = async ({ id, title, isCompleted }: Todo): Promise<Todo> => {
  try {
    const response = await instance.patch("/todo", { id, title, isCompleted });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to update List");
  }
};
