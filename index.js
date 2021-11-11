require('dotenv').config()

const express = require('express');
const querystring = require('querystring');
const app = express();
const axios = require('axios');
const port = 8888;

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

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

// /login route handler
// want to set up /login route to hit Spotify Accounts Service endpoint
// and provide the required params and our app client id, response_type, 
// and redirect_uri. request authorization from Spotify
app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code', 
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// /callback route handler
// use auth code to request access token
// then use access token to request access token
app.get('/callback', (req, res) => {
    // get the code from query param or null if doesn't exist
    const code = req.query.code || null; 
    
    axios({
        method: 'post', 
        url: 'https://accounts.spotify.com/api/token', 
        data: querystring.stringify({
            grant_type: 'authorization_code', 
            code: code, 
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        },
    })
    .then(response => {
        if (response.status === 200) {
            const { access_token, token_type } = response.data;

            const { refresh_token } = response.data;

            axios.get(`http://localhost:8888/refresh_token?refresh_token=${refresh_token}`)
            .then(response => {
                res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            })
            .catch(error => {
                res.send(error);
            });


        } else {
            res.send(response);
        }
    })
    .catch(error => {
        res.send(error);
    });
})

// /refresh_token route handler
// request another access token from Spotify in case our access token expires
app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
});

// Tell express app to listen for connection on port 8888
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});

