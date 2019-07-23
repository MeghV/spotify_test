const fetch = require('isomorphic-fetch')

// this file is an API endpoint that lives on the serverside
//      - Next.js (which is rendering this app) gives us the serverside
//        functionality for everything that's in the api/ folder
var client_id = ''; // Your client id
var client_secret = ''; // Your secret

// Async function used here so we can use the "await" 
// syntax when making a request
export default async function getToken(req, res) {
    // req.body will contain whatever you pass into the body: ... 
    // parameter of a POST fetch request
    try {
        const tokenParams = {
            grant_type: 'client_credentials'
        }

        // puts token into this format:
        //  url.com/?grant_type=client_credentials
        // which is called form-urlencoded format (the data is encoded in the URL)
        const searchParams = Object.keys(tokenParams).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(tokenParams[key]);
        }).join('&');

        const r = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: searchParams
        }) // you can still use .then() in an await, but the benefit is that it's cleaner to have everything in linear format
            .then(response => response.json())

        console.log('tokenObject', r)

        const accessToken = r.access_token

        console.log('success getting token!')
        return res.status(200).send({
            error: null,
            data: accessToken
        })
    } catch (e) {
        console.log('error getting token', e)
        return res.status(400).send({
            error: e,
            data: null
        })
    }
}