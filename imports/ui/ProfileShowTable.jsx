import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import ProfileShowTableItem from './ProfileShowTableItem.jsx';

import { TrackedShows } from '../api/trackedshows.js';

import { Table, Image, Label, Statistic } from 'semantic-ui-react';

@autobind
class ProfileShowTable extends Component{
	constructor(props) {
		super(props);
	}

/*	renderTableItems(){
		var trackedShows = this.props.trackedShows;
      	var cntr = 0;

      	return trackedShows.map((trackedShow) => {
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
  	}*/

  	renderTableItems(trackedShows){
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

      	ReactDOM.render(
      		<Table.Body>
  			{ shows }
  			</Table.Body>
	      	,
	      	document.getElementById('tableItems')
	    );
  	}

  modifyActiveShow(event){
    console.log('ROW CLICKED');
  }

	render() {
		return(
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

	        {/*<Table.Body>*/}
	        <div id="tableItems"></div>
	        {/*this.renderTableItems()*/}
	        {/*</Table.Body>*/}
	      </Table>
      );
	}

	componentDidMount(){
		this.renderTableItems(this.props.trackedShows);
	}

	componentWillReceiveProps(nextProps){
		this.renderTableItems(nextProps.trackedShows);
	}
}

ProfileShowTable.propTypes = {
    user: PropTypes.object.isRequired,
    activeItem: PropTypes.string.isRequired,
    trackedShows : PropTypes.array,
};

export default createContainer((props) => {
	Meteor.subscribe('trackedShows');

	var userId = props.user._id;

	if(props.activeItem == 'all'){
		var trackedShows = TrackedShows.find({ userId: { $eq: userId } }).fetch();
	} else {
		var trackedShows = TrackedShows.find({$and: [{userId: { $eq: userId } }, {status: { $eq: activeItem }}]}).fetch();
	}

	return {
		trackedShows: trackedShows,
	};
}, ProfileShowTable)