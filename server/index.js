const express = require('express');
const parser = require('body-parser');//added
const {getReposByUsername, getTop} = require('../helpers/github.js');
const {save} = require('../database/index');
let app = express();
app.use(parser.json())//added
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let user = req.body.term;
    getReposByUsername(user, (err, data) => {
    if (err) {
      console.log('error handling getRepos:', err)
    } else {
      //save data
      // console.log('data from helper fn', data);
      let variable = JSON.parse(data);
      // console.log('variable', variable)
      for (let i = 0; i < variable.length; i++) {
        let unid = variable[i].id
        let name = variable[i].name;
        let link = variable[i].html_url;
        let owner = variable[i].owner.login;
        let stars = variable[i].stargazers_count;
        save({ unid, name, link, owner, stars })
      }
      res.status(200).send(variable);
    }
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getTop((err, data) => {
    if(err) {
      console.log('error getting top25:', err);
    } else {
      res.status(200).send(data);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

