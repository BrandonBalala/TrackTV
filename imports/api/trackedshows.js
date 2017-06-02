import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const TrackedShows = new Mongo.Collection('trackedShows');

//userid + showId

if (Meteor.isServer) {
	// This code only runs on the server
	/*Meteor.publish('shows', function tasksPublication() {
		return Shows.find();
	});*/

	Shows._ensureIndex( { apiId: 1 }, { unique: true } );
	Shows._ensureIndex( { name: 1 });
}

Meteor.methods({
	'trackedShows.insert'(userId, showId){

	},

	'trackedShows.remove'(userId, showId){

	},
});