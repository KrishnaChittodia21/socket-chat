import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/swag.css'

import * as ChatActions from './store/actions/chatActions';
import auth from './components/pages/Auth';
import Auth from './components/pages/Auth';

class App extends Component {
  componentDidMount() {
    this.props.setUpSocket();
  }
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              component={Auth}
            />
            <Route
              path="/signup"
              component={Auth}
            />
            <Route
              path="/"
              render={props => {
                if(!this.props.token) {
                  return (
                    <Redirect to='/login' />
                  )
                }else {
                  return (
                    <h1>Root</h1>
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
  setUpSocket: () => {
    dispatch(ChatActions.setUpSocket())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
