import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';

import MainLayout from '/imports/ui/layouts/MainLayout.js';
import App from '../../ui/App.jsx';
import ShowEpisodes from '../../ui/ShowEpisodes.jsx';

Meteor.startup(() => {
    render(
        <Router history={browserHistory}>
        	<Route path='/' component={MainLayout}>
        		<IndexRoute component={App} />
        		<Route path="/show/:showId" component={ShowEpisodes} />
        	</Route>
        </Router>, 
        document.getElementById('render-target')
    );
});
