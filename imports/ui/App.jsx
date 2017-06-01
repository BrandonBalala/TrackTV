import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';

import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';

import Show from './Show.jsx';
import ShowEpisodes from './ShowEpisodes.jsx';
import { CustomSidebar } from './Sidebar.jsx';
/*import AccountsUIWrapper from './AccountsUIWrapper.jsx';*/

import smoothScroll from 'smoothscroll';
import { Card, Segment, Divider } from 'semantic-ui-react';

@autobind
class App extends Component{

	constructor(props) {
		super(props);

		this.state = {
      activeShow: null,
    };
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

  modifyActiveShow(event){
    var activeShow = event.target.id;

    ReactDOM.render(
        <Segment>
        <ShowEpisodes 
        showId={activeShow}
        />
        </Segment>
      ,
      document.getElementById('activeShowSection')
    );

    var episodeSection = document.querySelector('.showEp');
    smoothScroll(episodeSection);
  }

  render() {
    return (
     <div className="container">
     {/*<CustomSidebar/>*/}
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

     <Card.Group itemsPerRow={4}>
     {this.renderShows()}
     </Card.Group>

     <Divider />

     <div className="showEp">

     <div id="activeShowSection"></div> 
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