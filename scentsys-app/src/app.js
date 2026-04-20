const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./routes/api.routes');
const viewsRoutes = require('./routes/views.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Mount routes
app.use('/', viewsRoutes);
app.use('/api', apiRoutes);

module.exports = app;
