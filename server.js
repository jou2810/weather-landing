projectData = {};
const bodyParser = require('body-parser')

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
const { request } = require('http');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 4800;
// Setup Server
const Server = app.listen(port , listening);

function listening() {
    console.log(`the server running on: ${port}`);
};

app.get('/getData' ,getData);
function getData(req , res) {
    res.send(projectData);
}

app.post('/addData' , addData);
function addData(req , res) {
    EntryData={
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData=EntryData;
}
