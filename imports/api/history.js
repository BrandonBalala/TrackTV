import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

import { Episodes } from '../api/episodes.js';

export const History = new Mongo.Collection('history');

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('history', function tasksPublication() {
		return History.find();
	});

	History._ensureIndex( { episodeId: 1, userId: 1 }, { unique: true } );
}

Meteor.methods({
	'history.insert'(userId, episodeId, showId){
		check(userId, String);
		check(episodeId, String);
		check(showId, String);

		try{
			var historyId = History.insert({
				userId: userId,
				showId: showId,
				episodeId: episodeId,
				createdAt: new Date()
			});

			return true;
		} catch (e){
			console.log(e);
			return false;
		}
	},

	'history.remove'(userId, episodeId){
		check(userId, String);
		check(episodeId, String);

		try{
			History.remove({$and: [{userId: { $eq: userId } }, {episodeId: { $eq: episodeId }}]});

			return true;
		} catch (e){
			console.log(e);

			return false;
		}
	},

	'history.removeById'(historyId){
		check(historyId, String);

		try{
			History.remove({ _id: historyId });

			return true;
		} catch (e){
			console.log(e);

			return false;
		}
	},

	'history.markEntireShow'(userId, showId){
		check(userId, String);
		check(showId, String);

		var episodes = Episodes.find({showId: { $eq: showId }}).fetch();

		for (var i = 0; i < episodes.length; i++) {
			var episode = episodes[i];
			var episodeId = episode._id;
			Meteor.call('history.insert', userId, episodeId, showId);
		}
	},


	'history.unmarkEntireShow'(userId, showId){
		check(userId, String);
		check(showId, String);

		var episodes = Episodes.find({showId: { $eq: showId }}).fetch();

		for (var i = 0; i < episodes.length; i++) {
			var episode = episodes[i];
			var episodeId = episode._id;
			Meteor.call('history.remove', userId, episodeId);
		}
	},

});