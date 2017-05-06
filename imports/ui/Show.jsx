import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Show component - represents a single show
export default class Show extends Component {
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
/*    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });*/

    return (
      <li>
        <span className="text">
          {this.props.show.name}
        </span>
      </li>
    );
  }
}

Show.propTypes = {
  show: PropTypes.object.isRequired,
};