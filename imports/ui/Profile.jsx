import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';

import { TrackedShows } from '../api/trackedshows.js';
import { Shows } from '../api/shows.js';

import ProfileShowTable from './ProfileShowTable.jsx';

import { Table, Menu, Input } from 'semantic-ui-react';

@autobind
class Profile extends Component{

	constructor(props) {
    super(props);

    this.state = {
      activeItem: 'all',
      user: null,
      shows: new Array(),
    };
  }

  componentDidMount() {
    console.log('getUserAndShows');
    this.getUserAndShows();
  }

  getUserAndShows() {
    var username = this.props.params.username;
    console.log('username: ' + username);
    var shows = new Array();
    var user = null;

    if(username){
      console.log('CASE 1');
      Meteor.call('trackedShows.getUser', username, (error, result) => {
        console.log('CASE 1');

        if(result){
          this.setState({
            user: result,
            /*shows: TrackedShows.find({ userId: { $eq: result._id } }).fetch()*/
            }
          , this.updateShowTable()
          );

          console.log('USER');
          console.log(this.state.user);
/*          console.log('SHOWS');
          console.log(this.state.shows);*/
        }
      });
    }
    else {
      console.log(this.props.user);
      console.log(Meteor.user());
      if(this.props.user){
        user = this.props.user;
        /*shows =  TrackedShows.find({ userId: { $eq: user._id } }).fetch();*/
        console.log('CASE 2');
      }
      else{
        console.log('CASE 3');
      }

      this.setState({
        user: user,
        /*shows: shows*/
        }
      , this.updateShowTable()
      );
    }

      console.log('USER');
      console.log(this.state.user);
      /*console.log('SHOWS');
      console.log(this.state.shows);*/
  }

  handleItemClick(event, {id}){
    console.log(id);
    this.setState({ activeItem: id }
    , this.updateShowTable()
    );
  }

  updateShowTable(){
    console.log('a');
    if(!this.state.user){
      console.log('b');
      ReactDOM.render(
        <h2>USER NOT FOUND</h2>
        ,
        document.getElementById('showTable')
      );
      console.log('c');
    }

    console.log('d');
    var showsToDisplay = this.filterShows();
    console.log('e');
    if(!showsToDisplay){
      console.log('f');
      ReactDOM.render(
        <h2>NO SHOWS FOUND</h2>
        ,
        document.getElementById('showTable')
      );
      console.log('g');
    }
    console.log('h');
    ReactDOM.render(
      <ProfileShowTable
        user={this.state.user}
        activeItem={this.state.activeItem}
      />
      ,
      document.getElementById('showTable')
    );
    console.log('i');

  }

  filterShows(){
    var showsToDisplay = [];

    var status = this.state.activeItem;
    var shows = this.state.shows;
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
     <h1>PROFILE: {this.state.user ? this.state.user.username : "USER NOT FOUND"}</h1>

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

      <div id="showTable"></div>
      </div>
     );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

export default createContainer((props) => {
  Meteor.subscribe('trackedShows');

  console.log('METEOR.USER()');
  console.log(Meteor.user());

  return {
    user: Meteor.user()
  };
}, Profile);