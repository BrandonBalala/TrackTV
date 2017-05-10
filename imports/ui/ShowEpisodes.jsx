import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
import smoothScroll from 'smoothscroll';


import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';

import Episode from './Episode.jsx';

@autobind
class ShowEpisodes extends Component{
	constructor(props) {
		super(props);
	}

	renderImdbLink(){
		var imdbId = this.props.show.imdbId;

		if(imdbId){
			var imdbURL = 'http://www.imdb.com/title/' + imdbId;
			return(
				<a href={imdbURL}><img src='/imdb-icon.png' height="35" /></a>
			);
		}
	}

	renderEpisodes(){
		var episodeSection = document.querySelector('.showEp');
		smoothScroll(episodeSection);

		if(this.props.episodeCount){
			return this.props.episodes.map((episode) => {
				return (
					<Episode 
					key={episode._id} 
					episode={episode} 
					/>
					);
			});
		}
		else{
			return (
				<p>No episodes found :(</p>
				);
			}
		}

		render(){
			return(
				<div className="container">
				<div>
				<h1>{this.props.show.name}</h1>
				<br/>
				<img src={this.props.show.imageSmallURL}/><br/>
				<div dangerouslySetInnerHTML={{ __html: this.props.show.summary }} />
				<br/>
				{this.renderImdbLink()}
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
		episodeCount: PropTypes.number.isRequired,
		episodes: PropTypes.array.isRequired,
	};

	export default createContainer((props) => {
		Meteor.subscribe('episodes');

		const showId = props.showId;

		return {
			show: Shows.findOne({_id: { $eq: showId } }),
			episodeCount: Episodes.find({showId: { $eq: showId } }).count(),
			episodes: Episodes.find({showId: { $eq: showId } }).fetch(),
		};
	}, ShowEpisodes)

