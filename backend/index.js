// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 5000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const connection = require("./connection/connection");
const express = require("express");
const application = express();


const bodyparser = require("body-parser");

application.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });


application.use(express.json());
application.use(bodyparser.urlencoded ({
    extended:true
}));



application.listen("5000", ()=> {
  console.log("Server started");
});


application.use("/patient", require("./routes/patientsRouter"));