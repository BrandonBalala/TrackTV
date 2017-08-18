import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { render } from 'react-dom';

import MainLayout from '/imports/ui/layouts/MainLayout.js';
import App from '../../ui/App.jsx';
import ShowEpisodes from '../../ui/ShowEpisodes.jsx';
import Profile from '../../ui/Profile.jsx';
import DoesNotExistPage from '../../ui/pages/DoesNotExistPage.jsx';

Meteor.startup(() => {
    render((
        <Router history={browserHistory}>
        	<Route path="/" component={MainLayout}>
        		<IndexRoute component={App}/>
        		<Route path="profile" component={Profile} />
            	<Route path="profile/:username" component={Profile} />
                <Route path="*" component={DoesNotExistPage} />
        	</Route>
        </Router>)
    	, document.getElementById('render-target')
    );
});
