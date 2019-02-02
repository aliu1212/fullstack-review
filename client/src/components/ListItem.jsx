import React from 'react';

const ListItem = (props) => (
  <div>
    id: {props.item.unid}  name: {props.item.name}  link: {props.item.link}  username: {props.item.owner}  stars: {props.item.stars}
  </div>
)

// unid: Number, //.id
//   name: String, //.name
//   link: String, //.html_url
//   owner: String, //.owner.login
//   stars: Number

export default ListItem;