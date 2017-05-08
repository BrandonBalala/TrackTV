import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
/*import { composeWithTracker } from 'react-komposer';*/

import { Shows } from '../api/shows.js';

import Show from './Show.jsx';
/*import AccountsUIWrapper from './AccountsUIWrapper.jsx';*/

class App extends Component{
	constructor(props) {
		super(props);

		this.state = {
		  activeShow: null,
		};
 }

handleSubmit(event){
  event.preventDefault();

	    // Find the text field via the React ref
	    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

	    Meteor.call('shows.search', text);

	    // Clear form
	    ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }

   renderShows() {
    return this.props.shows.map((show) => {
     return (
      <Show 
      key={show._id} 
      show={show} 
      />
      );
   });
  }

  renderEpisodes(){
    /*const activeShow = this.state.activeShow;*/

    if(this.state.activeShow) {
      return (
        <p>SHOW PICKED: {activeShow}</p>
        );
    }
    else {
      return (
        <p>NO SHOWS PICKED</p>
        );
    }
  }

  render() {
    return (
     <div className="container">
     <header>
     <h1>IN APP</h1>
     <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
     <input
     type="text"
     ref="textInput"
     placeholder="Type to add new shows"
     />		
     </form>
     </header>

     <ul>
     {this.renderShows()}
     </ul>

     <div>
     {this.renderEpisodes()}
     </div>
     </div>
     );
  }
}

App.propTypes = {
  shows: PropTypes.array.isRequired,

};

export default createContainer(() => {
  Meteor.subscribe('shows');
  
  return {
    shows: Shows.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);