// import { Request, Response, Router } from "express";
// import { add } from "../controllers/todo";

// const router = Router();

// router.post("/", (req: Request, res: Response) => {
//   try {
//     const todo = add(req.body.title);
//     res.status(201).json(todo);
//   } catch (error) {
//     res.status(400).json({ errorMessage: error });
//   }
// });

// export default router;

import Todo from "../models/Todo";

// interface Todo {
//   id: number;
//   title: string;
//   isCompleted: boolean;
// }

// let todoList: Todo[] = [];
// let todoId = 1;

export const add = async (title: string) => {
  if (title?.length) {
    const todo: Todo = await Todo.create({ title });
    return todo;
    // todoList.push({
    //   id: todoId++,
    //   title,
    //   isCompleted: false,
    // });
    // return todoList[todoList.length - 1];
  } else {
    throw new Error("plz input title");
  }
};

export const getList = async () => {
  console.log("test3");
  const todos: Todo[] = await Todo.findAll();
  console.log(todos);
  return todos;
  // [...todoList];
};

export const patchTodo = async ({
  id,
  title,
  isCompleted,
}: {
  id: number;
  title?: string;
  isCompleted?: boolean;
}) => {
  try {
    const todo = await Todo.findByPk(id);
    // const todo = todoList.find((item: Todo) => item.id === id);
    if (todo === null) throw new Error("not found todo item");
    if (title !== undefined) todo.title = title;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;
    console.log(todo.dataValues);
    await todo.save();
    return todo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  const todo = await Todo.findByPk(id);

  // const todoIdx = todoList.findIndex((item: Todo) => item.id === id);
  if (todo === null) throw new Error("not found Todo Item");
  await todo.destroy();
  return await Todo.findAll();
  // todoList = todoList.filter((item: Todo) => item.id !== id);
  // return [...todoList];
};
