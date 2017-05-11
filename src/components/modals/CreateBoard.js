import React, {Component} from 'react';
import api from '../../api';

import './CreateBoard.css';

const ENTER = 13;

export default class CreateBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._createBoard();
    }
  }

  _createBoard = () => {
    let {
        title: {
          value: title
        },
        description: {
          value: description
        }
    } = this.refs;

    // if there is no board id, it means we are making a new board
    if (!this.props.boardId)
      api.createBoard(title, description)
      .then(this.props.updateBoards);
    else {
      var updatedData = {
        title: title,
        description: description
      }
      api.updateBoard(this.props.boardId, updatedData)
      .then(this.props.updateBoards);
    }

    this.props.closeModal();
  }

  render() {
    return (
      <div className="createBoardModal">
        <input type="text" ref="title" placeholder="Title"
          defaultValue={this.props.title}
          onKeyUp={this._handleTyping}
        />
        <textarea ref="description" rows="4" cols="50" placeholder="Description"
          defaultValue={this.props.description}
          onKeyUp={this._handleTyping}>
        </textarea>
        <button onClick={this._createBoard}>{this.props.boardId ? 'Edit' : 'Create'}</button>
      </div>
    );
  }

}
