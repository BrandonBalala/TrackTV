import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

/*import { Tasks } from '../api/tasks.js';*/

/*import Task from './Task.jsx';*/
/*import AccountsUIWrapper from './AccountsUIWrapper.jsx';*/

class App extends Component{
	constructor(props) {
		super(props);

		/*this.state = {
		  
		};*/
  	}

  	handleSubmit(event) {
	    event.preventDefault();

	    // Find the text field via the React ref
	    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

	    Meteor.call('shows.search', text);

	    // Clear form
	    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  	}

	render() {
		return (
			<strong>IN APP</strong>

			<div className="container">
		        <header>
		            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
		              <input
		                type="text"
		                ref="textInput"
		                placeholder="Enter show name..."
		              />
		            </form>
		        </header>
		    </div>
		    <div>
		    	{this.handleSubmit}
		    </div>
		);
	}
}

App.propTypes = {
/*  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser : PropTypes.object,*/
};

export default createContainer(() => {
  /*Meteor.subscribe('tasks');*/
  
  return {
/*    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser : Meteor.user(),*/
  };
}, App);