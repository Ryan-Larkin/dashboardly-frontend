import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import CreateBoard from '../modals/CreateBoard';
import auth from '../../auth';
import onClickOutside from 'react-onclickoutside';

import './Home.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      showCreateModal: false
    };
  }

  componentDidMount() {
    this._fetchBoards();
  }

  _fetchBoards = () => {
    api.getBoardsList()
    .then(res => {
      this.setState({ boards: res.body.boards })
    })
    .catch(console.error)
  }

  closeModal = () => this.setState({ showCreateModal: false })

  handleClickOutside = () => {
    this.closeModal();
  }

  render() {
    let { boards } = this.state
    const { user } = this.props
    return (
      <div className="home">
        {boards.map(b =>
          <BoardCard
            key={b.id}
            id={b.id}
            currentUserId={user ? user.users_id : null}
            ownerId={b.ownerId}
            title={b.title}
            description={b.description}
            updatedAt={b.updatedAt}
            updateBoards={this._fetchBoards}
          />
        )}
        {auth.isLoggedIn()
          ? <AddButton className="add-button" action={()=>this.setState({showCreateModal: true})}/>
          : null
        }

        {this.state.showCreateModal
          ? <div className="backdrop">
              <CreateBoard
                updateBoards={this._fetchBoards}
                closeModal={()=>this.setState({showCreateModal: false})}
              />
            </div>
          : null
        }
      </div>
    );
  }

}

export default onClickOutside(Home);
