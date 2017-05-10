import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
/*import { composeWithTracker } from 'react-komposer';*/

import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';

import Show from './Show.jsx';
import ShowEpisodes from './ShowEpisodes.jsx';
/*import AccountsUIWrapper from './AccountsUIWrapper.jsx';*/

import smoothScroll from 'smoothscroll';

@autobind
class App extends Component{

	constructor(props) {
		super(props);

		this.state = {
      activeShow: null,
    };

/*    this.renderEpisodesSection = this.renderEpisodesSection.bind(this);
    this.modifyActiveShow = this.modifyActiveShow.bind(this);*/
  }

  handleSubmit(event){
    event.preventDefault();

	    // Find the text field via the React ref
	    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

	    Meteor.call('shows.search', text);

	    // Clear form
	    ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }

   renderShows() {
    return this.props.shows.map((show) => {
     return (
      <Show 
      key={show._id} 
      show={show}
      modifyActiveShow={this.modifyActiveShow.bind(this)} 
      />
      );
   });
  }

  renderEpisodesSection(){
    var activeShow = this.state.activeShow;

    if(activeShow) {
        /*location.href = "#showEp";*/

        var episodeSection = document.querySelector('.showEp');
        console.log(episodeSection);
        smoothScroll(episodeSection);

        return (
          <ShowEpisodes 
          key={activeShow} 
          showId={activeShow}
          />
          );
      }
    }

    modifyActiveShow(event){
      this.setState({ activeShow: event.target.id });
    }

    render() {
      return (
       <div className="container">
       <header>
       <h1>Track TV</h1>
       <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
       <input
       type="text"
       ref="textInput"
       placeholder="Search for a show"
       />		
       </form>
       </header>

       <ul>
       {this.renderShows()}
       </ul>

       <div className="showEp">
       {this.renderEpisodesSection()} 
       </div>
       </div>
       );
    }
  }

  App.propTypes = {
    shows: PropTypes.array.isRequired,
    activeShow: PropTypes.number
  };

  export default createContainer(() => {
    Meteor.subscribe('shows');

    return {
      shows: Shows.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
  }, App);