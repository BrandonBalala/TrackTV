import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Shows = new Mongo.Collection('shows');

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

	'shows.update.action'(showId, apiId, status, runtime, scheduleTime, scheduleDays, network, imageSmallURL, imageURL) {
		Shows.update(
		{$and: [{apiId: { $eq: apiId } }, {showId: { $eq: showId }}]},
		{ $set:
			{
				status: status,
				runtime: runtime,
				scheduleTime: scheduleTime,
				scheduleDays: scheduleDays,
				network: network,
				imageSmallURL: imageSmallURL,
				imageURL: imageURL,
			}
		});

		return true;
	},


	'shows.update'(showId){
		var showFound = Shows.findOne({_id: { $eq: showId } });

		if(!showFound){
			return false;
		}

		var apiId = showFound.apiId;

		// console.log(apiId);
		var url = "http://api.tvmaze.com/shows/" + apiId;

		try{
			const result = HTTP.call('GET', url, {});
			var resultJSON = JSON.parse(result.content);

			var show, schedule, status, runtime, scheduleTime, network, scheduleDays, imageSmallURL, imageURL;
			
			show = resultJSON;
			schedule = show.schedule;
			// console.log(schedule);
			status = show.status;
			// console.log(status);
			runtime = show.runtime;
			// console.log(runtime);
			scheduleTime = schedule.time;
			// console.log(scheduleTime);
			scheduleDays = schedule.days;
			// console.log(scheduleDays);
			if(show.webChannel) {
				//example: Netflix, Hulu, Amazon
				network = show.webChannel.name;
			}
			else {
				network = show.network.name;
			}
			// console.log(network);

			if(show.image){
				imageSmallURL = show.image.medium;
				imageURL = show.image.original;
			}
			// console.log(imageSmallURL);
			// console.log(imageURL);

			Meteor.call('shows.update.action', showId, apiId, status, runtime, scheduleTime, scheduleDays, network, imageSmallURL, imageURL, (error, result) => {
				if(!error){
					console.log('shows.update.action SUCCESS');
				}
			});
			console.log('1b');
			Meteor.call('episodes.search', showId, apiId, (error, result) => {
				if(!error){
					console.log('episodes.search SUCCESS');
				}
			});
			console.log('2b');

			return true;
		} catch (e){
			// console.log('4b');
			// console.log(e);
			return false;
		}
	},

	'shows.remove'(showId) {
		check(showId, String);

		try{
			Shows.remove(showId);
		} catch(e){
			console.log(e);
		}
	},

	'shows.find'(showId) {
		console.log('IN shows.find: ' + showId);
		check(showId, String);

		try{
			console.log('before query');
			var show = Shows.findOne({ _id: { $eq: showId } });
			console.log('after query');
			console.log('Show: ' + show);

			return show;
		} catch(e){
			console.log(e);
		}
	},

	'shows.search'(name){
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