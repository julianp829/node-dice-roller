const express = require('express');
const cors = require("cors");
const url = require('url');

const app = express();
const port = process.env.PORT || 3000;
const majorVersion = 1;
const minorVersion = 3;

app.use(cors({ origin: '*' }));

// Implement a custom About page.
app.get('/about', (request, response) => {
    console.log('Calling "/about" on the Node.js server.');
    response.type('text/plain');
    response.send('About Dice Roller API v' + majorVersion + '.' + minorVersion);
});

// Ping endpoint for testing connectivity
app.get('/api/ping', (request, response) => {
    console.log('Calling "/api/ping"');
    response.type('text/plain');
    response.send('ping response');
});

// RESTful API for rolling a dice with user-defined sides
app.get('/api/roll-dice', (request, response) => {
    const sides = parseInt(request.query.sides) || 6; // Defaults to 6-sided dice
    const rollResult = Math.floor(Math.random() * sides) + 1;
    console.log(`Rolled a ${sides}-sided dice, result: ${rollResult}`);
    response.json({ sides, rollResult });
});

// Return Batman as JSON (if still needed)
const batMan = {
    "firstName": "Bruce",
    "lastName": "Wayne",
    "preferredName": "Batman",
    "email": "darkknight@lewisu.edu",
    "phoneNumber": "800-bat-mann",
    "city": "Gotham",
    "state": "NJ",
    "zip": "07101",
    "lat": "40.73",
    "lng": "-74.17",
    "favoriteHobby": "Flying",
    "class": "cpsc-24700-001",
    "room": "AS-104-A",
    "startTime": "2 PM CT",
    "seatNumber": "",
    "inPerson": [
        "Monday",
        "Wednesday"
    ],
    "virtual": [
        "Friday"
    ]
};

app.get('/batman', (request, response) => {
    console.log('Calling "/batman" on the Node.js server.');
    response.type('application/json');
    response.send(JSON.stringify(batMan));
});

// Load your JSON data
const favoritePlaces = require('./FavoritePlaces.json');

// Create a route that serves the JSON data
app.get('/api/favorite-places', (req, res) => {
    res.json(favoritePlaces);
});

// Custom 404 page.
app.use((request, response) => {
    response.type('text/plain');
    response.status(404);
    response.send('404 - Not Found');
});

// Custom 500 page.
app.use((err, request, response, next) => {
    console.error(err.message);
    response.type('text/plain');
    response.status(500);
    response.send('500 - Server Error');
});

app.listen(port, () => console.log(
    `Express started at "http://localhost:${port}"\n` +
    `Press Ctrl-C to terminate.`
));
