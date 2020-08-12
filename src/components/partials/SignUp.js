import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props); // to instantiate parent class
    this.state = {
      email: '',
      password: '',
      passwordAgain: '',
      name: '',
      username: '',
      error: ''
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form-wrapper">
              <h3>SignUp</h3>
              <form onSubmit={ e => {
                e.preventDefault();
                if(this.props.socket) {
                  
                  this.props.socket.send(JSON.stringify({
                    type: 'SIGNUP',
                    data: { 
                      email: this.state.email,
                      password: this.state.password
                    }
                  }))
                }
              }}>
                <p>Already have an account?<Link to="/login">Log in</Link></p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={ this.state.name }
                        onChange={ e => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={ this.state.username }
                        onChange={ e => this.setState({username: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={ this.state.email }
                        onChange={ e => this.setState({email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={ this.state.password }
                        onChange={ e => this.setState({password: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password (Again)</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={ this.state.passwordAgain }
                        onChange={ e => this.setState({passwordAgain: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" type="submit">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)