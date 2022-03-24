const express = require("express");
const app = express();
const port = 3000;

//app.get("/", (req, res) => res.send("Hey yo!"));

// * Create a middleware function with the name loggingMiddleware.
function loggingMiddleware(req, res, next) {
  // * in addition to logging the current time to the console
  const currentTime = new Date();
  console.log(`Request received at: ${currentTime}`);
  // * this middleware should also send a "custom header" (using res.setHeader(name, value)) to the client.
  // * the header names would be X-Codaisseur-Time, and its value should be the same timestamp that was logged to the console.
  // * add this middleware at the application level.
  res.setHeader("X-Codaisseur-Time", currentTime);
  next();
}

// * next, make a middleware function called "failRandomlyMiddleware".
function failRandomMiddleware(req, res, next) {
  // * make it so that 50% of the time (using Math.random) the middleware simply calls next()
  if (Math.random() * 2 >= 1) {
    next();
  } else {
    // * and the other 50% of the time it will end the request with a 500 status code (and no content).
    res.status(500).end();
  }
}
app.use(loggingMiddleware);

// * add this middleware at the route level.
app.get("/", failRandomMiddleware, (req, res) => res.send("Hey!"));

// * add a second route to respond to /foo. Do not add the failRandomlyMiddleware.
// * confirm that the /foo does include the custom X-Codaisseur-Time, but does not fail randomly.
app.get("/foo", (req, res) => res.send("Ola!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
