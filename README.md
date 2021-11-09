# Spotify Web App
A web app to visualize personalized Spotify data including features that aren't readily available in the official Spotify app. 

# Front end
- React (with hooks)
- Styled Components
- React Router

# Back end
- Node
- Express
- Heroku

# REST APIs and Express
- difference between regular APIs and REST APIs
- basic REST principles
- anatomy of REST API requests and responses
- how Express fits in with Node.js
- how to create a Node server with Express
- how to handle HTTP requests and responses with Express route handlers

# Nodemon
Nodemon is a tool that automatically restarts our Node server when any changes in index.js are detected, saving us the hassle of stopping and restarting the server any time we want our changes to be reflected. 
To install nodemon as a development dependency, run: \
`npm install --save-dev nodemon`\
I've also added an npm script in `package.json` to run `nodemon` on our Node server when we run `npm start`.

# API - Application Programming Interface
Think of this as a set of rules that allow one piece of software to talk to another. APIs make our lives easier by abstracting away complex code and replacing it with simpler more straight-forward code. 
Imagine what happens when you open the Spotify app and play a song. There's probably some code that runs on clicking Play that looks like this:\
`mediaPlayer.play();`\
The play() function is an API method that abstracts away things like:
- The code needed to retrieve the audio file from the internet or your device
- The code needed to send audio data to your device\
In client-side JS, APIs are usually based on **objects**. Chances are you've seen the following: \
`const element = document.querySelector('.special-class');`\
This is an example of using the DOM (Document Object Model) API. The `document` object is being used as the entry point for the DOM API, and `querySelector()` is the API method. 
Note: these APIs aren't part of the JS language, but they are **built on top of JS** to give developers a convenient set of tools out of the box. 

## Types of APIs
In the web development world, APIs generally falls into one of two categories: **browser APIs** and **third-party APIs**.

### Browser APIs
These APIs are built into your web browser (like Chrome or Safari) and expose data from the browser and surrounding computer environment that developers can easily leverage. 
The most common browser API is the **DOM API**. It lets you manipulate HTML and CSS -- creating, removing, and changing HTML, dynamically applying new styles to your page, etc. 
There's a long list of browser APIs, another notable one is the Web Audio API that let's you manipulate audio in the browser. It allows you to do some very interesting things like altering 
the volume of a track, apply different effects to it, etc. The API abstracts away all the complex lower-level code that's doing the actual audio processing so you can focus on building something cool. 

### Third-party APIs
Third-party APIs are not built into the browser by default, and you generally have to retrieve their code and information from somewhere on the web. For instance, the Twitter API allows you to do things like 
displaying your tweets on your website. Similarly, the Spotify API allows us to do things like displaying your top artists and tracks of all time. More details to follow. 

## REST APIs
When people talk about third-party APIs like the Spotify API or the GitHub API, they're talking about a REST API. REST stands for **Representation State Transfer**. 
If an API is a set of rules that allow one piece of software to talk to another, then REST is a standard set of rules that developers follow to create an API. These rules determine *what the API looks like*.
For an API to be considered RESTful, certain criteria must be met: 
- **Client-Server**: The API should enable a client-server architecture made up of clients, servers, and resources, with requests managed through HTTPd. When System A makes an HTTP request to a URL hosted by 
System B, System B's server should return a response. 
- **Stateless**: All requests should be independent of each other. It should be possible to make two or more HTTP requests in any order, with the same responses being received. 
- **Cacheable**: The API should make data cacheable, to streamline client-server interactions. 
- **Uniform Interface**: There should be a uniform interface between components so that information is transferred in a standard form.
- **Layered**: The requesting client doesn't need to know whether it's communicating with the actual server, a proxy, or any other intermediary.
- **Code-on-demand**: The API allows executable code to be sent from the server to the client when requested, extending client functionality. 

### RESTful Requests
In simple terms, the client-server side of RESTful APIs means that you should be able to receive a piece of data (also known as a resource) when you access a predefined URL. 
Each of these URLs, also known as "endpoints", are part of what is called a **request**, and the data you receive from the request is called a response. The resources provided by these responses are usually in 
the form of JavaScript Object Notation (JSON). 
A RESTful request is composed of four parts:
1. the endpoint URL
2. the HTTP method
3. the HTTP headers
4. the body data

#### 1. The endpoint
The "endpoint" is the URL you request. All REST APIs have a base URL (also known as the "root" endpoint). For example, the base URL of Spotify's API is `https://api.spotify.com` while the base URL of GitHub's API is 
`https://api.github.com`. Additionally, each endpoint in a REST API has a **path** that determines the resource being requested. Some endpoints also support **query parameters**, which give you the option to modify 
your request with key-value pairs. They always come after the main URL you're requesting and begin with a question mark (`?`). Each key-value pair is specified with an equal sign (`=`) and each parameter pair is 
separated with an ampersand (`&`), like this:\
`https://some-api.com?query1=value1&query2=value2`\
Query parameter values cacn sometimes be a list of things. In these cases, it's common to use comma-separated lists. The playlist endpoint example above supports query parameters. Here's an example with the `fields` 
query parameter:\
`https://api.spotify.com/v1/playlists/{playlist_id}?fields=description,uri`\
This endpoint will return just the playlist's description and URI and exclude any other data it would usually return. 
Spofity API Documentation [here](https://developer.spotify.com/documentation/web-api/reference/#/)\
Endpoints are just like any other URL you visit on the web, but instead of returning data for a website, they return resources (e.g. data like JSON or XML). 

#### 2. The HTTP method
The second part of a RESTful request is the HTTP method. This method is the **type of request** you send to the server. There are five common types: `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. They are used to 
perform four possible operations: Create, Read, Update, and Delete (**CRUD**).
- **GET**: Retrieves or "reads" resources
- **POST**: Creates resources
- **PUT / PATCH**: Updates resources
- **DELETE**: Deletes resources\
When working with a REST API, the documentation should tell you which HTTP method to use with each request. For example. Spotify's get playlist endpoint from the examples above should be used with a `GET` request.\
`GET https://api.spotify.com/v1/playlists/{playlist_id}`\
The resource this endpoint returns is some JSON about a specific playlist. 

#### 3. The HTTP headers
HTTP request headers are used to provide information to both the client and server. You can store things like authentication tokens, cookies, or other metadata in HTTP headers. In our app, we'll be sending 
basic authorization headers in our HTTP requests so the Spotify API can authorize our requests. 
Headers are **key-value** pairs that are separated by a colon. The example below shows a header that tells the server to expect JSON content.
`"Content-Type: application/json"`\
A complete list of valid headers [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

#### 4. The body data
Finally, the "body" of a request contains any information you want to send to the server. Since `GET` requests don't need any extra information from you to return existing resources, only `POST`, `PUT`, `PATCH`, or 
`DELETE` requests can have body data. 
The body data you send along with these requests is usually the data you'd like to create a new resource with (via a `POST` request) or the modified value of a resource you'd like to update (`PUT` or `PATCH`).
Data is normally transmitted in the HTTP request's body by sending a single JSON-encoded data string. 

### RESTful Responses
REST API responses usually return resources (data) in the form of JSON. 
Here's an example of the JSON response returned from the Spotify API's `playlist` endpoint:
```json
// GET https://api.spotify.com/v1/playlists/59ZbFPES4DQwEjBpWHzrtC
{
    "collaborative": false,
    "description": "Having friends over for dinner? Here´s the perfect playlist.",
    "external_urls": {
        "spotify": "http://open.spotify.com/user/spotify/playlist/59ZbFPES4DQwEjBpWHzrtC"
    },
    "followers": {
        "href": null,
        "total": 143350
    },
    "href": "https://api.spotify.com/v1/users/spotify/playlists/59ZbFPES4DQwEjBpWHzrtC",
    "id": "59ZbFPES4DQwEjBpWHzrtC",
    "images": [
        {
            "url": "https://i.scdn.co/image/68b6a65573a55095e9c0c0c33a274b18e0422736"
        }
    ],
    "name": "Dinner with Friends",
    "owner": {
        "external_urls": {
            "spotify": "http://open.spotify.com/user/spotify"
        },
        "href": "https://api.spotify.com/v1/users/spotify",
        "id": "spotify",
        "type": "user",
        "uri": "spotify:user:spotify"
    },
    "public": null,
    "snapshot_id": "bNLWdmhh+HDsbHzhckXeDC0uyKyg4FjPI/KEsKjAE526usnz2LxwgyBoMShVL+z+",
    "tracks": {
        // Removed for brevity
    },
    "type": "playlist",
    "uri": "spotify:user:spotify:playlist:59ZbFPES4DQwEjBpWHzrtC"
}
```
There's a lot of useful information stored in this JSON that we can use on the front end, like the playlist name, description, cover image, and number of followers. 

### HTTP status codes
Another REST principle is that every REST API response should also include an HTTP status code in the response header. These status codes are numbers that indicate whether a request was successfully 
completed, and range from the 100s to the 500s. In general, the categories are:
- 100+: Informational response
- 200+: Request has succeeded
- 300+: Request has redirected to another URL
- 400+: An error that originates from the client has occurred
- 500+: An error that originates from the server has occurred

## Express
Express is a popular framework for Node.js, designed for building web applications. At its core, it provides HTTP utility methods and middleware for developers to easily create powerful APIs. Express 
makes it easy to do things like: 
- Write handlers for requests with different HTTP verbes (GET, POST, DELETE, etc.) at different URL paths (routes)
- Integrate with "view" rendering engines (Pug, Mustache, EJS, etc.) to dynamically generate responses
- Add additional request processing middleware at any point within the request handling pipeline to handle things like authentication, cookies, URL parameters, and more\
Express documentation [here](https://expressjs.com/en/starter/basic-routing.html)


### Routing
When a user goes to a URL (i.e. makes a request to an endpoint), we need to define what happens behind the scenes when the user hits that endpoint, as well as what they get back as a response. 
For example, when a user hits an endpoint we might want to query a database for information, modify data in some way, or create a new instance of something (like posting a new picture on Instagram). 
Think CRUD operations! 

### Route handlers
With Express apps, every route definition is structured like this:
`app.METHOD(PATH, HANDLER)`
- `app` is an Express instance
- `METHOD` is an HTTP request method in lowercase (like get or post)
- `PATH` is a URL path on the server
- `HANDLER` is the callback function that is run every time a user hits the specific URL\
The callback function takes a request and a response object as arguments. No matter what you call the arguments, the first argument will always be the request and the second will always be the response. 

### Responses
There are a bunch of response methods for ending the request/response cycle such as `res.send()`, `res.json()` to send a JSON response or `res.sendFile()` to send a file. `res.json()` is probably the response method 
most often used. Here is an example: \
```js
app.get('/', (req, res) => {
    const data = {
        name: 'Brittany', 
        isAwesome: true
    };

    res.json(data);
});
```

### Requests
The callback function's request (req) argument is an object. This object contains information about what's coming in with the request. Here are a few examples:
- req.body: Contains key-value pairs of data submitted in the request body
- req.method: Contains a string corresponding to the HTTP method of the request
- req.params: An object containing properties mapped to the named route "parameters"
- req.query: An object containing a property for each query string parameter in the route\
req.query is a property that's commonly utilized in route handlers. A simple example would be using the endpoint's query parameters (the key value pairs following the `?` in the URL) to dynamically generate a 
response. If you add the handler above for the `/awesome-generator` endpoint to your `index.js` file and restart the server, you should be able to dynamically change the text that is being displayed in your browser 
by updating the URL's query parameters in your browser's address bar. In our route handler, we use destructuring to grab the `name` and `isAwesome` properties off the req.query object. Then we dynamically generate 
the string to send back with template strings. If `isAwesome` is true, the string will end with "really awesome", and if its false, it'll end with "not awesome". \
`res.send(``${name} is ${JSON.parse(isAwesome) ? 'really' : 'not'} awesome``);`

