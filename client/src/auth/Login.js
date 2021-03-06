import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem('mernToken', result.data.token);
      this.setState({ success: true });
      this.props.updateUser();
    }).catch((error) => {
      console.log('error returned', error.response);
      this.props.setFlash('error', 'Invalid Credentials');
    });
  }

  render() {
    let form = '';
    if(this.props.user){
      return (<Redirect to="/search" />);
    }
    else {
      form = (<form onSubmit={this.handleSubmit}>
                <div>
                <h1>Come Skate With Us!</h1>
                <h3>Discover Secret Spots for $.99/mo</h3>
                  <input name="Email"
                       placeholder="Enter your email"
                       value={this.state.email}
                       onChange={this.handleEmailChange}
                  />
                </div>
                <div>
                  <input name="Password"
                       placeholder="Enter your password"
                       type="password"
                       value={this.state.password}
                       onChange={this.handlePasswordChange}
                  />
                </div>
                <input type="submit" value="Login" className="btn-primary" />
              </form>);
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default Login;
