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