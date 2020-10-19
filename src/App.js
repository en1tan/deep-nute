import React, { Component } from "react";
import firebase, {auth, provider} from './firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      nutle: '',
      body: '',
      nutes: [],
      user: null,

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    // Firebase

  }

  // AuthFunctions
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const nutesRef = firebase.database().ref('nutes');
    this.setState({ canSubmit: true });
    const nute = {
      nutle: this.state.nutle,
      body: this.state.body,
      user: this.state.user.displayName || this.state.user.email
    }
    nutesRef.push(nute);
    this.setState({
      body: '',
      nutle: ''
    })
  }

  removeNute(nuteId) {
    const nuteRef = firebase.database().ref(`/nutes/${nuteId}`);
    nuteRef.remove();
  }

  componentDidMount() {
    const nutesRef = firebase.database().ref('nutes');
    nutesRef.on('value', (snapshot) => {
      let nutes = snapshot.val();
      let newState = [];
      for (let nute in nutes) {
        newState.push({
          id: nute,
          nutle: nutes[nute].nutle,
          body: nutes[nute].body
        });
      }
      this.setState({
        nutes: newState
      });
    });
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user, username: user.displayName });
      }
    })
  }
  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Deep Nute</h1>
            {this.state.user ?
              <button onClick={this.logout}>Log Out</button>
              :
              <button onClick={this.login}>Log In</button>
          }
          </div>
        </header>

        {this.state.user ?
          <div>
            <div className="user-profile">
              <img src={this.state.user.photoURL} alt={this.state.user.username} />
            </div>
            <div className="container">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="nutle" placeholder="Nutle..." value={this.state.nutle} onChange={this.handleChange}/>
                  <textarea name="body" placeholder="Body..." value={this.state.body} onChange={this.handleChange} ></textarea>
                  <button>Add Nute</button>
                </form>
              </section>
            <section className="display-item">
              <div className="wrapper">
                <ul>
                  {this.state.nutes.map((nute) => {
                    return (
                      <li key={nute.id}>
                        <h3>{nute.nutle}</h3>
                        <p>{nute.body}</p>
                        <p>
                          {nute.user === this.state.user.displayName || nute.user === this.state.user.email ?
                            <button onClick={() => this.removeNute(nute.id)}>Remove Nute</button> : null
                          }
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
                  </div>
          </div>
          :
          <div className="wrapper">
            <p>You must be logged in to see your nutes</p>
            </div>
      }
      </div>
    )
  }
}
export default App;