import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route } from 'react-router';
import { render } from 'react-dom';

import App from '../../ui/App.jsx';


export class Tracking extends Component{
    render() {
    	return (
			<BrowserRouter>
				<Route path="/" component={App}/>
			</BrowserRouter>
    	);
	}
};
/*Meteor.startup(() => {
    render(
    	<Router>
    		<Route path="/" component={ App } />
    	</Router>
    	, 
    	document.getElementById('render-target')
    );
});*/