import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';

// Show component - represents a single show
export default class Show extends Component {

  constructor(props) {
    super(props);


  }

  renderShowEpisodes(){
    /*this.setState({ activeShow: this.props.show.id});*/
  }
  

  render() {
    return (
      <li>
      <span className="text" onClick={this.renderShowEpisodes()}>
      {this.props.show.name}
      </span>
      </li>
      );
  }
}

Show.propTypes = {
  show: PropTypes.object.isRequired,
};