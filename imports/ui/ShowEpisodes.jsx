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

import { Divider, Icon, Header, Grid, Segment, Image, Label, Button, Dimmer, Loader } from 'semantic-ui-react';

@autobind
class ShowEpisodes extends Component{
	constructor(props) {
		super(props);

		this.state = {seasons: []};
	}

	trackShow(event){
	    var showId = this.props.showId;
	    var userId = this.props.currentUser._id;

		var feedback = Meteor.call('trackedShows.insert',userId, showId, (error, result) => {
			if(result){
				console.log('result: ' + result);
				this.renderShowStatusButton("watching");
			}
		});
	}

	removeShow(event){
	    var showId = this.props.showId;
	    var userId = this.props.currentUser._id;

		var feedback = Meteor.call('trackedShows.remove',userId, showId,(error, result) => {
			if(result){
				console.log('result: ' + result);
				this.renderShowStatusButton();
			}
		});
	}

	currentlyWatchingShow(event){
	    var showId = this.props.showId;
	    var userId = this.props.currentUser._id;

		var feedback = Meteor.call('trackedShows.update',userId, showId, 'watching', (error, result) => {
			if(result){
				console.log('result: ' + result);
				this.renderShowStatusButton('watching');
			}
		});
	}

	planToWatchShow(event){
	    var showId = this.props.showId;
	    var userId = this.props.currentUser._id;

		var feedback = Meteor.call('trackedShows.update',userId, showId, 'planToWatch', (error, result) => {
			if(result){
				console.log('result: ' + result);
				this.renderShowStatusButton('planToWatch');
			}
		});
	}

	onHoldShow(event){
	    var showId = this.props.showId;
	    var userId = this.props.currentUser._id;

		var feedback = Meteor.call('trackedShows.update',userId, showId, 'onHold', (error, result) => {
			if(result){
				console.log('result: ' + result);
				this.renderShowStatusButton('onHold');
			}
		});
	}

	renderTrackShowBtn(){
		return (
			<Button size='tiny' color='green' onClick={this.trackShow.bind(this)}>Track Show</Button>
		);
	}

	renderCurrentlyWatchingShowBtn(status){
		if(status != 'watching'){
			return (
				<Button size='tiny' color='green' onClick={this.currentlyWatchingShow.bind(this)}>Currently Watching</Button>
			);
		}
	}

	renderWatchLaterBtn(status){
		if(status != 'planToWatch'){
			return (
				<Button size='tiny' color='blue' onClick={this.planToWatchShow.bind(this)}>Watch Later</Button>
			);
		}
	}

	renderPutOnHoldBtn(status){
		if(status != 'onHold'){
			return (
				<Button size='tiny' color='yellow' onClick={this.onHoldShow.bind(this)}>Put on Hold</Button>
			);
		}
	}

	renderDroppedBtn(status){
		if(status != 'dropped'){
			return (
				<Button size='tiny' color='red' onClick={this.removeShow.bind(this)}>Remove Show</Button>
			);
		}
	}

	renderShowStatusButton(status){
	    /*var trackedShows = this.props.trackedShows;*/
	    var isLoggedIn = Meteor.userId();

/*	    let trackShowBtn = null;
	    let currentlyWatchingBtn = null;
	    let watchLaterBtn = null;
	    let putOnHoldBtn = null;
	    let droppedBtn = null;

	    if(!isLoggedIn){
	    	trackShowBtn = <Button size='tiny' color='green' disabled='true'>Track Show, Login First</Button>;
	    } else{
	    	//watching, planToWatch, completed, dropped, onHold
	    	if(status == '')

	    }*/


		ReactDOM.render(
			<Segment compact='true'>
				{ !isLoggedIn ? (
					<Button size='tiny' color='green' disabled='true'>Track Show, Login First</Button>
				) : (
					''
				)}

				{ (status && isLoggedIn) ? (
					<div>
						{ this.renderCurrentlyWatchingShowBtn(status) }
						{ this.renderWatchLaterBtn(status) }
						{ this.renderPutOnHoldBtn(status) }
						{ this.renderDroppedBtn(status) }
					</div>
				) : (
					''
				)}

				{ (!status && isLoggedIn) ? (
					<div>
						{ this.renderTrackShowBtn() }
					</div>
				) : (
					''
				)}
			</Segment>
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
				<a href={imdbURL}><Icon name='video' size='large'/></a>
				);
		}
	}

	renderSeasons(){
		return this.state.seasons.map(
			(season) => 
			{
				var showId = this.props.showId;
				var trackedShow = this.props.trackedShows ? true : false;

				return(
						//acordion
						<Season
						key={season}
						season={season}
						showId={showId}
						trackedShow={trackedShow}
						/>
						);
			}
			);
	}

	componentDidMount(){
		console.log('componentDidMount');

		var showId = this.props.showId;
		var apiId = this.props.show['apiId'];

		if(this.props.trackedShows)
			this.renderShowStatusButton(this.props.trackedShows.status);
		else
			this.renderShowStatusButton();

		/*this.updateListOfEpisodes(showId, apiId);*/
		this.getSeasonList(showId);
	}
	
	componentWillReceiveProps(nextProps){
		console.log('componentWillReceiveProps');

		var showId = nextProps.showId;
		var apiId = nextProps.show['apiId'];

		if(nextProps.trackedShows)
			this.renderShowStatusButton(nextProps.trackedShows.status);
		else
			this.renderShowStatusButton();

		this.getSeasonList(showId);
	}

	getSeasonList(showId){
		Meteor.call('episodes.getUniqueField', "season", showId, (error, result) => {
			this.setState({seasons: result});
		});
	}

	render(){
		return(
			<div>
					<Grid>
					    <Grid.Column width={4}>
					      <Image src={this.props.show.imageSmallURL} shape='rounded' bordered='true' centered />
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

	Meteor.call('shows.update', showId, (error, result) => {
      	if(!error){
      		console.log("done updating");
		}
	});

	return {
		show: Shows.findOne({_id: { $eq: showId } }),
		currentUser: Meteor.user(),
		trackedShows: TrackedShows.findOne({$and: [{userId: { $eq: userId } }, {showId: { $eq: showId }}]}),
	};
}, ShowEpisodes)

