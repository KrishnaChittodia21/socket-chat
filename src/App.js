import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/swag.css'

import * as ChatActions from './store/actions/chatActions';
import * as AuthActions from './store/actions/authActions';
import Messenger from './components/pages/Messenger';
import Auth from './components/pages/Auth';

class App extends Component {
  componentDidMount() {
    this.props.setUpSocket(this.props.token, this.props.user.id);
  }
  render () {
    return (
      <div className="App">
        <button
          onClick={e => {
            this.props.logout();
          }}>Logout</button>
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={ props => {
                if(this.props.token) {
                  return (
                    <Redirect to="/" />
                  )
                } else {
                  return (
                    <Auth />
                  )
                }
              }}
            />
            <Route
              path="/signup"
              render={ props => {
                if(this.props.token) {
                  return (
                    <Redirect to="/" />
                  )
                } else {
                  return (
                    <Auth />
                  )
                }
              }}
            />
            <Route
              path="/:threadId"
              render={props => {
                if(!this.props.token) {
                  return (
                    <Redirect to='/login' />
                  )
                }else {
                  return (
                    <Messenger />
                  )
                }
              }} />
            <Route
              path="/"
              render={props => {
                if(!this.props.token) {
                  return (
                    <Redirect to='/login' />
                  )
                }else {
                  return (
                    <Messenger />
                  )
                }
              }} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps = dispatch => ({
  setUpSocket: (token, userId) => {
    dispatch(ChatActions.setUpSocket(token, userId))
  },
  logout: () => {
    dispatch(AuthActions.logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
