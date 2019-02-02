const request = require('request');
const config = require('../config.js');
const {Repo} = require('../database/index')

//username === .owner.login
let getReposByUsername = (user, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request(options, function (error, response, body) {
    if (error) {
      callback(error);
    } else { 
      console.log('REQUEST statusCode:', response && response.statusCode); 
      callback(null, body);
    }
  });
}

let getTop = (callback) => {
  Repo.find({}, (err, data) => {
    if (err) {
      callback(err);
    } else {
      let top25 = [];
      let compare = (a,b) => {
        if (a.stars < b.stars)
          return 1;
        if (a.stars > b.stars)
          return -1;
        return 0;
      }
      data.sort(compare);
      for (let i = 0; i < data.length && top25.length < 25; i++) {
        top25.push(data[i]);
      }
      callback(null, top25);
    }
  })
}

module.exports = {getReposByUsername, getTop};