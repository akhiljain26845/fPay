const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fPayRoutes = require("./Routes/fPayRoutes");
app.use(bodyParser.json());

app.use('/', fPayRoutes);

//Server starts at port 3001
app.listen(3001, function(err) {
  if (err) throw new Error(err);
  console.log('======== Server started ========');
});