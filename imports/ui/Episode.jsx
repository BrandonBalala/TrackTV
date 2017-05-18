import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';

// Show component - represents a single show
@autobind
export default class Episode extends Component {
  constructor(props) {
    super(props);

    console.log("in constructor");
  }
  
  render() {
    console.log("in render");
    return (
      <li>
      <span id={this.props.episode._id} className="text">
      S{this.props.episode.season}E{this.props.episode.number}: {this.props.episode.name}
      </span>
      </li>
      );
  }
}

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};