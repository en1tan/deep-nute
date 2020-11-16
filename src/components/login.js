import React from 'react';
import { Component } from 'react';
import '../assets/css/login.css';
import { auth, provider } from '../firebase';
import MoonLoader from 'react-spinners/MoonLoader'

export default class Login extends Component {

    constructor(props) {
    super(props)
    this.state = {
        email: '',
        password: '',
        user: null,
        userId: '',
        loading: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickSignin = this.onClickSignin.bind(this);
    this.changeColors = this.changeColors.bind(this);
  }


    handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    }

    handleSubmit(e) {
        this.setState({ loading: true });
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
                                this.setState({ loading: false });
                    });
                }
            });

    }

    // Google SignIn
    onClickSignin() {
        this.setState({ loading: true });
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({ user, userId: user.uid, loading: false });
            });
    }

    changeColors() {
        const colors = ["yellow", "purple", "red", "white"]
        while (this.state.loading) {

            colors.map(color => {
                console.log(color);
                return color;
            });
        }
    }

    render() {
        return (
            <div className="md:flex md:flex-1 h-full login-page-bg p-10 md:p-6 lg:p-20 m-auto w-full">
                <div className="md:text-left w-64 mr-64"></div>
                <div className={`text-center w-auto ml-0 xl:ml-64 md:ml-0 sm:ml-0 blur-bg p-12 px-8 rounded-3xl border-2 border-white border-opacity-50 pt-20 bg-gradient-to-b from-transparent to-black`}>
                    {this.state.loading ?
                        <div className="absolute top-0 left-0 p-2">
                            <MoonLoader
                            size={40}
                            color={"white"}
                            />
                    </div>
                            :
                        <div className="text-blue opacity-50">
                            <i className="animate-bounce fa fa-pencil"></i>
                            </div>
                    }
                        <h1 className="text-white text-3xl">Sign In</h1>
                        <div className="mt-10">
                            <form onSubmit={this.handleSubmit}>
                                <input type="email" className="mb-6 py-4 lg:py-6 leading-tight w-full rounded-t-lg bg-white placeholder-gray-700 bg-opacity-50 hover:shadow-outline hover:outline-black px-2 focus:shadow-outline focus:outline-white" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} name="email" />
                                <input type="password" className="mb-8 py-4 lg:py-6 leading-tight w-full rounded-t-lg bg-white placeholder-gray-700 bg-opacity-50 hover:shadow-outline hover:outline-black px-2 focus:shadow-outline focus:outline-white" placeholder="********" value={this.state.password} onChange={this.handleChange} name="password" />
                                <button className="mb-6 inline-block align-baseline font-medium text-sm hover:text-yellow-200 text-yellow-500 float-right">Forgot Password?</button>
                                <button className="mb-24 w-full px-2 py-4 bg-white rounded-b-lg hover:bg-blue-600 hover:text-white text-sm shadow-lg">
                                    Connect
                        </button>
                            </form>
                    </div>
                                {/* <p className="mb-16 inline-block align-baseline font-medium text-sm text-white">
                            Don't have an account?&nbsp;
                            <a href="#" className="hover:text-yellow-200 text-yellow-500">Create New</a>
                        </p> */}
                                <p className="mb-10 inline-block lg:block align-baseline font-medium text-sm text-white">
                                    Or login with
                        </p>
                                <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 mr-0 xl:ml-64 md:grid-cols-3">
                                    <button onClick={this.onClickSignin} className="text-white hover:text-green-700 -mr-12"><i className="fa fa-google fa-2x"></i> </button>
                                    <button onClick={() => alert("Coming soon")} className="text-white hover:text-blue-700"><i className="fa fa-facebook fa-2x"></i></button>
                                    <button onClick={() => alert("Comin soon")} className="text-white hover:text-blue-200 -ml-12"><i className="fa fa-twitter fa-2x"></i></button>
                                </div>
                    </div>

            </div>
        );
    }
}