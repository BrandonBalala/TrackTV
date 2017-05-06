import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows, ShowGenres, ShowDays } from '../api/shows.js';

import Show from './Show.jsx';
/*import AccountsUIWrapper from './AccountsUIWrapper.jsx';*/

class App extends Component{
	constructor(props) {
		super(props);

		/*this.state = {
		  
		};*/
  	}

  	handleSubmit(event){
  		event.preventDefault();

	    // Find the text field via the React ref
	    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

	    Meteor.call('shows.search', text);

	    // Clear form
	    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  	}

  	renderEpisodes() {
  		return this.props.shows.map((show) => {
  			return (
  				<Show 
  					key={show._id} 
  					show={show} 
  				/>
  			);
  		});
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
          			{this.renderEpisodes()}
        		</ul>
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