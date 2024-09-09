const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.use(express.static('dist'));

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
})
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});