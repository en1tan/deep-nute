import React, { Component } from "react";
import { Transition } from '@headlessui/react';
import firebase from 'firebase';


class ListNutes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nutes: [],
      userId: this.props.userId
    }
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
        nutes: newState
      });
    });
  }
  compo

  removeNute(nuteId) {
    const nuteRef = firebase.database().ref(`nutes/${this.state.userId}/${nuteId}`);
    nuteRef.remove();
  }


  render() {
    return (
      <section className="mt-10 rounded rounded-md p-2 ml-20 mr-20 border border-4 border-gray shadow shadow-lg bg-gray-100">
        <div className="m-20 relative mt-4">
          <ul className="flex m-4 justify-center w-56">
            {this.state.nutes.length > 0 ?
              this.state.nutes.map((nute) => {
                return (
                  <Transition
                    show={true}
                    enter="transition ease-out duration-300 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-400 tranform"
                    leaveFrom="opacity-100 scale-95"
                    leaveTo="opacity-0 scale-50"
                    appear={true}
                    key={nute.id}
                  >
                    {(ref) => (
                      <li ref={ref} key={nute.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto bg-gray-300 p-2 rounded rounded-md border border-4 border-gray-600 shadow-md block">
                        <h3 className={`rounded sm:text-xs rounded-lg h-10 pt-2 align-middle text-lg text-center font-bold bg-gray-100 shadow shadow-md ${nute.nutle !== "" ? "block" : "hidden"}`}>{nute.nutle}</h3>
                        <p className="text-xl p-2">{nute.body}</p>
                        <p>
                          <button className="text-xs float-right relative origin-bottom-right right-0 p-1 w-auto bg-white text-gray-700 border border-0 border-gray-500  hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md" onClick={() => this.removeNute(nute.id)}>Remove Nute</button>
                        </p>
                      </li>
                    )}
                  </Transition>
                )
              })
              :
            <h1>No Nutes yet</h1>
              }
              </ul>
        </div>
        </section>
        );
  }
}

export default ListNutes;