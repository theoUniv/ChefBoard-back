const express = require('express');
const app = express();
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une couille dans le potage' });
});

module.exports = app;