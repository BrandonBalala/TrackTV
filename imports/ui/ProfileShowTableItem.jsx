import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

/*import { TrackedShows } from '../api/trackedshows.js';*/

import { Table, Menu, Input } from 'semantic-ui-react';

@autobind
class ProfileShowTableItem extends Component{
	constructor(props) {
		super(props);

	}

	render() {
		return (
			
		);
	}
}

ProfileShowTableItem.propTypes = {
	showId: PropTypes.number.isRequired,
	shows: PropTypes.object,
};

export default createContainer((props) => {
	return {
		shows: shows,
	};
}, ProfileShowTableItem)