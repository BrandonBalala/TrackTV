import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
/*import smoothScroll from 'smoothscroll';*/

import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';

import Season from './Season.jsx';

import { Divider, Icon, Header } from 'semantic-ui-react';

@autobind
class ShowEpisodes extends Component{
	constructor(props) {
		super(props);

		this.state = {seasons: []};
	}

	renderImdbLink(){
		var imdbId = this.props.show.imdbId;

		if(imdbId){
			var imdbURL = 'http://www.imdb.com/title/' + imdbId;
			return(
				<a href={imdbURL}><Icon name='video' size='huge'/></a>
				);
		}
	}

	renderSeasons(){
		return this.state.seasons.map(
			(season) => 
			{
				var showId = this.props.showId;

				return(
						//acordion
						<Season
						key={season}
						season={season}
						showId={showId}
						/>
						);
			}
			);
	}

	componentDidMount(){
		var showId = this.props.showId;
		var apiId = this.props.show['apiId'];
		this.updateListOfEpisodes(showId, apiId);
		this.getSeasonList(showId);
	}

	
	componentWillReceiveProps(nextProps){
		console.log('update');
		var showId = nextProps.showId;
		var apiId = nextProps.show['apiId'];

		this.updateListOfEpisodes(showId, apiId);
		this.getSeasonList(showId);
	}

	getSeasonList(showId){
		Meteor.call('episodes.getUniqueField', "season", showId, (error, result) => {
			this.setState({seasons: result});
		});
	}

	updateListOfEpisodes(showId, apiId){
		Meteor.call('episode.update', showId, apiId);
	}

	render(){
		return(
			<div>
			<div>
			<h1>{this.props.show.name}</h1>
			<br/>
			<img src={this.props.show.imageSmallURL}/><br/>
			<div dangerouslySetInnerHTML={{ __html: this.props.show.summary }} />
			<br/>
			{this.renderImdbLink()}
			</div>

			<div>
			{this.renderSeasons()}
			</div>
			</div>
		);
	}
}

ShowEpisodes.propTypes = {
	showId: PropTypes.string.isRequired,
	show: PropTypes.object.isRequired,
};

export default createContainer((props) => {
	Meteor.subscribe('episodes');

	const showId = props.showId;

	return {
		show: Shows.findOne({_id: { $eq: showId } }),
	};
}, ShowEpisodes)

