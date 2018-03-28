import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';

import { TrackedShows } from '../api/trackedshows.js';
import { Shows } from '../api/shows.js';

import ProfileShowTableItem from './ProfileShowTableItem.jsx';
import ShowEpisodes from './ShowEpisodes.jsx';

import smoothScroll from 'smoothscroll';
import { Table, Menu, Input, Header, Icon, Segment } from 'semantic-ui-react';

@autobind
class Profile extends Component{

	constructor(props) {
    super(props);

    this.state = {
      activeItem: 'all',
      activeShow: null,
    };
  }

  componentDidMount() {
    console.log('getUserAndShows');
  }

  handleItemClick(event, {id}){
    console.log('status: ' + id);
    this.setState({ activeItem: id });
  }

  modifyActiveShow(event){
    this.resetActiveShowSection();
    var showId = event.target.parentElement.id;
    ReactDOM.render(
      <Segment piled raised>
        <ShowEpisodes
          showId={showId}
        />
      </Segment>
      ,
      document.getElementById('activeShowSection')
    );

    var episodeSection = document.querySelector('.showEp');
    smoothScroll(episodeSection);
  }

  resetActiveShowSection(){
		console.log('IN resetActiveShowSection');
    var tempSection = document.getElementById('showEpisodesContainer');
		console.log(tempSection);

    if (tempSection != null) {
			console.log('resetActiveShowSection');
      ReactDOM.unmountComponentAtNode(tempSection);
    }
  }

  renderTableItems(){
    var trackedShows = this.filterShows();

    if(trackedShows.length == 0) {
      var msg = "No shows found in this category D:";
      if(!this.props.user){
        msg = "Log in to view your followed shows";
      }
      else if(this.state.activeItem == 'none'){
        msg = "Select category to display shows!";
      }

      return (
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="5" textAlign="center"><h3>{msg}</h3></Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }

    var cntr = 0;

    var shows = trackedShows.map((trackedShow) => {
      var showId = trackedShow.showId;
      cntr++;

      return (
        <ProfileShowTableItem
        cntr={cntr}
        key={trackedShow._id}
        trackedShow={trackedShow}
        showId={showId}
        modifyActiveShow={this.modifyActiveShow.bind(this)}
        />
      );
    });

    return (
      <Table.Body>
        { shows }
      </Table.Body>
    );
  }

  filterShows(){
    if(!this.props.user){
      return [];
    }

    var showsToDisplay = [];

    var status = this.state.activeItem;
    var shows = this.props.shows;
    console.log("shows:");
    console.log(shows);

    if(!shows.length) {
      return showsToDisplay;
    }

    if(status != 'all'){
      for (var i = 0; i < shows.length; i++) {
        if(shows[i].status == status){
          showsToDisplay.push(shows[i]);
        }
      }
    } else {
      showsToDisplay = shows;
    }

    console.log("showsToDisplay");
    console.log(showsToDisplay);

    return showsToDisplay;
  }

  render() {
    return (
			<div className="container">
				<Header as='h2' icon textAlign='center' className="profileHeader">
					<Icon name='user' circular />
					<Header.Content>
						{this.props.user ? "WELCOME " + this.props.user.username : "USER NOT FOUND"}
					</Header.Content>
				</Header>

				<Menu pointing>
					<Menu.Item id='all' name='all' active={this.state.activeItem === 'all'} onClick={this.handleItemClick.bind(this)} />
					<Menu.Item id='watching' name='currentlyWatching' active={this.state.activeItem === 'watching'} onClick={this.handleItemClick.bind(this)} />
					<Menu.Item id='planToWatch' name='planToWatch' active={this.state.activeItem === 'planToWatch'} onClick={this.handleItemClick.bind(this)} />
					{/*<Menu.Item id='dropped' name='dropped' active={this.state.activeItem === 'dropped'} onClick={this.handleItemClick.bind(this)} />*/}
					<Menu.Item id='onHold' name='onHold' active={this.state.activeItem === 'onHold'} onClick={this.handleItemClick.bind(this)} />
					<Menu.Item id='completed' name='completed' active={this.state.activeItem === 'completed'} onClick={this.handleItemClick.bind(this)} />
					<Menu.Menu position='right'>
						<Menu.Item>
							<Input icon='search' placeholder='Search...' />
						</Menu.Item>
					</Menu.Menu>
				</Menu>

				{this.props.shows ?
					<Table selectable compact>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>#</Table.HeaderCell>
								<Table.HeaderCell>Image</Table.HeaderCell>
								<Table.HeaderCell>Title</Table.HeaderCell>
								<Table.HeaderCell>Status</Table.HeaderCell>
								<Table.HeaderCell>Progress</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						{/*<div id="tableItems"></div>*/}
						{this.renderTableItems()}
					</Table>
					:
					<h2>No shows found</h2>
				}

				<div className="showEp">
					<div id="activeShowSection"></div>
				</div>
			</div>
     );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  shows: PropTypes.array,
};

export default createContainer((props) => {
  Meteor.subscribe('trackedShows');

  var user = Meteor.user();
  console.log('METEOR.USER()');
  console.log(user);

  if(user){
    var userId = user._id;
    return {
      user: user,
      shows: TrackedShows.find({ userId: { $eq: userId } }).fetch()
    };
  }

  return {
    user: null,
    shows: [],
  };
}, Profile);
