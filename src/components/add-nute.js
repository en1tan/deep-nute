import React, { Component } from 'react';
import firebase from 'firebase';
import Modal from './modal';

class AddNute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutle: '',
      body: '',
      userId: this.props.userId,
      shoModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(!this.state.showModal);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const nutesRef = firebase.database().ref(`nutes/${this.state.userId}`);
    const nute = {
      nutle: this.state.nutle,
      body: this.state.body,
    };
    nutesRef.push(nute);
    this.setState({
      body: '',
      nutle: '',
    });
  }

  render() {
    return (
      <>
        <section className="mt-10 w-auto rounded-md p-2 ml-20 mr-20 border-4 border-gray shadow-lg bg-gray-100">
          <form onSubmit={this.handleSubmit}>
            <input
              className="w-full mt-2 form-input border-2 border-gray-500 placeholder-gray-800"
              type="text"
              name="nutle"
              placeholder="Nutle..."
              value={this.state.nutle}
              onChange={this.handleChange}
            />
            <textarea
              className="w-full mt-2 form-textarea border-2 border-gray-500 placeholder-gray-800"
              name="body"
              placeholder="Body..."
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
            <button className="p-2 w-auto bg-white text-gray-700 border-0 border-gray-500  hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded-md">
              Add Nute
            </button>
          </form>
          <Modal />
        </section>
        <div className="fixed bottom-0 right-0">
          <button className="p-4 bg-purple-400 rounded-tl-full text-6xl">+</button>
        </div>
      </>
    );
  }
}

export default AddNute;
