import React, {Component} from 'react';
import api from '../../api';
import onClickOutside from 'react-onclickoutside';


import './CreateBookmark.css';

const ENTER = 13;

export default onClickOutside(class CreateBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._createBookmark();
    }
  }

  // gona have to put an if here to check for the props or not, if it
  // has an id then it means we are updating the bookmark
  // and will need to call _updateBookmark instead of _createBookmark
  _createBookmark = () => {
    let {
      title: {
        value: title
      },
      url: {
        value: url
      }
    } = this.refs;

    var bookmarkUrl = "";

    if(url.startsWith('https://') || url.startsWith('http://')) {
        bookmarkUrl = url;
    }
    else {
        bookmarkUrl = 'https://' + url;
    }

    //if there is no bookmark id, it means we are making a new bookmark
    if (!this.props.bookmarkId) {
      api.createBookmark(title, bookmarkUrl, this.props.boardId)
      .then(this.props.updateBookmarks);
    }
    else {
      var updatedData = {
        title: title,
        url: bookmarkUrl
      }
      api.updateBookmark(this.props.bookmarkId, updatedData)
      .then(this.props.updateBookmarks);
    }

    this.props.closeModal();
  }
  
  handleClickOutside = () => {
    this.props.closeModal();
  }
  

  render() {
    return (
      <div className="createBookmarkModal">
         <div className="group">
          <h3>Create or Edit Bookmark</h3>
          <input className="modal-input" type="text" ref="title"
            defaultValue={this.props.title}
            onKeyUp={this._handleTyping}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="modal-label">Title</label>
      </div>

        <div className="group">
        <input className="modal-input"
          type="text" ref="url"
          defaultValue={this.props.url}
          onKeyUp={this._handleTyping}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className="modal-label">URL</label>
      </div>
        <div className="group">
        <button className="btn" onClick={this._createBookmark}>{this.props.bookmarkId ? 'Edit' : 'Create'}</button>
      </div>
      </div>
    );
  }

})
