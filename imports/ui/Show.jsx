import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';

// Show component - represents a single show
@autobind
export default class Show extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
      <span id={this.props.show._id} className="text" onClick={this.props.modifyActiveShow.bind(this)}>
      {this.props.show.name}
      </span>
      {/*<img src={this.props.show.imageSmallURL}/>*/}
      </li>
      );
  }
}

Show.propTypes = {
  show: PropTypes.object.isRequired,
  modifyActiveShow: PropTypes.func,
};