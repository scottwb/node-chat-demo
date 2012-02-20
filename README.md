# Node Chat Demo

This is a dead-simple example chat-room app built on `node.js` and `socket.io` to demonstrate basic usage of node.js and WebSockets. It also includes some examples of using the Jade template language and the Stylus CSS preprocessor, as well as Redis session storage for good measure.

I might wrap this with some blog posts to turn it into a simple "First Day With Node" tutorial or something.

## Installation

1. Install and run [Redis](http://redis.io/).
2. Install [node.js](http://nodejs.org/).
3. Clone this repository, install dependences, and run the server:

    ```bash
    $ git clone git://github.com/scottwb/node-chat-demo.git
    $ cd node-chat-demo
    $ npm update
    $ node app.js
    ```
4. Open a few browser windows, each to `http://localhost:3000`
5. Enter a unique username into each window and login.
6. Chat with each other via these separate windows.
