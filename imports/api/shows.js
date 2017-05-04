import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Shows = new Mongo.Collection('shows');
export const ShowGenres = new Mongo.Collection('showGenres');

if (Meteor.isServer) {}

	Meteor.methods({
		'shows.insert'(apiId, name, type, language, status, runtime, premiered, scheduleTime, scheduleDay, rating, network, imdbId, imageSmallURL, imageURL, summary) {
			check(apiId, Number);
			check(name, String);
			check(type, String);
			check(language, String);
			check(status, String);
			check(runtime, Number);
			check(premiered, String);
			check(scheduleTime, String);
			check(scheduleDay, Date);
			check(rating, Number);
			check(network, String);
			check(imdbId, String);
			check(imageSmallURL, String);
			check(imageURL, String);
			check(summary, String);

			Episodes.insert({
				apiId: apiId,
				name: name,
				type: type,
				language: language,
				status: status,
				runtime: runtime,
				premiered: premiered,
				scheduleTime: scheduleTime,
				scheduleDay: scheduleDay,
				rating: rating,
				network: network,
				imdbId: imdbId,
				imageSmallURL: imageSmallURL,
				imageURL: imageURL,
				summary: summary,
				createdAt: new Date()
			});
		},

		'shows.remove'(showId) {
			check(showId, Number);

			Tasks.remove(taskId);
		},

		'showGenres.insert'(showId, genre){
			check(showId, Number);
			check(genre, String);

			ShowGenres.insert({
				showId: showId,
				genre: genre	
			});
		},

		'shows.search'(name){
			check(name, Number);

			var url = "http://api.tvmaze.com/search/shows";
			try {
				const results = HTTP.call('GET', url, {
					params: { q: name }
				});

				for (var i = results.length - 1; i >= 0; i--) {
					var show = results[i]['show'];
					var schedule = show['schedule'];
					var genres = show['genres'];

					var apiId = show['id'];
					var name = show['name'];
					var type = show['type']; 
					var language = show['language'];
					var status = show['status'];
					var runtime = show['runtime'];
					var premiered = show['premiered'];
					var scheduleTime = schedule['time'];
					var rating = ;
					var network = ;
					var imdbId = ;
					var imageSmallURL = ;
					var imageURL = ;
					var summary = ;

					Meteor.call('tasks.insert', apiId, name, type, language, status, runtime, premiered, scheduleTime, scheduleDay, rating, network, imdbId, imageSmallURL, imageURL, summary);
				}

				return result;
			} catch (e) {
			      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
			      return '';
			  }
			},
		});