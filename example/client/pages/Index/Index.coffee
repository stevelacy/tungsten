fission = require '../../app'

DOM = fission.React.DOM

#return fission.router.route '/login' unless window.user?

module.exports = fission.view
  render: ->
    DOM.div className: 'page index',
      DOM.h1 null, 'INDEX'

      if window.localStorage.getItem('token')?
        "User's Token: #{window.localStorage.getItem 'token'}"
      DOM.br()
      DOM.a
        href: '/users'
      , 'View collection'
