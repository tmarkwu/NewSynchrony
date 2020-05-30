import React, { Component } from 'react';

class RedditItem extends Component {

  constructor(props){
    super(props);
    console.log("https://www.reddit.com/" + this.props.url);
  }

  componentDidMount(){
      this.renderPosts();
  }

  renderPosts = () => {
    try{
      const script = document.createElement('script');
      script.src = "https://embed.redditmedia.com/widgets/platform.js";
      script.charset = "UTF-8"
      script.async = true
      document.getElementById("r").appendChild(script);
    }
    catch(err) {
      console.log("error");
    }
  }

  render() {
    return (
      <div id="r">
      <blockquote className="reddit-card"><a href={"https://www.reddit.com" + this.props.url}>{this.props.title}</a> from <a href={"http://www.reddit.com/" + this.props.subreddit}>{this.props.subreddit}</a></blockquote>
      </div>
    );
  }
}

export default RedditItem;
