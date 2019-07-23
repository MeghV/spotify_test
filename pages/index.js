import React, { Component } from 'react';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: "", // my query
            artist: null  // my response.
        }
    }

    // gotta put async here so we can use the "await" syntax
    async search() {
        // try / catch is eqivalent to:
        // .then().catch() -> basically 'await' replaces .then, so you can
        // pull data and take actions all in-line w/o having to put everything 
        // in deepending .then() statements 

        try {
            // calling this on the server is necessary as Spotify'S API
            // doesnt let you call it from localhost (the local browser running the app)
            const spotifyToken = await fetch('/api/getToken')
            console.log('got spotify token!', spotifyToken)
            
            // you should be able to put the rest of your code in here w/o using
            // the backend api/ to run the code -- just pass in the spotifyToken
            // that's passed in

        } catch (e) {
            console.log('error!', e)
        }

        //console.log(json);

        // var accessToken = '';

        //var request = require("request"); // "Request" library

        /*
            .then(json => {
              console
              const artist = json.artists.items[0];        
              this.setState({ artist });
            })*/
        /*
        request.post({
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
          },
          url: 'https://accounts.spotify.com/api/token',//'https://accounts.spotify.com/api/token',
          form: {
            grant_type: 'client_credentials'
          },
          json: true,
          mode: 'no-cors',
          cache: 'default'
        }, function(error, response, body) {
          console.log('body', body);
          console.log('response', response);
          console.log('error', error);
          if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            accessToken = body.access_token;
            var options = {
              url: 'https://api.spotify.com/v1/users/mbdogluver',
              headers: {
                'Authorization': 'Bearer ' + accessToken
              },
              json: true
              //mode: 'cors',
              //cache: 'default'
            };
            request.get(options, function(error, response, body) {
              console.log(body);
            });
          }
        })*/

        /////

        //var accessToken = token;

        // var myOptions = {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'Bearer ' + accessToken
        //     },
        //     json: true,
        //     //mode: 'no-cors',
        //     cache: 'default'
        // };

        // console.log(FETCH_URL)

        // fetch(FETCH_URL, myOptions)
        //   .then(data => {
        //     console.log(data.artists.items)
        //     //this.setState({ artist });
        //   })
        //   .then(response => {
        //     console.log(response);
        //     response.json()
        //     console.log(response.artists.items);
        //   })
        //   .catch(error => { console.log(error) })
    }

    render() {

        let artist = {
            name: '',
            followers: {
                total: ''
            }
        };
        if (this.state.artist !== null) {
            artist = this.state.artist;
        }

        return (
            // return JSX 
            <div className="container">
                <hr />
                <div className="col-lg-6">
                    <div className="input-group">
                        <input type="text"
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            className="form-control" placeholder="Search for a song, artist, or playlist" />
                        <span className="input-group-btn">
                            <button
                                onClick={() => this.search()}
                                className="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>
                </div>
                <hr />
                <div>
                    <div> {artist.name} </div>
                    <div> {artist.followers.total} </div>
                </div>


            </div>
        )
    }
}
export default App;