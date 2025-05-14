const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/en', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'en', 'index.html'));
});
app.get('/ru', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ru', 'index.html'));
});
app.get('/approach', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'approach', 'index.html'));
});

app.get('/en/approach', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'en', 'approach', 'index.html'));
});
app.get('/ru/approach', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ru', 'approach', 'index.html'));
});

app.use((_req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
