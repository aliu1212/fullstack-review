import React from 'react';
import ListItem from './ListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br/>
    {props.repos.map((item, i) => {
      return <ListItem item={item} index={i} key={item.unid}/>
    })}
  </div>
)

export default RepoList;