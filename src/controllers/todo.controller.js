const { randomUUID } = require("crypto");
const createError = require("http-errors");
const { FILE_PATHS, TODO_STATUS } = require("../enums");
const { readFile, writeToFile } = require("../utils/file.util");

exports.createTodo = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { todoText } = req.body;

    const todo = {
      id: randomUUID(),
      content: todoText,
      status: TODO_STATUS.IN_PROGRESS,
      userId,
    };

    const todos = await readFile(FILE_PATHS.TODO_FILE_PATH);
    todos.push(todo);
    await writeToFile(FILE_PATHS.TODO_FILE_PATH, todos);

    console.log(todo);

    return res.json({ data: todo });
  } catch (error) {
    next(error);
  }
};

exports.fetchAllTodos = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { searchText } = req.query;
    let todos = await readFile(FILE_PATHS.TODO_FILE_PATH);

    todos = todos.filter((todo) => todo.userId === userId);

    if (searchText) {
      todos = todos.filter((todo) =>
        todo.content.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return res.json({ data: todos });
  } catch (error) {
    next(error);
  }
};

exports.fetchTodoById = async (req, res, next) => {
  try {
    const { userId, todoId } = req.params;
    const todos = await readFile(FILE_PATHS.TODO_FILE_PATH);

    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo || todo.userId !== userId)
      throw createError.NotFound(`Todo with id "${todoId}" doesn't exists!`);

    return res.json({ data: todo });
  } catch (error) {
    next(error);
  }
};

exports.updateTodoById = async (req, res, next) => {
  try {
    const { userId, todoId } = req.params;
    const { todoText, todoStatus } = req.body;
    const todoUpdatePayload = {};

    let todos = await readFile(FILE_PATHS.TODO_FILE_PATH);
    const todo = todos.find((todo) => todo.id === todoId);

    if (!todo || todo.userId !== userId)
      throw createError.NotFound(`Todo with id "${todoId}" doesn't exists!`);

    if (todoText) todoUpdatePayload.content = todoText;

    if (todoStatus) todoUpdatePayload.status = todoStatus;

    const updatedTodo = { ...todo, ...todoUpdatePayload };

    todos = todos.map((todo) => (todo.id === todoId ? updatedTodo : todo));

    await writeToFile(FILE_PATHS.TODO_FILE_PATH, todos);
    return res.json({ data: updatedTodo });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodoById = async (req, res, next) => {
  try {
    const { userId, todoId } = req.params;
    let todos = await readFile(FILE_PATHS.TODO_FILE_PATH);
    const todo = todos.find((todo) => todo.id === todoId);

    if (!todo || todo.userId !== userId)
      throw createError.NotFound(`Todo with id "${todoId}" doesn't exists!`);

    todos = todos.filter((todo) => todo.id !== todoId);
    await writeToFile(FILE_PATHS.TODO_FILE_PATH, todos);

    return res.json({
      message: `Todo with id "${todoId}" deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
