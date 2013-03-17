var googleapis = require('googleapis'),
    client = null;

module.exports = function (options) {
  options = options || {};
  return function(req, res, next) {
    if (!client) {
      googleapis.load('plus', 'v1', function(err, loadedClient) {
        client = loadedClient;
        handle(options, req, res, next);
      })
    } else {
      handle(options, req, res, next);
    }
  };
};

function handle(opts, req, res, next) {
  req.plus = client.plus;
  req.plus.oauth2 =
      new googleapis.OAuth2Client(opts.clientId, opts.clientSecret, opts.redirectUri);
  req.plus.oauth2.credentials = req.session.credentials;
  req.plus.isLoggedIn = !!(req.session.credentials);
  req.plus.profile = req.session.credentials && req.session.credentials.user;

  if(req.path == '/login') {
    // redirect user to auth page.
    var scope = (opts.scopes || []).join(' ');
    res.redirect(req.plus.oauth2.generateAuthUrl({ scope: scope, approval_prompt: 'force' }));
  } else if (req.path == '/pluscallback') {
    // handle the callback from oauth2
    req.plus.oauth2.getToken(req.query.code, function(err, response) {
      // successfully acquired access token
      if (response.access_token) {
        req.session.credentials = response;
        res.redirect('/');
      } else {
        res.redirect('/error');
      }
    });
  } else if (req.path == '/logout') {
    // log the user out
    req.session.credentials = null;
    res.redirect('/');
  } else if (req.plus.isLoggedIn && !req.plus.profile) {
    // if isLogeed in an user profile is not on the session
    // retrieve user profile
    var request = req.plus.people.get({ userId: 'me' }).withAuthClient(req.plus.oauth2);
    request.execute(function(err, result) {
      req.session.credentials.user = result;
      req.plus.profile = result;
      next();
    });
  } else {
    next();
  }
};