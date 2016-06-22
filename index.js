const express = require('express')
    , app = express()
    , useragent = require('useragent')
    , get_ip = require('ipware')().get_ip;

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  const ipaddress = get_ip(req).clientIp
      , language = req.headers.hasOwnProperty('accept-language') ?
                req.headers['accept-language'].split(/[,;]/)[0] :
                null
      , software = req.headers.hasOwnProperty('user-agent') ?
                useragent.parse(req.headers['user-agent']).os.toString() :
                null;
  res.json({ipaddress, language, software});
});

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});
