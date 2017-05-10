import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';

import Episode from './Episode.jsx';

@autobind
class ShowEpisodes extends Component{
	constructor(props) {
		super(props);
	}

	renderEpisodes(){
		return this.props.episodes.map((episode) => {
			return (
				<Episode 
				key={episode._id} 
				episode={episode} 
				/>
				);
		});
	}

	render(){
		return(
			<div className="container" id="showEp">
			<div>
			<h1>{this.props.show.name}</h1><br/>
			<img src={this.props.show.imageSmallURL}/><br/>
			<div dangerouslySetInnerHTML={{ __html: this.props.show.summary }} />
			</div>

			<ul>
			{this.renderEpisodes()}
			</ul>
			</div>
			);
	}
}

ShowEpisodes.propTypes = {
	showId: PropTypes.string.isRequired,
	show: PropTypes.object.isRequired,
	episodes: PropTypes.array.isRequired,
};

export default createContainer((props) => {
	Meteor.subscribe('episodes');

	console.log(props.showId + "in show episodes");

	const showId = props.showId;

	return {
		show: Shows.findOne({_id: { $eq: showId } }),
		episodes: Episodes.find({showId: { $eq: showId } }).fetch(),
	};
}, ShowEpisodes)

