require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URL;
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};
const app = express(); 
const PORT = 7000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
app.use(bodyParser.json());

require('./models/UrlShorten');
require("./routes/urlshorten")(app);

mongoose.Promise = global.Promise; 
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{ 
  if (err) console.log('Error', err); 
  console.log(`Connected to MongoDB`); 
}); 

app.listen(PORT, () => { 
  console.log(`Server started on port`, PORT); 
});