import React, { Component } from 'react';
import { Transition } from '@headlessui/react';
import firebase from 'firebase';

class ListNutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutes: [],
      userId: this.props.userId,
    };
  }

  componentDidMount() {
    const nutesRef = firebase.database().ref(`nutes/${this.state.userId}`);
    nutesRef.on('value', (snapshot) => {
      let nutes = snapshot.val();
      let newState = [];
      for (let nute in nutes) {
        newState.push({
          id: nute,
          nutle: nutes[nute].nutle,
          body: nutes[nute].body,
        });
      }
      this.setState({
        nutes: newState,
      });
    });
  }

  removeNute(nuteId) {
    const nuteRef = firebase.database().ref(`nutes/${this.state.userId}/${nuteId}`);
    nuteRef.remove();
  }

  render() {
    return (
      <div className="m-20 relative mt-4">
        <ul className="grid grid-3 gap-5">
          {this.state.nutes.length > 0 ? (
            this.state.nutes.map((nute) => {
              return (
                <Transition
                  show={true}
                  enter="transition ease-out duration-500 transform"
                  enterFrom="opacity-0 translate-y-300 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-400 tranform"
                  leaveFrom="opacity-100 scale-95"
                  leaveTo="opacity-0 scale-50"
                  appear={true}
                  key={nute.id}
                >
                  {(ref) => (
                    <li key={nute.id} ref={ref} className="text-center p-3 bg-black opacity-50">
                      <h3 className="text-xl">{nute.nutle}</h3>
                    </li>
                  )}
                </Transition>
              );
            })
          ) : (
            <h1>No Nutes yet</h1>
          )}
        </ul>
      </div>
    );
  }
}

export default ListNutes;
