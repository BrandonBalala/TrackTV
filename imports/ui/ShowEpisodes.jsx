import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
/*import smoothScroll from 'smoothscroll';*/

import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';
import { TrackedShows } from '../api/trackedshows.js';

import Season from './Season.jsx';

import { Divider, Icon, Header, Grid, Segment, Image, Label, Button } from 'semantic-ui-react';

@autobind
class ShowEpisodes extends Component{
	constructor(props) {
		super(props);

		this.state = {seasons: []};
	}

	trackShow(event){
	    var showId = this.props.showId;
	    var userId = this.props.currentUser._id;

		var feedback = Meteor.call('trackedShows.insert',userId, showId);

	    ReactDOM.render(
	    	<div>
		        <Button size='tiny' color='blue'>Watch Later</Button>
				<Button size='tiny' color='yellow'>Put on Hold</Button>
				<Button size='tiny' color='red' onClick={this.removeShow.bind(this)}>Remove Show</Button>
    		</div>
	      ,
	      document.getElementById('showStatusButton')
	    );
	}

	removeShow(event){
	    var showId = this.props.showId;
	    var userId = this.props.currentUser._id;

		var feedback = Meteor.call('trackedShows.remove',userId, showId);

	    ReactDOM.render(
	    	<div>
		        <Button size='tiny' color='green' onClick={this.trackShow.bind(this)}>Track Show</Button>
    		</div>
	      ,
	      document.getElementById('showStatusButton')
	    );
	}

	renderShowStatusButton(){

	    var trackedShows = this.props.trackedShows;
	    var isLoggedIn = Meteor.userId();

		ReactDOM.render(
			<div>
			{ isLoggedIn ? (
				<Button size='tiny' color='green' onClick={this.trackShow.bind(this)}>Track Show</Button>
			) : (
				<Button size='tiny' color='green' disabled='true'>Track Show, Login First</Button>
			)}
			</div>
	      	,
	      	document.getElementById('showStatusButton')
	    );
	}

	renderGenre(){
		return this.props.show.genres.map(
			(genre) =>
			{
				return(
					<Label as='a' size='tiny'>{genre}</Label>
				);
			}
			);
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
		this.renderShowStatusButton();
	}

	
	componentWillReceiveProps(nextProps){
		console.log('update');
		var showId = nextProps.showId;
		var apiId = nextProps.show['apiId'];

		this.updateListOfEpisodes(showId, apiId);
		this.getSeasonList(showId);
		this.renderShowStatusButton();
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

				<Grid>
				    <Grid.Column width={4}>
				      <Image src={this.props.show.imageSmallURL} shape='rounded' centered />
				    </Grid.Column>
				    <Grid.Column width={9}>
				      	<h1>{this.props.show.name}</h1>
			          	<div dangerouslySetInnerHTML={{ __html: this.props.show.summary }} />
			          	<br/>
			          	<div id='showStatusButton'></div>
				    </Grid.Column>
				    <Grid.Column width={3}>
				    	<Label.Group tag>
				    		{this.renderGenre()}
				    	</Label.Group>
				    	<br/>
  			          	{this.renderImdbLink()}
				    </Grid.Column>
			  	</Grid>
		  	<br/>
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
	currentUser: PropTypes.object,
	trackedShows: PropTypes.object,
};

export default createContainer((props) => {
	Meteor.subscribe('episodes');
	Meteor.subscribe('trackedShows');

	const userId = Meteor.userId();
	const showId = props.showId;

	return {
		show: Shows.findOne({_id: { $eq: showId } }),
		currentUser: Meteor.user(),
		trackedShows: TrackedShows.findOne({$and: [{userId: { $eq: userId } }, {showId: { $eq: showId }}]}),
	};
}, ShowEpisodes)

