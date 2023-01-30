const { Router } = require('express');
const todoRouter = require('./todos.route');
const userRouter = require('./users.route');

const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use('users/:userId/todos', todoRouter);

module.exports = indexRouter;
