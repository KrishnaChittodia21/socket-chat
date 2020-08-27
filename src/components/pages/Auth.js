import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../partials/Login';
import SignUp from '../partials/SignUp';

class Auth extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        {
          this.props.match.path === '/signup' ?
            <SignUp/>
          :
            <Login/>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Auth));