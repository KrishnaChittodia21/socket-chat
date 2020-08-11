import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import * as ChatActions from './store/actions/chatActions';

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
              render={props => {
                return (
                  <h1>login</h1>
                )
              }} />
            <Route
              path="/"
              render={props => {
                return (
                  <h1>Root</h1>
                )
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
