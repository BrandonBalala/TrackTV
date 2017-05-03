import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Shows = new Mongo.Collection('shows');
export const ShowGenres = new Mongo.Collection('showGenres');

if (Meteor.isServer) {}

Meteor.methods({
	'shows.insert'(apiId, name, type, language, status, runtime, premiered, scheduleTime, scheduleDay, rating, network, imdbId, imageURL, summary) {
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
		check(imdbId, Number);
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
	      const result = HTTP.call('GET', url, {
	        params: { q: name }
	      });
	      return result;
	    } catch (e) {
	      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
	      return 'nothing';
	    }
	},
});