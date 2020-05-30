import React, { Component } from 'react';
import RedditItem from './RedditItem.js';

class RedditList extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.props.reddit.map((item) => (
        <RedditItem url={item.data.permalink} title={item.data.title} subreddit={item.data.subreddit_name_prefixed}/>
      ))
    );
  }
}

export default RedditList;
