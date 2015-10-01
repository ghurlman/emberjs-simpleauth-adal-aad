import Ember from 'ember';

export default Ember.Route.extend({
	model:  function () {
		return new Ember.RSVP.Promise(function (resolve, reject) {
			Ember.$.get('https://www.google.com').then(function (response) {
				resolve(JSON.stringify(response));
			});
		}); 
	}
});
