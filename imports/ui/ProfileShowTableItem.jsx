import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';
import { History } from '../api/history.js';

import { Table, Image, Label, Statistic } from 'semantic-ui-react';

@autobind
class ProfileShowTableItem extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		var color = "";
		switch (this.props.show.status) {
		    case "Running":
		        color = "green";
		        break;
		    case "Ended":
		        color = "red";
		        break;
	        case "In Development":
	        	color = "teal";
	        	break;
		    case "To Be Determined":
		        color = "grey";
		        break;
	        default:
	        	color = "grey";
		}

		var progress = this.props.seenEpisodes + "/" + this.props.totalEpisodes;

		return (
	    	<Table.Row onClick={this.props.modifyActiveShow.bind(this)}>
           		<Table.Cell>{this.props.cntr}</Table.Cell>
	        	<Table.Cell><Image size="tiny" src={this.props.show.imageSmallURL}/></Table.Cell>
	         	<Table.Cell>{this.props.show.name}</Table.Cell>
	         	<Table.Cell><Label color={color} horizontal>{this.props.show.status}</Label></Table.Cell>
           		<Table.Cell><Statistic size='mini' label='Seen' value={progress} /></Table.Cell>
         	</Table.Row>
		);
	}
}

ProfileShowTableItem.propTypes = {
	cntr: PropTypes.number.isRequired,
	trackedShow: PropTypes.object.isRequired,
	showId: PropTypes.string.isRequired,
	modifyActiveShow: PropTypes.func,
	show: PropTypes.object,
	totalEpisodes: PropTypes.number,
	seenEpisodes: PropTypes.number,
};

export default createContainer((props) => {
	Meteor.subscribe('shows');
	Meteor.subscribe('episodes');
	Meteor.subscribe('history');

	const showId = props.showId;
	const userId = Meteor.user()._id;

	Meteor.call('shows.update', props.showId);

	return {
		show: Shows.findOne({_id: { $eq: showId }}),
		totalEpisodes: Episodes.find({showId: { $eq: showId }}).count(),
		seenEpisodes: History.find({$and: [{userId: { $eq: userId } }, {showId: { $eq: showId }}]}).count(),
	};
}, ProfileShowTableItem)