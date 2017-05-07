import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'

export const Episodes = new Mongo.Collection('episodes');

if (Meteor.isServer) {
	Episodes._ensureIndex( { showId: 1, episodeIndex: 1 }, { unique: true } );
}

Meteor.methods({
	'episodes.insert'(showId, episodeIndex, name, season, number, airDate, airTime, runtime, imageSmallURL, imageURL, summary) {
		/*console.log('in episodes.insert');*/

		check(showId, String);
		check(episodeIndex, Number);
/*		check(name, String);
		check(season, Number);
		check(number, Number);
		check(airDate, String);
		check(airTime, String);
		check(runtime, Number);
		check(imageSmallURL, String);
		check(imageURL, String);
		check(summary, String);*/

		var episodeId = Episodes.insert({
	      showId: showId,
	      episodeIndex: episodeIndex,
	      name: name,
	      season: season,
	      number: number,
	      airDate: airDate,
	      airTime: airTime,
	      runtime: runtime,
	      imageSmallURL: imageSmallURL,
	      imageURL: imageURL,
	      summary: summary,
	      createdAt: new Date()
    	});

    	/*console.log('finished inserting episode');*/

    	return episodeId;
	},

	'episodes.search'(showId, apiId){
		/*console.log('in episodes.search');*/

		check(showId, String);
		check(apiId, Number)

		var url = "http://api.tvmaze.com/shows/" + apiId + "/episodes";
			try {
				const results = HTTP.call('GET', url);
				
				var resultsJSON = JSON.parse(results.content);

				var episodeId, episode, episodeIndex, name, season, number, airDate, airTime, runtime, imageSmallURL, imageURL, summary;
				for (var i = 0; i < resultsJSON.length; i++) {
					try{
						episode = resultsJSON[i];
						episodeIndex = episode.id;
						name = episode.name;
						season = episode.season;
						number = episode.number;
						airDate = episode.airdate;
						airTime = episode.airtime;
						runtime = episode.runtime;
						if(episode.image){
							imageSmallURL = episode.image.medium;
							imageURL = episode.image.original;
						}
						summary = episode.summary;

						console.log("= S" + season + "E" + number + ": " + name);

						episodeId = Meteor.call('episodes.insert', showId, episodeIndex, name, season, number, airDate, airTime, runtime, imageSmallURL, imageURL, summary);
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
		}
});