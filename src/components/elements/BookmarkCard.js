import React, {Component} from 'react';
import CreateBookmark from '../modals/CreateBookmark';
import api from '../../api';

import './BookmarkCard.css';

export default class BookmarkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false
    };
  }

  render() {
    let { title, url } = this.props
    return (
      <div>
      <div className="bookmark-card">
        <div className="link">
        <a href={url}>
          <div>
            <h3>{ title }</h3>
          </div>
          <img src={""} alt={title}/>
        </a>
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
            //boardId={id}
            title={title}
            url={url}
            // updateBookmarks={this._fetchBoards}
            />
          : null
        }
      </div>
    );
  }

}
