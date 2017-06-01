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

	Shows._ensureIndex( { apiId: 1 }, { unique: true } );
	Shows._ensureIndex( { name: 1 });
}

Meteor.methods({
	'shows.insert'(apiId, name, type, genres, language, status, runtime, premiered, scheduleTime, scheduleDays, network, country, imdbId, imageSmallURL, imageURL, summary) {
		/*console.log('in shows.insert');*/

		check(apiId, Number);
		check(name, String);

		var showId = Shows.insert({
			apiId: apiId,
			name: name,
			type: type,
			genres: genres,
			language: language,
			status: status,
			runtime: runtime,
			premiered: premiered,
			scheduleTime: scheduleTime,
			scheduleDays: scheduleDays,
			network: network,
			country: country,
			imdbId: imdbId,
			imageSmallURL: imageSmallURL,
			imageURL: imageURL,
			summary: summary,
			createdAt: new Date()
		});

		/*console.log('finished inserting show');*/

		return showId;
	},

	'shows.remove'(showId) {
		check(showId, String);

		Tasks.remove(showId);
	},

	'shows.remove'(showId) {
		check(showId, String);

		try {
			const result = Shows.findOne({_id: { $eq: activeShow } }).fetch();

			console.log(result);
		} catch(e) {
			console.log(e);
		}

	},

	'shows.search'(name){
		/*console.log('in shows.search');*/
		check(name, String);


		var url = "http://api.tvmaze.com/search/shows";
		try {
			const results = HTTP.call('GET', url, {
				params: { q: name }
			});

			var resultsJSON = JSON.parse(results.content);

			var show, schedule, apiId, officialName, type, language, status, runtime, premiered, scheduleTime, network, country, imdbId, imageSmallURL, imageURL, summary, showId, genres, scheduleDays;
			for (var i = 0; i < resultsJSON.length; i++) {
				try{
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

					if(show.webChannel) {
							//example: Netflix, Hulu, Amazon
							network = show.webChannel.name;
							country = show.webChannel.country.name;
						}
						else {
							network = show.network.name;
							country = show.network.country.name;
						}

						imdbId = show.externals.imdb;
						if(show.image){
							imageSmallURL = show.image.medium;
							imageURL = show.image.original;
						}
						summary = show.summary;
						genres = show.genres;

						console.log("== Show: " + officialName);

						showId = Meteor.call('shows.insert', apiId, officialName, type, genres, language, status, runtime, premiered, scheduleTime, scheduleDays, network, country, imdbId, imageSmallURL, imageURL, summary);

						Meteor.call('episodes.search', showId, apiId);
					} catch(e) {
						console.log(e);
					}
				}

				return true;
			} catch (e) {
			      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
			      console.log(e);
			      return false;
			  }
			},

	'shows.getShowApiId'(showId){
		try{
			var result = Shows.findOne({_id: { $eq: showId } }, {});
			console.log(result['apiId']);
			
			return result['apiId'];
		} catch (e){
			console.log(e);
		}
	},
		});