import React, {Component} from 'react';
import CreateBookmark from '../modals/CreateBookmark';
import api from '../../api';
import auth from '../../auth';

import './BookmarkCard.css';

export default class BookmarkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false
    };
  }

  _handleDelete = () => {
    api.deleteBookmark(this.props.id)
    .then(this.props.updateBookmarks);
  }

  render() {
    let { id, title, url, boardId } = this.props
    return (
      <div className="bookmark-card">
        <a href={url}>
          <div>
            <h2>{ title }</h2>
          </div>
          <img src={""} alt={title}/>
        </a>
        {auth.isLoggedIn() ? <button className="bookmarkEditButton" onClick={()=>this.setState({showCreateModal: true})}>
          Edit
        </button> : null }
        <button className="bookmarkDeleteButton" onClick={this._handleDelete}>
          Delete
        </button>

        {this.state.showCreateModal
          ? <CreateBookmark
              bookmarkId={id}
              boardId={boardId}
              title={title}
              url={url}
              updateBookmarks={this.props.updateBookmarks}
              closeModal={()=>this.setState({showCreateModal: false})}
            />
          : null
        }
      </div>
    );
  }

}
