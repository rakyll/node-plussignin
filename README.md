# node-plussignin

`plussignin` module helps you to add Google+ Sign In to your Connect application
in a few steps. Add a seesion middleware and `plussignin` to your app:

	app.use(express.cookieParser('something secret'));
	app.use(express.session({ secret: 'yet another secret', store: new MemoryStore() }));
	app.use(plussignin({
	  clientId: CLIENT_ID,
	  clientSecret: CLIENT_SECRET,
	  redirectUri: REDIRECT_URI,
	  scopes: SCOPES }));

That's it! `/login` route will redirect user to Google+ Sign In, `/logout` will
log the user out. `req.plus.profile` contains the user profile.
