import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { TrackedShows } from '../api/trackedshows.js';

import { Table, Menu, Input } from 'semantic-ui-react';

@autobind
class Profile extends Component{
	constructor(props) {
		super(props);

		this.state = {
			activeItem: 'all',
		};
	}

/*	handleItemClick(event, {name}){
		console.log(name);
		this.setState({ activeItem: name });
	}

	renderTable(){
		if(this.state.activeItem){
			ReactDOM.render(
				<Table selectable>
				<Table.Header>
				<Table.Row>
				<Table.HeaderCell>Name</Table.HeaderCell>
				<Table.HeaderCell>Status</Table.HeaderCell>
				<Table.HeaderCell>Notes</Table.HeaderCell>
				</Table.Row>
				</Table.Header>

				{this.renderTableItems()}

				</Table>
				,
				document.getElementById('showTable')
				);
		}
	}

	renderTableItems(){
		var showsToDisplay = [];

		var status = this.state.activeItem;
		const shows = this.props.shows;

		if(activeItem == 'all'){
			showsToDisplay = shows;
		} else {
			for (var i = 0; i < shows.length; i++) {
				if(shows[i].status == status){
					showsToDisplay.push(shows[i]);
				}
			}
		}
	}*/

	render() {
		return (
			<div className="container">
			<h1>IN Profile</h1>
			</div>
		);
		/*return (
			<div className="container">
			<Menu pointing>
			<Menu.Item id='all' name='all' active={this.state.activeItem === 'all'} onClick={this.handleItemClick.bind(this)} />
			<Menu.Item id='watching' name='watching' active={this.state.activeItem === 'watching'} onClick={this.handleItemClick.bind(this)} />
			<Menu.Item id='planToWatch' name='planToWatch' active={this.state.activeItem === 'planToWatch'} onClick={this.handleItemClick.bind(this)} />
			<Menu.Item id='completed' name='completed' active={this.state.activeItem === 'completed'} onClick={this.handleItemClick.bind(this)} />
			<Menu.Item id='dropped' name='dropped' active={this.state.activeItem === 'dropped'} onClick={this.handleItemClick.bind(this)} />
			<Menu.Item id='onHold' name='onHold' active={this.state.activeItem === 'onHold'} onClick={this.handleItemClick.bind(this)} />
			<Menu.Menu position='right'>
			<Menu.Item>
			<Input icon='search' placeholder='Search...' />
			</Menu.Item>
			</Menu.Menu>
			</Menu>

			<div id="showTable"></div>

			<Table selectable>
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
			</Table>
			</div>
			);*/
	}
}

Profile.propTypes = {
	/*shows: PropTypes.array,*/
};

export default createContainer((props) => {
/*	Meteor.subscribe('trackedshows');

	const username = props.params.username;
	const user = Meteor.users.findOne({ username: username });

	console.log(username);

	if(user){
		console.log(user);
		var userId = user._id;
		console.log(userId);
		return {
			shows:  TrackedShows.find({ userId : { $eq : userId } }).fetch(),
		};
	}*/
}, Profile)