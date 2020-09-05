import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as AuthActions from '../../store/actions/authActions';

class Sidebar extends Component {
  state = {
    search: ''
  }

  search = () => {
    this.props.socket.send(JSON.stringify({
      type: 'SEARCH',
      data: this.state.search
    }))
  }

  findOrCreateThread = (id) => {
    this.props.socket.send(JSON.stringify({
      type: 'FIND_THREAD',
      data: [this.props.user.id, id]
    }))
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className="sidebar">
        <div className="search-container">
          <div className="row">
          <input className="form-control col-md-10" placeholder="Search..." value={this.state.search} onChange={ e => {
            this.setState({search: e.target.value})
          }} />
          <button className="col-md-2" onClick={ e => this.search()}><i className="fa fa-search" aria-hidden="true"></i></button>
          </div>
        </div>
        {
          this.state.search ?
          <ul className="thread-list">
            <label>Results</label>
            {
              this.props.users.filter( u =>  u.id !== this.props.user.id).map((user, ui) => {
                return (
                  <li key={ui}>
                    <a onClick={e => {
                      e.preventDefault();
                      this.findOrCreateThread(user.id)
                    }}>
                      <i className="zmdi zmdi-account-circle"/>
                      <h5>{user.name}</h5>
                      <p>{user.email}</p>
                    </a>
                  </li>
                )
              })
            }
          </ul>
          :
        <ul className="thread-list">
          <label>Messages</label>
          {
            this.props.threads.map((thread, threadIndex) => {
              return (
                thread.profiles && thread.users.indexOf(this.props.user.id) > -1 &&
                <li key={threadIndex}>
                  <Link to={`/${thread.id}`}>
                    <i className="zmdi zmdi-account-circle"/>
                    
                      {
                        thread.profiles && thread.profiles.filter(u => u.id !== this.props.user.id).map((item) => {
                          return (
                            <h5>{item.name}</h5>
                          )
                        })
                      }
                    <p>
                      {
                        thread.Messages &&
                        thread.Messages[thread.Messages.length -1].content
                      }
                    </p>
                  </Link>
              </li>
              )
            })
          }
        </ul>
        }
        <button className="btn btn-primary col-md-12 logout-btn" onClick={ e => this.handleLogout(e)}>
          Logout
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(AuthActions.logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));