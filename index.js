require('dotenv').config()

const express = require('express');
const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


// a simple route handler for the index page
// tells express app to handle GET request on homepage (index) route
// and respond with string "Hello World!"
// app.METHOD(PATH, HANDLER);
app.get('/', (req, res) => {
    const data = {
        name: 'Hello', 
        isAwesome: true,
    };

    res.json(data);
});

const port = 8888;

app.get('/awesome-generator', (req, res) => {
    const { name, isAwesome } = req.query;
    // query params come back as strings
    res.send(`${name} is ${JSON.parse(isAwesome) ? 'really' : 'not'} awesome`);
});

// Tell express app to listen for connection on port 8888
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});

