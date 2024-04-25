const express = require('express')
const app = express()
const db = require('./src/config/db');
require('dotenv').config();
const personRouter = require('./src/route/personRoute');

app.use(express.json());


const port = process.env.PORT
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.use('/api', personRouter)