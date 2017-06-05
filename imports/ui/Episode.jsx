import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { History } from '../api/history.js';

import { List, Divider, Checkbox } from 'semantic-ui-react';

// Show component - represents a single show
@autobind
class Episode extends Component{
  constructor(props) {
    super(props);
  }

  toggleEpisodeSeen(event) {
    var seen = this.props.seen;

    if(seen){
      var historyId = seen._id;
      Meteor.call('history.removeById', historyId, (error, result) => {
        
      });
    }
    else{
      var userId = Meteor.userId();
      var episodeId = this.props.episode._id;

      Meteor.call('history.insert', userId, episodeId, (error, result) => {
        
      });
    }

  }
  
  render() {
    return (

      <List.Item id={this.props.episode._id}>
        { this.props.trackedShow ? (
          <List.Content verticalAlign='top' floated='right'>
            <List.Header>Seen?</List.Header>
            <Checkbox checked={ this.props.seen ? true : false } onClick={this.toggleEpisodeSeen.bind(this)} slider />
          </List.Content>
        ) : (
          ''
        )}

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
  trackedShow: PropTypes.bool,
  seen: PropTypes.object,
};

export default createContainer((props) => {
  Meteor.subscribe('history');

  const userId = Meteor.userId();
  const episodeId = props.episode._id;

  return {
    seen: History.findOne({$and: [{userId: { $eq: userId } }, {episodeId: { $eq: episodeId }}]})
  };
}, Episode)