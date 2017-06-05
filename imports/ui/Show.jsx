import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';

import { Card, Image } from 'semantic-ui-react';

// Show component - represents a single show
@autobind
export default class Show extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card raised color='orange'>
        <Image src={this.props.show.imageURL}/>
        <Card.Content>
          <Card.Header>
            <span className="text" id={this.props.show._id} onClick={this.props.modifyActiveShow.bind(this)}>
            {this.props.show.name}
            </span>
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

Show.propTypes = {
  show: PropTypes.object.isRequired,
  modifyActiveShow: PropTypes.func,
};