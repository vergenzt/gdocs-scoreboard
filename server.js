var express = require("express");
var bodyParser = require('body-parser')
var GoogleSpreadsheet = require("google-spreadsheet");

var config = {
  EMAIL: "vergenzt@gmail.com",
  PASSWORD: "",
  SPREADSHEET_KEY: "",
  SHEET_NAME: "",
};

var app = express();
app.use(bodyParser.json());

var scoreboard = new GoogleSpreadsheet(config.SPREADSHEET_KEY)

app.get('/scores.json', function (req, res) {
  res.json([
    {
      username: 'dickeyxxx',
      body: 'node rocks!'
    }
  ])
})

app.listen(3000, function () {
    console.log('Server listening on', 3000)
})

