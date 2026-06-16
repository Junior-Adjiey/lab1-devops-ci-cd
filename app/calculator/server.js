const express = require("express");
const calc = require("./app");

const app = express();

app.use(express.static("public"));

app.get("/calculate", (req, res) => {
    const expression = req.query.expression;

    try {
        const result = calc(expression);
        res.json({ result });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Calculator running on port 3000");
});