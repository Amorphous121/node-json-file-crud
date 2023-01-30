const { randomUUID } = require('crypto');
const createError = require('http-errors');
const { readFile, writeToFile } = require('../utils/file.util');
const { FILE_PATHS } = require("../enums");


exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const user = {
      id: randomUUID(),
      firstName,
      lastName
    }

    const userData = await readFile(FILE_PATHS.USER_FILE_PATH);
    userData.push(user);
    await writeToFile(FILE_PATHS.USER_FILE_PATH, userData);
    return res.json({ data: user });
    
  } catch (error) {
    console.log(error);
  }
};

exports.fetchAllUsers = async (req, res, next) => {
  try {
    const users = await readFile(FILE_PATHS.USER_FILE_PATH);
    return res.json({ data: users });
  } catch (error) {}
};

exports.fetchUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const users = await readFile(FILE_PATHS.USER_FILE_PATH);
    const user = users.find(u => u.id == userId);
    if (!user) throw createError.NotFound('User with given id doesn\'t exists');
    return res.json({ data: user });
  } catch (error) {}
};


exports.updateUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    const userUpdatePayload = {};
    let users = await readFile(FILE_PATHS.USER_FILE_PATH);
    let user = users.find(u => u.id == userId);
    if (!user) throw createError.NotFound('User with given id doesn\'t exists');

    if (firstName) {
      userUpdatePayload.firstName = firstName;
    }

    if (lastName) {
      userUpdatePayload.lastName = lastName;
    }


  } catch (error) {}
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let users = await readFile(FILE_PATHS.USER_FILE_PATH);
    const user = users.find(u => u.id == userId);
    if (!user) throw createError.NotFound('User with given id doesn\'t exists');
    users = users.filter(u => u.id !== userId);
    await writeToFile(FILE_PATHS.USER_FILE_PATH, users);
    return res.json({ message: 'User deleted successfully.' });
  } catch (error) {}
};
