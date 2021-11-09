# spotify-web-app
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

# API - Application Programming Interface
Think of this as a set of rules that allow one piece of software to talk to another. APIs make our lives easier by abstracting away complex code and replacing it with simpler more straight-forward code. 
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

