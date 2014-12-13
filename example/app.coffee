{join} = require 'path'
express = require 'express'
bodyParser = require 'body-parser'
tungsten = require '../'

db = require './db'
config = require './config'
validateUser = require './validateUser'

app = express()
app.use bodyParser()
app.use tungsten.session config.token.secret
app.use express.static join __dirname, '/public/'

userSchema = require './models/User'
User = db.model 'User', userSchema


idxFile = join "#{__dirname}/public/", 'index.html'

# Routes

app.post '/login', (req, res) ->
  console.log req.body
  return res.status(401).send error: 'missing parameters' unless req.body?.username and req.body?.password

  validateUser req.body.username, req.body.password, (err, user) ->
    # handle error
    return res.status(401).send error: 'invalid username or password' unless user?
    # delete the users password
    res.status(200).send user: user



app.post '/register', (req, res) ->
  return res.status(401).send error: 'missing parameters' unless req.body?.username and req.body?.password
  user = new User
    username: req.body.username
    password: req.body.password
  user.save (err, doc) ->
    # handle error
    res.status(200).send doc


app.get '/v1/users', (req, res) ->
  return res.status(401).end() unless req.auth?
  User.find {}, (err, users) ->
    res.status(200).send users


# Serve all spa routes

app.get '/*', (req, res) ->
  res.sendFile idxFile

console.log "starting server on port: #{config.port}"
app.listen config.port
