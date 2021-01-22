import { Transition } from '@headlessui/react';
import React, { Component } from 'react';
import AddNute from './components/add-nute';
import ListNutes from './components/list-nutes';
import Login from './components/login';
import { Navbar } from './components/navbar';
import { auth } from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      userId: '',
      email: '',
      password: '',
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({ user: null });
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user, userId: user.uid });
      }
    });
  }
  render() {
    return (
      <div className="w-screen h-screen">
        {this.state.user ? (
          <Transition
            show={true}
            enter="transition ease-out duration-500 transform"
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
                <AddNute userId={this.state.userId} />
                <ListNutes userId={this.state.userId} />
              </div>
            )}
          </Transition>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}
export default App;
