import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Episodes = new Mongo.Collection('episodes');

if (Meteor.isServer) {}

Meteor.methods({
	'episodes.insert'(apiId, name, season, number, airDate, airTime, runtime, imageURL, summary) {
		check(apiId, Number);
		check(name, String);
		check(season, Number);
		check(number, Number);
		check(airDate, String);
		check(airTime, String);
		check(runtime, runtime)
		check(imageURL, String);
		check(summary, String);

		Episodes.insert({
	      apiId: apiId,
	      name: name,
	      season: season,
	      number: number,
	      airDate: airDate,
	      airTime: airTime,
	      runtime: runtime,
	      imageURL: imageURL,
	      summary: summary,
	      createdAt: new Date();
    	});
	},
});