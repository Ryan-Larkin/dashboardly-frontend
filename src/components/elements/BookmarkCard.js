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

  _handleDelete = () => {
    api.deleteBookmark(this.props.id)
    .then(this.props.updateBookmarks);
  }

  render() {
    let { id, title, url } = this.props
    return (
      <div>
        <a className="bookmark-card" href={url}>
          <div>
            <h2>{ title }</h2>
          </div>
          <img src={""} alt={title}/>
        </a>
        <button className="bookmarkEditButton" onClick={()=>this.setState({showCreateModal: true})}>
          Edit
        </button>
        <button className="bookmarkDeleteButton" onClick={this._handleDelete}>
          Delete
        </button>

        {this.state.showCreateModal
          ? <CreateBookmark
              bookmarkId={id}
              boardId={this.params.id}
              title={title}
              url={url}
              updateBookmarks={this.props.updateBookmark}
              closeModal={()=>this.setState({showCreateModal: false})}
            />
          : null
        }
      </div>
    );
  }

}
