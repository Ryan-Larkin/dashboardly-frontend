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

  render() {
    let { id, title, description } = this.props
    return (
      <div>
        <Link to={`/boards/${id}`}>
          <div className="board-card">
            <h2>{ title }</h2>
            <p>{ description }</p>
          </div>
        </Link>
        <button className="boardEditButton" onClick={()=>this.setState({showCreateModal: true})}>
          Edit
        </button>
        <button className="boardDeleteButton" onClick={this._handleDelete}>
          Delete
        </button>

        {this.state.showCreateModal
          ? <CreateBoard
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
