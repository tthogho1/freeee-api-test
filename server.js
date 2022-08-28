const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const port = 3000
const session = require('express-session');

//app.use('/', express.static('public'));
// https://qiita.com/hika7719/items/3282ab2ebcdaf080912e
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 30
  }
})); 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//
app.get('/', (req, res) =>{
  if (req.query.code){
    req.session.code = req.query.code;
  }
  res.sendFile('index.html', {root: path.join(__dirname, './public')});
});

//
app.post('/auth/', (req, res) => {
  console.log(req.body);
  let formData = {};
  formData.client_id=req.body.client_id;
  formData.client_secret=req.body.client_secret;
  formData.redirect_uri=req.body.redirect_uri;
  formData.code=req.body.code;
  formData.grant_type="authorization_code";

  const options = {
    method: 'POST',
    url: "https://accounts.secure.freee.co.jp/public_api/token",
    headers: {
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    },
    form: formData,
    json: true
  };
  request(options, function(error, response, body) {
    console.log(body);
    res.send(body);
  });
});

//
app.post('/revoke/', (req, res) => {
  console.log(req.body.access_token);
  const options = {
    method: 'POST',
    url: "https://accounts.secure.freee.co.jp/public_api/revoke",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + req.body.access_token,
    },
    form: {
      "token" : req.body,
    },
    json: true
  };
  request(options, function(error, response, body) {
    res.send(body);
  });
});


app.post('/accoutItems', (req, res) => {
  console.log(req.body.access_token);
  const options = {
    method: 'GET',
    url: "https://api.freee.co.jp/api/1/account_items?company_id=" + req.body.company_id,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + req.body.access_token,
    },
    json: true
  };
  request(options, function(error, response, body) {
    console.log(body);
    res.send(body);
  });
});

app.post('/username/', (req, res) => {
  console.log(req.body.access_token);
  const options = {
    method: 'GET',
    url: "https://api.freee.co.jp/api/1/users/me",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + req.body.access_token,
    },
    json: true
  };
  request(options, function(error, response, body) {
    console.log(body);
    res.send(body);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
