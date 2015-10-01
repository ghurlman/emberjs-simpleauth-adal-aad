import Ember from 'ember';
import AuthenticationContext from 'adal';
import ENV from 'ember-adal-test/config/environment';

export default Ember.Route.extend({
	setupController: function(controller) {
		var isCallback = ENV.authContext.isCallback(window.location.hash);
		ENV.authContext.handleWindowCallback();
		if (isCallback && !ENV.authContext.getLoginError()) {
			window.location = ENV.authContext._getItem(ENV.authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);

			if (ENV.authContext.getCachedUser()) {
				//Calling authenticate for the second time so it now works without a redirection.
				this.get('session').authenticate('authenticator:aad', {});
			}
		}
	},
	actions: {
		sessionAuthenticationSucceeded: function (error) {

				}
	}
});
