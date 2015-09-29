# Ember-adal-test

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
=======
# emberjs-simpleauth-adal-aad
Ember JS sample using simpleauth and ADAL to authenticate against Azure Active Directory<br>


This example takes the simple auth library and creates a custom authenticator and authorizer which rely on Azure Active Directory Authentication Library in order to authenticate and acquire access tokens.<BR>

Notes:<BR>

1-aadConfig requires your settings for the application you configure in your tenant in Azure Active Directory<BR>
2-make sure the reply URL in your Azure AD application settings match where this site runs or else you will be redirected to the wrong URL after the login<BR>
3-Different than many other implementations of simple auth library, we don't tie acquiring an access token to the login. These are different things. Chances are that this app might need different access tokens for different things. So for that to work we will rely on the authorizer<br>
4-The authorizer assume the origin part of the URL you are calling corresponds to the app id in Azure AD. In other words, we "assume" resource id = the first part of the http request (i.e. http://someurl if you are calling http://someurl/api/getsomevalue). This may very well not be your case and if so, you might need to crate a configuration object so you can relate which is the resource ID for each http request call <BR>
5-This project was created in Visual Studio but there's virtually nothing here that requires it to run.
