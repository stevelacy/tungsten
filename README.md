[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
# tungsten

> JSON Web Token authentication - with expressjs middleware


## Information

<table>
<tr>
<td>Package</td>
<td>tungsten</td>
</tr>
<tr>
<td>Description</td>
<td>JSON Web Token authentication</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

## Install

```
npm install tungsten --save

```
## Example



#### tungsten#session
connect/expressjs style middleware

`app.use(tungsten.session(<String session secret>))`


```js

// expressjs app

var express = require('express');
var tungsten = require('tungsten');

var app = express();

app.use(tungsten.session('secret'));


app.get('/auth', function(req, res) {
  if (req.auth == null) {
    return res.status(401).json({error: 'unauthenticated'});
  }
  res.status(200).json(req.auth);

});

```

#### tungsten#encode
Sync or async style JWT encode

`tungsten.encode(<Object data>, <String token secret>, <Function callback>)`

```js

var tungsten = require('tungsten');

app.post('/login', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (user == null) {
      // return error here
    }

    // handle password check here (this is just an example...)
    if (req.body.password == user.password) {

      var token = tungsten.encode({
        iss: user._id
        otherData: 'here'
      }, 'secret');

      user.set({token: token});
      user.save(function(err, doc) {
        // handle success here
      });
    }

  });
});

```


#### tungsten#decode
Sync or async style JWT decode

`tungsten.decode(<String JWT>, <String token secret>, <Function callback>)`

```js
var tungsten = require('tungsten');

app.use(function(req, res, next) {
  var token = req.query.token;

  try {

    tungsten.decode(token, 'secret', function(err, data) {
      if (data.something !== 'condition') {
        return next();
      }

      User.findOneById(data.iss, function(err, user) {
        // handle user check
        req.user = user;
        next();
      });

    });
  }
  catch (e) {
    next();
  }
});

```



You can view more examples in the [example folder.](https://github.com/stevelacy/tungsten/tree/master/example)

## LICENSE

(MIT License)

Copyright (c) 2015 stevelacy <me@slacy.me> (http://slacy.me)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[npm-url]: https://npmjs.org/package/tungsten
[npm-image]: http://img.shields.io/npm/v/tungsten.svg

[travis-url]: https://travis-ci.org/stevelacy/tungsten
[travis-image]: https://travis-ci.org/stevelacy/tungsten.png?branch=master

