#!/usr/bin/env node

var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api');

app.listen(3000, function () {
  console.log('server running on port 3000');
})

// 
// VERSION 1: calling python script from a node child process
// bhai this is the API route where you will do a ajax or GET POST req
//i dont know about api get nd post request
//no need to know yaha pe already bana hai 
//just use it that i know
app.use(express.static('public'));
app.get('/', callD_alembert);

function callD_alembert(req, res) {
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
  console.log(req.query);
  var spawn = require("child_process").spawn;
  var process = spawn('python', ["./test.py",
    //like mentioned below
    req.query.Height, // starting funds
    req.query.Weight, // (initial) wager size
    req.query.Size, // wager count - number of wagers per sim
  ]);

  process.stdout.on('data', function (data) {
    console.log(data.toString());
    res.send(data.toString());
  });
}
