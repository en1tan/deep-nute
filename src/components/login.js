import React from 'react';
import { Component } from 'react';
import '../assets/css/login.css';
import { auth, provider } from '../firebase';

export default class Login extends Component {

    constructor(props) {
    super(props)
    this.state = {
      email: '',
        password: '',
        user: null,
        userId: ''
    }
    this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
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

    // Google SignIn
    googleSignIn() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({ user, userId: user.uid });
            });
    }

    render() {
        return (
            <div className="h-full login-page-bg p-10 md:p-6 lg:p-20 text-center m-auto">
                <div className="blur-bg h-full p-12 px-8 rounded-3xl border-2 border-white border-opacity-50 pt-20 bg-gradient-to-b from-transparent to-black">
                    <h1 className="text-white text-3xl">Welcome</h1>
                    <div className="mt-10">
                        <form onSubmit={this.handleSubmit}>
                            <input type="email" className="mb-6 py-4 lg:py-6 leading-tight w-full rounded-t-lg bg-white placeholder-gray-700 bg-opacity-50 hover:shadow-outline hover:outline-black px-2 focus:shadow-outline focus:outline-white" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                            <input type="password" className="mb-8 py-4 lg:py-6 leading-tight w-full rounded-t-lg bg-white placeholder-gray-700 bg-opacity-50 hover:shadow-outline hover:outline-black px-2 focus:shadow-outline focus:outline-white" placeholder="********" value={this.state.password} onChange={this.handleChange}/>
                            <button className="mb-6 inline-block align-baseline font-medium text-sm hover:text-yellow-200 text-yellow-500 float-right">Forgot Password?</button>
                            <button className="mb-24 w-full px-2 py-4 bg-white rounded-2xl hover:bg-blue-600 hover:text-white text-sm shadow-lg">
                                Log in
                        </button>
                            {/* <p className="mb-16 inline-block align-baseline font-medium text-sm text-white">
                            Don't have an account?&nbsp;
                            <a href="#" className="hover:text-yellow-200 text-yellow-500">Create New</a>
                        </p> */}
                            <p className="mb-10 inline-block lg:block align-baseline font-medium text-sm text-white">
                                Or login with
                        </p>
                            <div className="grid grid-cols-3 lg:grid-cols-6 mr-0 lg:ml-64">
                                <button onClick={this.googleSignIn} className="text-white hover:text-green-700 -mr-12"><i className="fa fa-google fa-2x"></i> </button>
                                <div className="text-white hover:text-blue-700"><i className="fa fa-facebook fa-2x"></i></div>
                                <div className="text-white hover:text-blue-200 -ml-12"><i className="fa fa-twitter fa-2x"></i></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}