import { Transition } from "@headlessui/react";
import React, { Component } from "react";
import AddNute from "./components/add-nute";
import ListNutes from "./components/list-nutes";
import Login from "./components/login";
import { Navbar } from './components/navbar';
import {auth, provider} from './firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      userId: '',
      email: '',
      password: ''
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({ user: null })
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user, userId: user.uid });
      }
    })
  }
  render() {
    return (
      <div className="w-screen h-screen">
      {this.state.user ?
          <Transition
          show={true}
                  enter="transition ease-out duration-300 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-100 tranform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                  className="mx-2"
          >
            {(ref) => (
              <div ref={ref}>
              <Navbar user={this.state.user} logout={this.logout} />
          <div>
            <div className="container">
                <AddNute userId={this.state.userId} />
                <ListNutes userId={this.state.userId} />
            </div>
          </div>
          </div>
            )}
            </Transition>
          :
        <Login />
          //<div className="mt-48 w-full h-screen align-middle text-center bg-gradient-to-b from-white to-purple-500">
            //<p className="text-4xl">You must be logged in to see your nutes</p>
            //<button className="text-xl p-2 w-auto bg-white text-gray-700 border border-0 border-gray-500 hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md" onClick={this.login}>Login With Google</button>
            //<br />
           // <EmailPasswordLogin />
          //  </div>
      }
      </div>
    )
  }
}
export default App;