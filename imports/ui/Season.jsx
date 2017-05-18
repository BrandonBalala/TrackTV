import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';
import smoothScroll from 'smoothscroll';

import { Episodes } from '../api/episodes.js';

import Episode from './Episode.jsx';

import { Card, Image, Accordion } from 'semantic-ui-react';

@autobind
class Season extends Component {
	constructor(props) {
		super(props);

		this.state = {episodes: []};
	}

	renderEpisodes(){
		var episodeSection = document.querySelector('.showEp');
		smoothScroll(episodeSection);

		var season = this.props.season;
		var episodes = this.props.episodes;

		if(episodes){
			console.log(episodes)
			console.log("episodes found");
			return episodes.map((episode) => {
				return (
					<div>
					<Episode 
					key={episode._id} 
					episode={episode} />
					</div>
					);
			});
		}
	}

	render(){
		return(
			<div>
			<h3>Season {this.props.season}</h3>
			{this.renderEpisodes()}
			</div>
			);

	}
}


Season.propTypes = {
	season: PropTypes.number.isRequired,
	showId: PropTypes.string.isRequired,
	episodes: PropTypes.array.isRequired,
};

export default createContainer((props) => {
	const season = props.season;
	const showId = props.showId;

	console.log("In createContainer: " + season + " " + showId);

	return {
		episodes: Episodes.find({ $and: [{showId: { $eq: showId } }, {season: { $eq:  season }}] }).fetch(),
		/*episodes: Episodes.find({ $and: [ {_id: { $eq: showId } }, {season: { $eq: season }}] }).fetch(),*/
	};
}, Season)	
