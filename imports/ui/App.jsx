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

	render() {
		return (
			<strong>IN APP</strong>
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