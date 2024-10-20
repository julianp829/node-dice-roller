const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

// Allow CORS only from specific origin (change this to the URL of your Azure static website)
app.use(cors({
    origin: function (origin, callback) {
        // Change 'http://localhost:3000' to your static site URL when deploying
        if (origin === 'http://localhost:3000' || !origin) { // Allow local development
            callback(null, true);
        } else {
            callback(new Error('CORS policy: Not allowed by CORS'));
        }
    }
}));

// Serve the HTML page
app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Dice Roller API</title>
            <style>
                body { font-family: Arial, sans-serif; }
                button { padding: 10px; margin: 5px; }
                #result { margin-top: 10px; font-size: 18px; }
            </style>
        </head>
        <body>
            <h1>Welcome to the Dice Roller API!</h1>
            <p>This API can generate random numbers.</p>
            <button onclick="rollDice()">Roll Dice</button>
            <div id="result"></div>
            <script>
                async function rollDice() {
                    try {
                        const response = await fetch('/api/roll?sides=6');
                        if (!response.ok) throw new Error('Network response was not ok');
                        const data = await response.json();
                        document.getElementById('result').innerText = \`Rolled: \${data.rollResult} (sides: \${data.sides})\`;
                    } catch (error) {
                        document.getElementById('result').innerText = \`Error: \${error.message}\`;
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// RESTful API for rolling a dice with user-defined sides
app.get('/api/roll', (req, res) => {
    const sides = parseInt(req.query.sides) || 6; // Defaults to 6-sided dice
    const rollResult = Math.floor(Math.random() * sides) + 1;
    console.log(`Rolled a ${sides}-sided dice, result: ${rollResult}`);
    res.json({ sides, rollResult });
});

// Custom 404 page
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
