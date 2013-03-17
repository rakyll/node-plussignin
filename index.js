var express = require('express'),
    plussignin = require('./plussignin.js'),
    MemoryStore = express.session.MemoryStore,
    app = express();

var CLIENT_ID = 'YOUR_CLIENT_ID_HERE',
    CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE',
    REDIRECT_URI = 'http://localhost:3000/pluscallback',
    SCOPES = [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/plus.login'];

app.set('view engine', 'jade');
app.use(express.cookieParser('something secret'));
app.use("/public", express.static(__dirname + '/public'));
app.use(express.session({ secret: 'yet another secret', store: new MemoryStore() }));
app.use(plussignin({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES }));

// renders the homepage
app.get('/', function(req, res) {
  res.render('index', { plus: req.plus });
});

app.listen(3000);
console.log('Im listening you on port 3000...');
