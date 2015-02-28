# emberjs-simpleauth-adal-aad
Ember JS sample using simpleauth and ADAL to authenticate against Azure Active Directory<br>


This example takes the simple auth library and creates a custom authenticator and authorizer which rely on Azure Active Directory Authentication Library in order to authenticate and acquire access tokens.<BR>

Notes:<BR>

1-aadConfig requires your settings for the application you configure in your tenant in Azure Active Directory<BR>
2-make sure the reply URL in your Azure AD application settings match where this site runs or else you will be redirected to the wrong URL after the login<BR>
3-Different than many other implementations of simple auth library, we don't tie acquiring an access token to the login. These are different things. Chances are that this app might need different access tokens for different things. So for that to work we will rely on the authorizer<br>
4-The authorizer assume the origin part of the URL you are calling corresponds to the app id in Azure AD. In other words, we "assume" resource id = the first part of the http request (i.e. http://someurl if you are calling http://someurl/api/getsomevalue). This may very well not be your case and if so, you might need to crate a configuration object so you can relate which is the resource ID for each http request call <BR>
5-This project was created in Visual Studio but there's virtually nothing here that requires it to run.



