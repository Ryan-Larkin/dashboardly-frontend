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
      <div>
        <div className="bookmark-card">
          <div className="bookmark-info">
            <a className="bookmark-text" href={url}>
              <h3>{ title }</h3>
              <img src={""} alt={title}/>
            </a>
            <img src="http://placehold.it/120x120" alt="board display here" />
          </div>
          <div className="buttons">
            <button className="btn" onClick={()=>this.setState({showCreateModal: true})}>
              Edit
            </button>
            <button className="btn" onClick={this._handleDelete}>
              Delete
            </button>
          </div>
        </div>
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
