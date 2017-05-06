import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Shows = new Mongo.Collection('shows');
/*export const ShowGenres = new Mongo.Collection('showGenres');
export const ShowDays = new Mongo.Collection('showDays');*/

if (Meteor.isServer) {
	// This code only runs on the server
  	Meteor.publish('shows', function tasksPublication() {
   		return Shows.find();
  	});
}

	Meteor.methods({
		'shows.insert'(apiId, name, type, genres, language, status, runtime, premiered, scheduleTime, scheduleDays, network, country, imdbId, imageSmallURL, imageURL, summary) {
			console.log('in shows.insert');

			check(apiId, Number);
			check(name, String);
			check(type, String);
			check(language, String);
			check(status, String);
			check(runtime, Number);
			check(premiered, String);
			/*check(scheduleTime, String);*/
			check(network, String);
			check(country, String);
			check(imdbId, String);
			check(imageSmallURL, String);
			check(imageURL, String);
			check(summary, String);

			var showId = Shows.insert({
				apiId: apiId,
				name: name,
				type: type,
				language: language,
				status: status,
				runtime: runtime,
				premiered: premiered,
				scheduleTime: scheduleTime,
				network: network,
				country: country,
				imdbId: imdbId,
				imageSmallURL: imageSmallURL,
				imageURL: imageURL,
				summary: summary,
				createdAt: new Date()
			});

			console.log('finished inserting show');

			return showId;
		},

		'shows.remove'(showId) {
			check(showId, String);

			Tasks.remove(showId);
		},

		/*'showGenres.insert'(showId, genre){
			console.log('shows.insert');

			check(showId, String);
			check(genre, String);

			ShowGenres.insert({
				showId: showId,
				genre: genre	
			});

			console.log('finished inserting genre');
		},

		'showDays.insert'(showId, day){
			check(showId, String);
			check(day, String);

			ShowDays.insert({
				showId: showId,
				day: day	
			});

			console.log('finished inserting day');
		},*/

		'shows.search'(name){
			console.log('in shows.search');
			check(name, String);

			var url = "http://api.tvmaze.com/search/shows";
			try {
				const results = HTTP.call('GET', url, {
					params: { q: name }
				});

				var resultsJSON = JSON.parse(results.content);

				var show, schedule, apiId, officialName, type, language, status, runtime, premiered, scheduleTime, network, country, imdbId, imageSmallURL, imageURL, summary, showId, genres, scheduleDays;
				for (var i = 0; i < resultsJSON.length; i++) {
					show = resultsJSON[i].show;
					schedule = show.schedule;
					apiId = show.id;
					officialName = show.name;
					type = show.type;
					language = show.language;
					status = show.status;
					runtime = show.runtime;
					premiered = show.premiered;
					scheduleTime = schedule.time;
					scheduleDays = schedule.days;
					network = show.network.name;
					country = show.network.country.name;
					imdbId = show.externals.imdb;
					imageSmallURL = show.image.medium;
					imageURL = show.image.original;
					summary = show.summary;
					genres = show.genres;

					console.log(officialName);
					console.log(schedule);
					console.log(genres);

					showId = Meteor.call('shows.insert', apiId, officialName, type, genres, language, status, runtime, premiered, scheduleTime, scheduleDays, network, country, imdbId, imageSmallURL, imageURL, summary);
					console.log('ShowId: ' + showId);


					/*genres = show['genres'];*/

					/*for (var i = 0; i < genres.length; i++) {
						console.log(genres[i]);
						genreIdMeteor.call('showGenres.insert', showId, genres[i]);
					}*/

					/*scheduleDays = schedule['days'];*/
					/*for (var i = 0; i < scheduleDays.length; i++) {
						console.log()
						Meteor.call('showDays.insert', showId, scheduleDays[i]);
					}*/

					Meteor.call('episodes.search', showId, apiId);
				}

				return true;
			} catch (e) {
			      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
			      return false;
			  }
			}
		});