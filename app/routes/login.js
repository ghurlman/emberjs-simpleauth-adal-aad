import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		authenticateWithAAD: function () {
			this.get('session').authenticate('authenticator:aad', {});
		}
	}
});
