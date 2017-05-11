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
    api.deleteBoard(this.props.id) // id is the board id
    //.then(this.props.updateBoards);
  }
//updateBoards={this.props.updateBoards}
  render() {
    let { title, description, id } = this.props
    return (
      <div>
        <div className="board-card">
          <div className="link">
        <Link to={`/boards/${id}`}>
            <h3>{ title }</h3>
            <p>{ description }</p>
        </Link>
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
          ? <CreateBoard
            boardId={id}
            title={title}
            description={description}

            />
          : null
        }
      </div>
    );
  }

}
