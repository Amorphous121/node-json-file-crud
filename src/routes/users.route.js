const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const userRouter = Router();

// Fetch All users
userRouter.get('/', UserController.fetchAllUsers);

// Fetch user by id
userRouter.get('/:userId', UserController.fetchUserById);

// Create User
userRouter.post('/', UserController.createUser);

// Update User
userRouter.put('/:userId', UserController.updateUserById);

// Delete User
userRouter.delete('/:userId', UserController.deleteUserById);

module.exports = userRouter;