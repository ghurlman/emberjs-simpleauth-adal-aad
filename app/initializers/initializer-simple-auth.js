export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
        name: 'authentication',
        before: 'simple-auth',
        initialize: function(container, application) {
          // register the AAD authenticator and authorizer so the session can find it      
            container.register('authenticator:aad', App.AzureADAuthenticator);
            container.register('authorizer:aad', App.AzureADAuthorizer);
        }
 };
