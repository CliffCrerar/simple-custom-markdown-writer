
const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    try {
        res.status(200).send(process.env.DBSERVER);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = app;