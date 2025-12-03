const express = require("express");
const path = require("path");

const app = express();

// For parsing JSON from Android
app.use(express.json());

// To serve files in /views as static HTML
app.use(express.static("views"));

// GET route for test.html
app.get("/test.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "test.html"));
});

// POST: handle Madlibs data
app.post("/madlibs", (req, res) => {
    const { w1, w2, w3, w4, w5 } = req.body;

    const story = `
        One day, a ${w3} ${w1} decided to ${w2} 
        all the way to ${w4} with ${w5}.
        It was the greatest adventure ever told!
    `;

    res.send(story);
});

// IBM Cloud will set PORT automatically
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Madlibs server running on port", port);
});

