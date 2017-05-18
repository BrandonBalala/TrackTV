import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';

import { List, Divider } from 'semantic-ui-react';

// Show component - represents a single show
@autobind
export default class Episode extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (

      <List.Item id={this.props.episode._id}>
      <List.Content>
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