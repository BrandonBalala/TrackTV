import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';
import smoothScroll from 'smoothscroll';

import { Episodes } from '../api/episodes.js';
import { History } from '../api/history.js';

import Episode from './Episode.jsx';

import { Card, Image, Accordion, Icon, List, Button } from 'semantic-ui-react';

@autobind
class Season extends Component {
	constructor(props) {
		super(props);

		this.state = {episodes: []};
	}

  	markSeason(event){
  		let userId = this.props.currentUser._id;
  		let episodes = this.props.episodes;
  		let showId = this.props.showId;

  		
  		for (var i = 0; i < episodes.length; i++) {
  			var episodeId = episodes[i]._id;
		    Meteor.call('history.insert', userId, episodeId, showId, (error, result) => {});
  		}

  		console.log('done marking season');
  	}

  	unmarkSeason(event){
  		let userId = this.props.currentUser._id;
  		let episodes = this.props.episodes;
  		
  		for (var i = 0; i < episodes.length; i++) {
  			var episodeId = episodes[i]._id;
		    Meteor.call('history.remove', userId, episodeId, (error, result) => {});
  		}

  		console.log('done unmarking season');
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
		    	{ this.props.currentUser ? 
			    	<List.Item>
				      <List.Content floated='right'>
				      	<a onClick={this.markSeason.bind(this)}><b>Mark Season {this.props.season} as Watched </b></a> 
				      	|| 
				      	<a onClick={this.unmarkSeason.bind(this)}><b> Unmark Season {this.props.season}</b></a>
				      </List.Content>
				    </List.Item>
			    :
		    	'' }
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
