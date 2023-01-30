const { Router } = require('express');
const TodoController = require('../controllers/todo.controller');

const todoRouter = Router();

// Fetch Todos by userId
todoRouter.get('/', TodoController.fetchAllTodos);

// Fetch Perticuler todo by Id
todoRouter.get('/:todoId', TodoController.fetchTodoById);

// Craete Todo 
todoRouter.post('/', TodoController.createTodo);

// Update todo: 
todoRouter.put('/:todoId', TodoController.updateTodoById);

// Delete Todo:
todoRouter.delete('/:todoId', TodoController.deleteTodoById);

module.exports = todoRouter;