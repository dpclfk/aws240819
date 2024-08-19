import request from "supertest";
import router from "./todo";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import Todo from "../models/Todo";

config();

jest.mock("sequelize-typescript", () => {
  const actual = jest.requireActual("sequelize-typescript");
  return {
    ...actual,
    Sequelize: jest.fn(() => ({
      sync: jest.fn(),
    })),
    Model: class MockModel extends actual.Model {
      static create = jest.fn();
      static findByPk = jest.fn();
      static findAll = jest.fn();
      // constructor(...args: any[]) {
      //   super(args);
      //   this.save = jest.fn();
      //   this.destory = jest.fn();
      // }
    },
  };
});
// jest.mock("../services/todo", () => ({
//   add: jest.fn().mockReturnValue(1),
//   getList: jest.fn().mockResolvedValue(1).mockRejectedValue(2),
//   patchTodo: jest.fn((num: number) => {
//     if (num == 1) return "one";
//     if (num == 2) return "two";
//     if (num > 2) return "much";
//   }),
//   deleteTodo: jest.fn(),
// }));

describe("Test Todo", () => {
  let app: Express;
  let todoInstance: Todo;
  let todoInstance2: Todo;
  let todoInstance3: Todo;

  beforeEach(() => {
    app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/todo", router);

    todoInstance = {
      id: 1,
      title: "test todo list",
      isCompleted: false,
      save: jest.fn(),
      destroy: jest.fn(),
    } as unknown as Todo;

    todoInstance2 = {
      id: 2,
      title: "test todo list2",
      isCompleted: false,
      save: jest.fn(),
      destroy: jest.fn(),
    } as unknown as Todo;

    todoInstance3 = {
      id: 3,
      title: "test todo list3",
      isCompleted: false,
      save: jest.fn(),
      destroy: jest.fn(),
    } as unknown as Todo;
  });

  // 각 테스트가 끝날때마다 목을 초기화
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Test Mock", async () => {
    const mockFunc = jest.fn().mockReturnValue("hi!");
    expect(mockFunc()).toBe("hi!");
    const sequelize = new Sequelize({
      dialect: "mysql",
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3333,
    });
    await sequelize.sync();
  });

  test("Test Add Todo Item", async () => {
    (Todo.create as jest.Mock).mockResolvedValue(todoInstance);

    const response = await request(app).post("/todo").send({ title: "test todo list" });
    expect(response.status).toBe(201);
    // console.log(response.body);
    // console.log(app);
    expect(response.body).toEqual({
      id: 1,
      title: "test todo list",
      isCompleted: false,
    });
  });

  test("Test Failed Add Todo Item", async () => {
    const response = await request(app).post("/todo").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errorMessage: "plz input title",
    });
  });

  test("Test Get List", async () => {
    (Todo.findAll as jest.Mock).mockResolvedValue([todoInstance]);

    const response = await request(app).get("/todo");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        title: "test todo list",
        isCompleted: false,
      },
    ]);
  });
  test("Test Update Todo Item", async () => {
    (Todo.findByPk as jest.Mock).mockResolvedValue(todoInstance);

    const response = await request(app).patch("/todo").send({ id: 1, isCompleted: true });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: "test todo list",
      isCompleted: true,
    });
  });
  test("Test Delete Todo Item", async () => {
    (Todo.findByPk as jest.Mock).mockResolvedValue(todoInstance);
    (Todo.findAll as jest.Mock).mockResolvedValue([]);

    const response = await request(app).delete("/todo/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("Test Add Todo Items", async () => {
    (Todo.findAll as jest.Mock).mockResolvedValue([todoInstance2, todoInstance3]);

    await request(app).post("/todo").send({ title: "test todo list2" });
    await request(app).post("/todo").send({ title: "test todo list3" });
    const response = await request(app).get("/todo");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 2,
        title: "test todo list2",
        isCompleted: false,
      },
      {
        id: 3,
        title: "test todo list3",
        isCompleted: false,
      },
    ]);
  });
});
