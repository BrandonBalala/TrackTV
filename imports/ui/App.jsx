import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import autobind from 'autobind-decorator';
import { Link } from 'react-router';

import { Shows } from '../api/shows.js';
import { Episodes } from '../api/episodes.js';

import Show from './Show.jsx';
import ShowEpisodes from './ShowEpisodes.jsx';
/*import { CustomSidebar } from './Sidebar.jsx';*/
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import smoothScroll from 'smoothscroll';
import { Card, Segment, Divider, Container, Grid, Search } from 'semantic-ui-react';

@autobind
class App extends Component{

	constructor(props) {
		super(props);
  }

handleSubmit(event){
  event.preventDefault();

  // Find the text field via the React ref
  const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

  Meteor.call('shows.search', text, (error, result) => {
      var shows = result.map((show) => {
       return (
        <Show 
        key={show._id} 
        show={show}
        modifyActiveShow={this.modifyActiveShow.bind(this)} 
        />
        );
      });

      ReactDOM.render(
          {shows}
          ,
          document.getElementById('showsSection')
      );
  });

  // Clear form
  ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

/*resetComponent(){
  this.setState({ isLoading: false, results: [], value: '' });
}*/  

/*handleSearchChange(e, { value }) {
  this.setState({ isLoading: true, value: value })

  setTimeout(() => {
    if (this.state.value.length < 1){
      this.resetComponent();
      return null;
    }

    Meteor.call('shows.search', value, (error, result) => {
      console.log('ERROR');
      console.log(error);
      console.log('RESULT');
      console.log(result);

      this.setState({
        isLoading: false,
        results: result,
      });
    });
  }, 500)
}*/

/*handleResultSelect(e, { result }){
  this.setState({ value: result.name });
  console.log(result);
}*/

/*searchShowsDB(text){
  console.log('in searchShowsDB');
  var regex =  '.*' + text + '.*';
  console.log(regex);
  var results = Shows.find({ name: { $regex: regex, $options: 'i' } }).fetch();
  console.log(results);
}*/

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
    console.log(event.target.parentNode);

    var activeShow = event.target.parentNode.id;
    console.log('activeShow: ' + activeShow);

    Meteor.call('shows.update', activeShow, (error, result) => {
      if(!error){
        console.log("done updating");
        console.log(error);
      }
    });

    var key = activeShow + "Shows";

    ReactDOM.render(
      <Segment piled raised>
        <ShowEpisodes
        key={key} 
        showId={activeShow}
        />
      </Segment>
      ,
      document.getElementById('activeShowSection')
    );

    var episodeSection = document.querySelector('.showEp');
    smoothScroll(episodeSection);
  }

  resetActiveShowSection(){
    ReactDOM.render(
        null
      ,
      document.getElementById('activeShowSection')
    );
  }

  render() {
    return (
     <Container>
     <header>
     <h1 className='hvr-grow'>Track TV</h1>
     <form className="search-bar" onSubmit={this.handleSubmit.bind(this)} >
     <input
     type="text"
     ref="textInput"
     placeholder="Lookup Shows"
     />
     </form>
     </header>

     <Grid id="showsSection" className="showGrid" container stretched={true} textAlign='center' verticalAlign='middle' relaxed>
     {this.renderShows()}
     </Grid>

     <Divider />

     <div className="showEp">

     <div id="activeShowSection"></div> 
     </div>
     </Container>
     );
  }
}

App.propTypes = {
  shows: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('shows');

  return {
    shows: Shows.find({}, { sort: { name: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);