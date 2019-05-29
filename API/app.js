// express
const express = require("express");
const app = express();

// mongo db
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect("mongodb+srv://admin:admin@spotifyapp-6obcg.mongodb.net/test?retryWrites=true/spotifyApp", 
{ useNewUrlParser: true }, function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3001);
  console.log("Listening on port 3001");
});

app.get('/save', function(req, res) {

});