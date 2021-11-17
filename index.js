require('dotenv').config();

const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const app = express();
const path = require('path');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;


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

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, './client/build')));

// /login route handler
// want to set up /login route to hit Spotify Accounts Service endpoint
// and provide the required params and our app client id, response_type, 
// and redirect_uri. request authorization from Spotify
app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
    ].join(' ');

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// /callback route handler
// use auth code to request access token
// then use access token to request data from Spotify API
app.get('/callback', (req, res) => {
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
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        if (response.status === 200) {

            // const { access_token, token_type } = response.data;

            // axios.get('https://api.spotify.com/v1/me', {
            //   headers: {
            //     Authorization: `${token_type} ${access_token}`
            //   }
            // })
            //   .then(response => {
            //     res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            //   })
            //   .catch(error => {
            //     res.send(error);
            //   });


            const { access_token, refresh_token, expires_in } = response.data;

            const queryParams = querystring.stringify({
                access_token, 
                refresh_token,
                expires_in,
            })

            // redirect to react app
            res.redirect(`${FRONTEND_URI}/?${queryParams}`)


            // pass along tokens in query params
            

        } else {
            res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        }
    })
    .catch(error => {
        res.send(error);
    });
});

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

// All remaining requests return the React app, so it handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});
