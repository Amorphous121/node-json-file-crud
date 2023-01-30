const path = require('path');

exports.TODO_STATUS = Object.freeze({
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress'
});

exports.FILE_PATHS = Object.freeze({
  USER_FILE_PATH: path.join(process.cwd(), 'src', 'data', 'users.json'),
  TODO_FILE_PATH: path.join(process.cwd(), 'src', 'data', 'todos.json'),
});