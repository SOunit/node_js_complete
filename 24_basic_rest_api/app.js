const express = require('express');

const feedRoutes = require('./routes/feed');

const app = express();

// routes
app.use('/feed', feedRoutes);

app.listen(8080);
