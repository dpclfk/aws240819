import { Request, Response, Router } from "express";
import { add, deleteTodo, getList, patchTodo } from "../services/todo";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const todo = await add(req.body.title);
    res.status(201).json(todo);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(`${error}`);
    res.status(400).json({ errorMessage: err.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json(await getList());
});

router.patch("/", async (req: Request, res: Response) => {
  try {
    const todo = await patchTodo(req.body);
    res.status(200).json(todo);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(`${error}`);
    res.status(202).json({ errorMessage: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await deleteTodo(+req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(`${error}`);
    res.status(204).json({ errorMessage: err.message });
  }
});

export default router;
