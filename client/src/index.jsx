import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO 
    $.ajax({
      type: "POST",
      url: '/repos',
      data: term,
      success: (data) => {
        console.log('term was posted!', data);
      }
    });
  }

  getAll() {
    $.ajax({
      type: "GET",
      url: '/repos',
      success: (data) => {
        this.setState({ repos : data });
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));