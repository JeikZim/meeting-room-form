const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.APP_PORT ?? 8000

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);