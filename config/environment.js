/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-adal-test',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'hash';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV.aadConfig = {
            tenant: 'common',
            clientId: 'ecf8a8db-09cf-4cd3-a06e-4f5c8022fc52',
            postLogoutRedirectUri: ENV.baseURL,
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        };

  ENV['simple-auth'] = {
      authorizer: 'authorizer:aad',
      crossOriginWhitelist: ['*']
  };
	
	ENV['simple-auth-oauth2'] = {
  	serverTokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/token'
	};

  return ENV;
};
