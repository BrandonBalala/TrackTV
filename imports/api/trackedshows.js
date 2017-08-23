import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const TrackedShows = new Mongo.Collection('trackedShows');

//userid + showId

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('trackedShows', function tasksPublication() {
		return TrackedShows.find();
	});

	TrackedShows._ensureIndex( { showId: 1, userId: 1 }, { unique: true } );
}

Meteor.methods({
	'trackedShows.insert'(userId, showId){
		try{
			var status = "watching";

			var trackedShowId = TrackedShows.insert({
				userId: userId,
				showId: showId,
				status: status,	//watching, planToWatch, completed, dropped, onHold
				createdAt: new Date(),
				modifiedAt: new Date(),
			});

			return true;
		} catch (e){
			console.log(e);
			return false;
		}
	},

	'trackedShows.remove'(userId, showId){
		check(userId, String);
		check(showId, String);

		try{
			TrackedShows.remove({$and: [{userId: { $eq: userId } }, {showId: { $eq: showId }}]});

			return true;
		} catch (e){
			console.log(e);

			return false;
		}
	},

	'trackedShows.update'(userId, showId, status){
		TrackedShows.upsert(
		{$and: [{userId: { $eq: userId } }, {showId: { $eq: showId }}]},
		{ $set:
			{
				status: status,
				modifiedAt: new Date(),
			}
		});

		return true;
	},

	'trackedShows.findAllShowsOfUser'(userId){
		check(userId, String);
		console.log(userId);

		try{
			/*var shows = [];*/

			var shows = TrackedShows.find({userId: { $eq: userId } }).fetch();
			console.log(shows);

			return shows;

			/*for (var i = 0; i <  temp.length; i++) {
				var showId = temp[i]['showId'];
				console.log(showId);
				var show = Meteor.call('shows.find', userId);
				console.log(show);

				shows[i] = show;
			}
			console.log(shows);
			return shows;*/
		} catch (e){
			console.log(e);
		}
	},

	'trackedShows.findCurrentlyWatchingShows'(userId){
		var status = "watching";
		check(userId, String);

		try{
			var shows = [];

			var temp = TrackedShows.find({$and: [{userId: { $eq: userId } }, {status: { $eq: status }}]}).fetch();

			for (var i = 0; i <  temp.length; i++) {
				var showId = temp[i]['showId'];
				var show = Meteor.call('shows.find', showId);

				shows[i] = show;
			}

			return shows;
		} catch (e){
			console.log(e);
		}
	},

	'trackedShows.findPlanToWatchShows'(userId){
		var status = "planToWatch";
		check(userId, String);

		try{
			var shows = [];

			var temp = TrackedShows.find({$and: [{userId: { $eq: userId } }, {status: { $eq: status }}]}).fetch();

			for (var i = 0; i <  temp.length; i++) {
				var showId = temp[i]['showId'];
				var show = Meteor.call('shows.find', showId);

				shows[i] = show;
			}

			return shows;
		} catch (e){
			console.log(e);
		}
	},

	'trackedShows.findCompletedShows'(userId){
		var status = "completed";
		check(userId, String);

		try{
			var shows = [];

			var temp = TrackedShows.find({$and: [{userId: { $eq: userId } }, {status: { $eq: status }}]}).fetch();

			for (var i = 0; i <  temp.length; i++) {
				var showId = temp[i]['showId'];
				var show = Meteor.call('shows.find', showId);

				shows[i] = show;
			}

			return shows;
		} catch (e){
			console.log(e);
		}
	},

	'trackedShows.findDroppedShows'(userId){
		var status = "dropped";
		check(userId, String);

		try{
			var shows = [];

			var temp = TrackedShows.find({$and: [{userId: { $eq: userId } }, {status: { $eq: status }}]}).fetch();

			for (var i = 0; i <  temp.length; i++) {
				var showId = temp[i]['showId'];
				var show = Meteor.call('shows.find', showId);

				shows[i] = show;
			}

			return shows;
		} catch (e){
			console.log(e);
		}
	},

	'trackedShows.findOnHoldShows'(userId){
		var status = "onHold";
		check(userId, String);

		try{
			var shows = [];

			var temp = TrackedShows.find({$and: [{userId: { $eq: userId } }, {status: { $eq: status }}]}).fetch();

			for (var i = 0; i <  temp.length; i++) {
				var showId = temp[i]['showId'];
				var show = Meteor.call('shows.find', showId);

				shows[i] = show;
			}

			return shows;
		} catch (e){
			console.log(e);
		}
	},

	'trackedShows.findMostWatchedShows'(amount){
		try{

		} catch (e){
			console.log(e);
		}
	},

	'trackedShows.getUser'(username){
		return Meteor.users.findOne({ username : { $eq: username } });
	},
});