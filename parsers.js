const express = require("express");
const app = express();
const port = 4000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "We received your request body!" });
});
app.listen(port, () => console.log("listening on port" + port));
