# node-plussignin

![Screenshot](https://github.com/burcu/node-plussignin/raw/master/screenshot.png)

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

## License

Copyright (c) 2013 Burcu Dogan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/burcu/node-plussignin/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

