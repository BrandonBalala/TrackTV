import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';

import { Card, Image } from 'semantic-ui-react';

@autobind
export default class DoesNotExistPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>404: PAGE NOT FOUND</h1>
    );
  }
}

DoesNotExistPage.propTypes = {

};