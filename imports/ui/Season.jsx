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

import { Card, Image, Accordion, Icon, List } from 'semantic-ui-react';

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
		var trackedShow = this.props.trackedShow;
		var showId = this.props.showId;

		if(episodes){
			return episodes.map((episode) => {
				return (
					<Episode 
					key={episode._id} 
					episode={episode}
					trackedShow={trackedShow}
					showId={showId} />
					);
			});
		}
	}

	render(){
		return(
			<Accordion exclusive={false} fluid>

			<Accordion.Title>
		      <Icon name='dropdown' />
		      Season {this.props.season}
		    </Accordion.Title>

		    <Accordion.Content>
		    <List animated divided relaxed verticalAlign='middle'>
			{this.renderEpisodes()}
			</List>
			</Accordion.Content>

			</Accordion>
			);

	}

	componentDidMount(){
		this.initAccordions();
	}

	initAccordions(){
		$('.ui.accordion').accordion();
	}
}


Season.propTypes = {
	season: PropTypes.number.isRequired,
	showId: PropTypes.string.isRequired,
	trackedShow: PropTypes.bool.isRequired,
	episodes: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};

export default createContainer((props) => {
	const season = props.season;
	const showId = props.showId;

	return {
		episodes: Episodes.find({ $and: [{showId: { $eq: showId } }, {season: { $eq:  season }}] }).fetch(),
		currentUser: Meteor.user(),
	};
}, Season)	
