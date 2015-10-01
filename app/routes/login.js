import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
	actions: {
		authenticateWithAAD: function () {
			this.get('session').authenticate('authenticator:aad', {});
		}
	}
});