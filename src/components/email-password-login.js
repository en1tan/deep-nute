import React, { Component } from 'react';
import { auth, emailPasswordProvider } from '../firebase';

class EmailPasswordLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


    handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    }

    handleSubmit(e) {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        const user = result.user;
        this.setState({ user, userId: user.uid });
      }).catch((error) => {
          if (error.code.split('/')[1] === 'email-already-in-use') {
              auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((result) => {
                  const user = result.user;
        this.setState({ user, userId: user.uid });
              })
          }
      })
  }

  render() {
    return (
        <section className="mt-10 w-auto rounded rounded-md p-2 ml-20 mr-20 border border-4 border-gray shadow shadow-lg bg-gray-100">
            <h1 className="text-3xl text-center text-purple-500 uppercase">Sign In With Email & Password</h1>
        <form onSubmit={this.handleSubmit}>
                <input className="w-full mt-2 form-input border border-2 border-gray-500 placeholder-gray-800" type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                <input className="w-full mt-2 form-input border border-2 border-gray-500 placeholder-gray-800" type="password" name="password" placeholder="********" value={this.state.password} onChange={this.handleChange} />
                <button className="p-2 w-auto bg-white text-gray-700 border border-0 border-gray-500  hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md">Sign Up</button>&nbsp;|&nbsp;
          <button className="p-2 w-auto bg-white text-gray-700 border border-0 border-gray-500  hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md">Sign In</button>
        </form>
      </section>
    );
  }
}

export default EmailPasswordLogin;