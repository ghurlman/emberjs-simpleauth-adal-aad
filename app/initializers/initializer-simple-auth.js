import AuthenticationContext from 'adal';
import authenticatorsbase from 'simple-auth/authenticators/base';
import authorizersbase from 'simple-auth/authorizers/base';
import Ember from 'ember';
import ENV from 'ember-adal-test/config/environment';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: function(container, application) {
    ENV.authContext = new AuthenticationContext(ENV.aadConfig);

    // register the AAD authenticator and authorizer so the session can find it      
		container.register('authenticator:aad', authenticatorsbase.extend({
			restore: function (properties) {
					return new Ember.RSVP.Promise(function (resolve, reject) {
							if (!Ember.isEmpty(properties.user)) {
									resolve(properties);
							} else {
									reject();
							}
					});
			},
			authenticate: function () {
					return new Ember.RSVP.Promise(function (resolve, reject) {
							if (!ENV.authContext.getCachedUser()) {
									ENV.authContext.login(); //Login will cause a page redirection
							}
							else {
									//If we're here, then authenticate has been called for the second time (after the refresh). This means we're already authenticated.
									resolve({ user: ENV.authContext.getCachedUser() });
							}
					});
			},
			invalidate: function () {
					return Ember.RSVP.resolve();
			}
		}));
		container.register('authorizer:aad', authorizersbase.extend({
			//Authorizes the XHR request. The assumption here is that the resource ID is the origin of the URL. That may not be the case for you, in which case you need to define
			//how to locate the resource ID for a give URI you are trying to call (have that as a configuration?)
			authorize: function (jqXHR, requestOptions) {
				var l = document.createElement("a");
				l.href = requestOptions.url;
				var resource = l.origin;

				return ENV.authContext.acquireToken(resource, function (error, token) {
						jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
				});
			}
		}));
  }
};
