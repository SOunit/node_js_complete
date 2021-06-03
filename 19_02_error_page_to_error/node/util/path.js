const path = require('path');

// always exports main file name = app.js path
module.exports = path.dirname(require.main.filename);
