import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { TrackedShows } from '../api/trackedshows.js';
import { Episodes } from '../api/episodes.js';
import { History } from '../api/history.js';

import { Grid, Image, Segment, Label } from 'semantic-ui-react';

@autobind
class Show extends Component {

  constructor(props) {
    super(props);
  }

  renderProgressLabel(){
    if(!this.props.activeUser || !this.props.trackedShow || this.props.totalEpisodes == 0){
      return null;
    }

    var progress = this.props.totalEpisodes - this.props.seenEpisodes;
    
    return (
      <Label color='grey' size='medium' circular floating>{progress}</Label>
    );
  }

  render() {
    return (
      <Grid.Column id={this.props.show._id} stretched={true} computer={4} mobile={8} tablet={4}>
        <Segment className='showSegment hvr-shadow-radial' id={this.props.show._id} onClick={this.props.modifyActiveShow.bind(this)} color='grey'>
            { this.props.show.imageSmallURL ? 
              <Image className='showImage' src={this.props.show.imageSmallURL} shape='rounded'/>
              :
              <Image className='showImage' src='/images/default.png' shape='rounded'/>
            }
            <Label attached='bottom'>{this.props.show.name}</Label>
            {this.renderProgressLabel()}
        </Segment>
      </Grid.Column>
    );
  }
}

Show.propTypes = {
  show: PropTypes.object.isRequired,
  modifyActiveShow: PropTypes.func,
  trackedShow: PropTypes.object,
  totalEpisodes: PropTypes.number,
  seenEpisodes: PropTypes.number,
  activeUser: PropTypes.object,
};

export default createContainer((props) => {
  Meteor.subscribe('trackedShows');
  Meteor.subscribe('episodes');
  Meteor.subscribe('history');

  const showId = props.show._id;

  if(Meteor.user()){
    const userId = Meteor.user()._id;

    return {
      activeUser: Meteor.user(),
      trackedShow: TrackedShows.findOne({$and: [{userId: { $eq: userId } }, {showId: { $eq: showId }}]}),
      totalEpisodes: Episodes.find({showId: { $eq: showId }}).count(),
      seenEpisodes: History.find({$and: [{userId: { $eq: userId } }, {showId: { $eq: showId }}]}).count(),
    };
  }
  else {
    return {
      activeUser: null
    };
  }
}, Show)