import React, {Component} from 'react';
import api from '../../api';
import BookmarkCard from '../elements/BookmarkCard';
import auth from '../../auth';
import AddButton from '../elements/AddButton';
import CreateBookmark from '../modals/CreateBookmark';
import '../../Grid.css'
import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      bookmarks: [],
      updatedAt: "",
      showCreateModal: false
    };
  }

  componentDidMount() {
    this.fetchBoardData()
  }

  fetchBoardData = () => {
      Promise.all([
        api.getBoard(this.props.params.id),
        api.getBookmarks(this.props.params.id)
      ])
      .then(res => {
        this.setState({
          title: res[0].body.title,
          description: res[0].body.description,
          bookmarks: res[1].body.bookmarks
        })
      })
      .catch(console.error)
  }

  render() {
    let { bookmarks } = this.state
    return (
      <div className="board">
        { bookmarks.map(b =>
          <BookmarkCard
            key={b.id}
            id={b.id}
            boardId={this.props.params.id}
            title={b.title}
            url={b.url}
            updateBookmarks={this.fetchBoardData}
          />
        )}
        {auth.isLoggedIn()
          ? <AddButton action={()=>this.setState({showCreateModal: true})}/>
          : null
        }

        {this.state.showCreateModal
          ? <CreateBookmark
              boardId={this.props.params.id}
              updateBookmarks={this.fetchBoardData}
              closeModal={()=>this.setState({showCreateModal: false})}
            />
          : null
        }
      </div>
    );
  }

}
