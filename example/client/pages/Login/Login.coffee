superagent = require 'superagent'
fission = require '../../app'

DOM = fission.React.DOM

module.exports = fission.view
  init: ->
    o =
      username: ''
      password: ''
    return o

  login: (e) ->
    e.preventDefault()
    data =
      username: @state.username
      password: @state.password

    console.log data
    superagent.post '/login', data, (err, res) =>
      if res?.status == 200
        window.user = res.body.user
        window.localStorage.setItem 'token', res.body.user.token
        return fission.router.route '/'
      else
        alert 'username/password error'

  updateUsername: (e) ->
    @setState username: e.target.value

  updatePassword: (e) ->
    @setState password: e.target.value

  render: ->
    DOM.div className: 'page login',
      DOM.h1 null, 'login'
      DOM.input
        type: 'text'
        name: 'username'
        value: @state.username
        onChange: @updateUsername
      DOM.input
        type: 'password'
        name: 'password'
        value: @state.password
        onChange: @updatePassword
      DOM.button
        onClick: @login
        , 'LOGIN'
