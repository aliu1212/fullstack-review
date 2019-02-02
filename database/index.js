const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  unid: Number, //.id
  name: String, //.name
  link: String, //.html_url
  owner: String, //.owner.login
  stars: Number //.stargazers_count
});

let Repo = mongoose.model('Repo', repoSchema);

let save = ({unid, name, link, owner, stars}) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let newbie = new Repo ({ unid, name, link, owner, stars });
  //check for dupilcates ? /
  newbie.save((err) => {
    if (err) {
      console.log('error saving to db', err);
    } else {
      console.log('save successful!')
    }
  })
}

module.exports = {save, Repo};