import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';

import { TrackedShows } from '../api/trackedshows.js';
import { Shows } from '../api/shows.js';

import ProfileShowTableItem from './ProfileShowTableItem.jsx';

import { Table, Menu, Input } from 'semantic-ui-react';

@autobind
class Profile extends Component{

	constructor(props) {
    super(props);

    this.state = {
      activeItem: 'all',
    };

  }

  handleItemClick(event, {id}){
    console.log(id);
    this.setState({ activeItem: id });
/*    this.updateTableItems();*/
  }

/*  componentDidMount(){
    this.updateTableItems();
  }*/

/*  updateTableItems(){

    var showsToDisplay = [];

    var status = this.state.activeItem;
    console.log(status);
    const shows = this.props.shows;
    console.log("shows:");
    console.log(shows);

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
    if(showsToDisplay.length){
      var cntr = 0;

      ReactDOM.render(
          showsToDisplay.map((trackedShow) => {
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
          })
          ,
          document.getElementById('tableItems')
      );
    }
  }*/


  renderTableItems(){
    var showsToDisplay = [];

    var status = this.state.activeItem;
    console.log(status);
    const shows = this.props.shows;
    console.log("shows:");
    console.log(shows);

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
    if(showsToDisplay.length){
      var cntr = 0;

      return showsToDisplay.map((trackedShow) => {
        var showId = trackedShow.showId;
        /*var show = Shows.findOne({_id: { $eq: showId }});*/
        cntr++;
/*        console.log(cntr);
        console.log(show);*/
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
    }
  }

  modifyActiveShow(event){
/*    var activeShow = event.target.id;

    console.log("a1");

    ReactDOM.render(
          <Segment piled raised>
          <ShowEpisodes 
          showId={activeShow}
          />
          </Segment>
          ,
          document.getElementById('activeShowSection')
        );

     var episodeSection = document.querySelector('.showEp');
        console.log("a5");
        smoothScroll(episodeSection);*/
  }

  render() {
    return (
     <div className="container">
     <h1>TEST</h1>

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

        <Table.Body>
        {/*<div id="tableItems"></div>*/}
        {this.renderTableItems()}
        </Table.Body>
      </Table>

     {/*<div id="showTable"></div>*/}
     {/*this.renderTable()*/}


     {/*<Table selectable>
     <Table.Header>
     <Table.Row>
     <Table.HeaderCell>Name</Table.HeaderCell>
     <Table.HeaderCell>Status</Table.HeaderCell>
     <Table.HeaderCell>Notes</Table.HeaderCell>
     </Table.Row>
     </Table.Header>

     <Table.Body>
     <Table.Row>
     <Table.Cell>John</Table.Cell>
     <Table.Cell>No Action</Table.Cell>
     <Table.Cell>None</Table.Cell>
     </Table.Row>
     <Table.Row>
     <Table.Cell>Jamie</Table.Cell>
     <Table.Cell>Approved</Table.Cell>
     <Table.Cell>Requires call</Table.Cell>
     </Table.Row>
     <Table.Row>
     <Table.Cell>Jill</Table.Cell>
     <Table.Cell>Denied</Table.Cell>
     <Table.Cell>None</Table.Cell>
     </Table.Row>
     <Table.Row warning>
     <Table.Cell>John</Table.Cell>
     <Table.Cell>No Action</Table.Cell>
     <Table.Cell>None</Table.Cell>
     </Table.Row>
     <Table.Row>
     <Table.Cell>Jamie</Table.Cell>
     <Table.Cell positive>Approved</Table.Cell>
     <Table.Cell warning>Requires call</Table.Cell>
     </Table.Row>
     <Table.Row>
     <Table.Cell>Jill</Table.Cell>
     <Table.Cell negative>Denied</Table.Cell>
     <Table.Cell>None</Table.Cell>
     </Table.Row>
     </Table.Body>
     </Table>*/}
     </div>
     );
  }
}

Profile.propTypes = {
  shows: PropTypes.array.isRequired,
};

export default createContainer((props) => {

  Meteor.subscribe('trackedShows');

  const username = props.params.username;
  var user = null;

  if(username){
    console.log('from parms');
    user = Meteor.users.findOne({ username: username });
  }
  else if(Meteor.user()){
    console.log('from meteor user');
    user = Meteor.user();
  }

  console.log("USERNAME: " + username);

  if(user){
    console.log(user);
    var userId = user._id;
    console.log(userId);
    console.log('1');
    return {
      shows:  TrackedShows.find({ userId: { $eq: userId } }).fetch()
    };
  } else{
    console.log('2');

    return {
      shows: new Array(),
    };
  }
}, Profile);