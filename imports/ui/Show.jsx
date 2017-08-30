import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';

import { Grid, Image, Segment, Label } from 'semantic-ui-react';

@autobind
export default class Show extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid.Column id={this.props.show._id} stretched={true} computer={4} mobile={8} tablet={4}>
        <Segment className='showSegment' id={this.props.show._id} onClick={this.props.modifyActiveShow.bind(this)} color='grey'>
            <Image src={this.props.show.imageSmallURL} shape='rounded'/>
            <Label attached='bottom'>{this.props.show.name}</Label>
        </Segment>
      </Grid.Column>
    );
  }
}

Show.propTypes = {
  show: PropTypes.object.isRequired,
  modifyActiveShow: PropTypes.func,
};