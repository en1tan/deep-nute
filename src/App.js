import { Transition } from "@headlessui/react";
import React, { Component } from "react";
import { Navbar } from './components/navbar';
import firebase, {auth, provider} from './firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      nutle: '',
      body: '',
      nutes: [],
      user: null,
      userId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // AuthFunctions
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({user, userId: user.uid});
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({ user: null });
        this.setState({nutes: []})
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const nutesRef = firebase.database().ref(`nutes/${this.state.userId}`);
    const nute = {
      nutle: this.state.nutle,
      body: this.state.body
    }
    nutesRef.push(nute);
    this.setState({
      body: '',
      nutle: ''
    })
  }

  removeNute(nuteId) {
    const nuteRef = firebase.database().ref(`nutes/${this.state.userId}/${nuteId}`);
    nuteRef.remove();
  }

  componentDidMount() {
    const nutesRef = firebase.database().ref(`nutes/${this.state.userId}`);
    nutesRef.on('value', (snapshot) => {
      let nutes = snapshot.val()[this.state.userId];
      let newState = [];
      for (let nute in nutes) {
        newState.push({
          id: nute,
          nutle: nutes[nute].nutle,
          body: nutes[nute].body,
        });
      }
      this.setState({
        nutes: newState
      });
    });
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user, userId: user.uid });
      }
    })
  }
  render() {
    return (
      <div onClick={this.toggleMenu}>
      {this.state.user ?
        <>
        <header>
          <Navbar user={this.state.user} logout={this.logout} />
        </header>

          <div>
            <div className="pt-4 flex flex-wrap justify-center h-auto bg-gradient-to-b from-purple-200 to-purple-400">
              <section className="w-full rounded rounded-md p-2 ml-20 mr-20 border border-4 border-gray shadow shadow-lg bg-gray-100">
                <form onSubmit={this.handleSubmit}>
                  <input className="w-full mt-2 form-input border border-2 border-gray-500 placeholder-gray-800" type="text" name="nutle" placeholder="Nutle..." value={this.state.nutle} onChange={this.handleChange}/>
                  <textarea className="w-full mt-2 form-textarea border border-2 border-gray-500 placeholder-gray-800" name="body" placeholder="Body..." value={this.state.body} onChange={this.handleChange} ></textarea>
                  <button className="p-2 w-auto bg-white text-gray-700 border border-0 border-gray-500  hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md">Add Nute</button>
                </form>
              </section>
              <section>
              <div className="m-20 relative mt-4">
                <ul className="grid grid-cols-4 justify-center">
                  {this.state.nutes.map((nute) => {
                    return (
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

                          <li ref={ref} key={nute.id} className="col-auto h-auto w-full bg-gray-300 m-2 p-2 rounded rounded-md border border-4 border-gray-600 shadow-md">
                            <h3 className={`rounded rounded-lg h-10 pt-2 align-middle text-lg text-center font-bold bg-gray-100 shadow shadow-md ${nute.nutle !== "" ? "block" : "hidden"}`}>{nute.nutle}</h3>
                        <p className="text-xl p-2">{nute.body}</p>
                        <p>
                            <button className="text-xs float-right relative origin-bottom-right right-0 p-1 w-auto bg-white text-gray-700 border border-0 border-gray-500  hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md" onClick={() => this.removeNute(nute.id)}>Remove Nute</button>
                        </p>
                      </li>
                        )}
                      </Transition>
                    )
                  })}
                </ul>
              </div>
              </section>
            </div>
          </div>
            </>
          :
          <div className="mt-20 w-full h-full align-middle text-center">
            <p className="text-4xl">You must be logged in to see your nutes</p>
            <button className="text-xl p-2 w-auto bg-white text-gray-700 border border-0 border-gray-500 hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md" onClick={this.login}>Login With Google</button>
            </div>
      }
      </div>
    )
  }
}
export default App;