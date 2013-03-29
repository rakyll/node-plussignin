# node-plussignin

`plussignin` module helps you to add
[Google+ Sign In](https://developers.google.com/+/features/sign-in)
to your Connect application in a few steps. Add a session middleware and
plussignin to your app:

	app.use(express.cookieParser('something secret'));
	app.use(express.session({ secret: 'yet another secret', store: new MemoryStore() }));
	app.use(plussignin({
	  clientId: CLIENT_ID,
	  clientSecret: CLIENT_SECRET,
	  redirectUri: REDIRECT_URI,
	  scopes: SCOPES }));

That's it! `/login` route will redirect user to Google+ Sign In, `/logout`
will log the user out. `plussignin` extends the req object with the 
following utilities:

* `req.plus.profile` contains user profile.
* `req.plus.people.get({ userId: '' });` is a googleapis.Request object.
* `req.plus.oauth2` is a googleapis.OAuth2Client object with logged-in
user's credentials.
