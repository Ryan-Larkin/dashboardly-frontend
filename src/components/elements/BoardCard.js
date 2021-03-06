import React, {Component} from 'react';
import { Link } from 'react-router';
import CreateBoard from '../modals/CreateBoard';
import api from '../../api';

import './BoardCard.css';

export default class BoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false,
      dim1: 150,
      dim2: 150
    };
  }

  _handleDelete = () => {
    api.deleteBoard(this.props.id)
    .then(this.props.updateBoards);
  }

  componentWillMount() {
    this.setState({
      dim1: this.getRandNum(145,155),
      dim2: this.getRandNum(145,155)
    })
  }

  getRandNum = (min, max) => Math.floor(Math.random()*(max-min+1)+min)

  render() {
    let { id, title, description, ownerId, currentUserId } = this.props
    return (
      <div>
        <div className="board-card">
          <Link className="board-info" to={`/boards/${id}`}>
            <div className="board-text">
              <h3>{ title }</h3>
              <p>{ description }</p>
            </div>
            <div className="board-image">
              <img src={`http://lorempixel.com/${this.state.dim1}/${this.state.dim2}/`}
                alt="board display here"
              />
          </div>
          </Link>
        {ownerId === currentUserId ?
        <div className="buttons">
            <button className="btn" onClick={()=>this.setState({showCreateModal: true})}>
              Edit
            </button>
            <button className="btn" onClick={this._handleDelete}>
              Delete
            </button>
        </div> : null }
        </div>
        {this.state.showCreateModal
          ? <div className="backdrop">
              <CreateBoard className="modal"
              boardId={id}
              title={title}
              description={description}
              updateBoards={this.props.updateBoards}
              closeModal={()=>this.setState({showCreateModal: false})}
            />
            </div>
          : null}
      </div>
    );
  }

}
