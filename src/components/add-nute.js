import React, { Component } from 'react';
import firebase from 'firebase';

class AddNute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nutle: '',
      body: '',
     userId: this.props.userId
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

  render() {
    return (
      <section className="mt-10 w-auto rounded rounded-md p-2 ml-20 mr-20 border border-4 border-gray shadow shadow-lg bg-gray-100">
        <form onSubmit={this.handleSubmit}>
          <input className="w-full mt-2 form-input border border-2 border-gray-500 placeholder-gray-800" type="text" name="nutle" placeholder="Nutle..." value={this.state.nutle} onChange={this.handleChange} />
          <textarea className="w-full mt-2 form-textarea border border-2 border-gray-500 placeholder-gray-800" name="body" placeholder="Body..." value={this.state.body} onChange={this.handleChange} ></textarea>
          <button className="p-2 w-auto bg-white text-gray-700 border border-0 border-gray-500  hover:border-2 hover:border-white hover:bg-gray-700 hover:text-white rounded rounded-md">Add Nute</button>
        </form>
      </section>
    );
  }
}

export default AddNute;