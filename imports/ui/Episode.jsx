import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { List, Divider, Checkbox } from 'semantic-ui-react';

// Show component - represents a single show
@autobind
class Episode extends Component{
  constructor(props) {
    super(props);
  }
  
  render() {
    return (

      <List.Item id={this.props.episode._id}>
        <List.Content verticalAlign='top' floated='right'>
          <List.Header>Seen?</List.Header>
          <Checkbox slider />
        </List.Content>

        <List.Content verticalAlign='top' floated='left'>
          <List.Header> S{this.props.episode.season}E{this.props.episode.number}: {this.props.episode.name}</List.Header>
          {this.props.episode.airDate}
        </List.Content>
      </List.Item>

      );
  }
}

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};

export default createContainer((props) => {
  return {};
}, Episode)