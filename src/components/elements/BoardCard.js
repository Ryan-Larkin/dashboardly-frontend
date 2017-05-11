import React, {Component} from 'react';
import { Link } from 'react-router';
import CreateBoard from '../modals/CreateBoard';
import api from '../../api';

import './BoardCard.css';

export default class BoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false
    };
  }

  _handleDelete = () => {
    api.deleteBoard(this.props.id)
    .then(this.props.updateBoards);
  }

  componentDidUpdate = () => {

  }

  render() {
    let { id, title, description, ownerId, currentUserId } = this.props
    return (
      <div>
        <Link to={`/boards/${id}`} className="board-card">
          <div className="board-text-container">
            <h2>{ title }</h2>
            <p>{ description }</p>
          </div>
          <img src="http://placehold.it/150x150" alt="Board Display Here"/>
        </Link>

        {ownerId === currentUserId ?
          <div>
            <button className="boardEditButton" onClick={()=>this.setState({showCreateModal: true})}>
              Edit
            </button>
            <button className="boardDeleteButton" onClick={this._handleDelete}>
              Delete
            </button>
          </div> : null }

        {this.state.showCreateModal
          ? <CreateBoard className="modal"
            boardId={id}
            title={title}
            description={description}
            updateBoards={this.props.updateBoards}
            closeModal={()=>this.setState({showCreateModal: false})}
            />
          : null
        }
      </div>
    );
  }

}
