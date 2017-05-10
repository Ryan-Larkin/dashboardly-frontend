import React, {Component} from 'react';
import './CreateBoookmark.css';

export default class CreateBoookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _createBookmark =() =>{
    let {
        title: {
          value: title
        },
        url: {
          value: url
        }
    } = this.refs;
    
  }

  render() {
    return (
      <div>
        <h1>Make a Bookmark!</h1>
        <input type="text" ref="url" placeholder="url"/>
        <input type="text" ref="title" placeholder="title"/>
        <button>Submit</button>
        
      </div>
    );
  }

}
