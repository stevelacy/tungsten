fission = require './app'
IndexView = require './pages/Index/Index'
LoginView = require './pages/Login/Login'
UsersView = require './pages/Users/Users'

fission.router.route '/',
  title: 'Welcome'
  view: IndexView
  el: 'content'

fission.router.route '/login',
  title: 'Welcome'
  view: LoginView
  el: 'content'

fission.router.route '/users',
  title: 'Welcome'
  view: UsersView
  el: 'content'

fission.router.start()
