import Ember from 'ember';
import AuthenticationContext from 'adal';
import ENV from 'ember-adal-test/config/environment';

export default Ember.Route.extend({
	setupController: function(controller) {
		var authContext = new AuthenticationContext(ENV.aadConfig);
		var isCallback = authContext.isCallback(window.location.hash);
		authContext.handleWindowCallback();
		if (isCallback && !authContext.getLoginError()) {
			window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);

			if (authContext.getCachedUser()) {
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
