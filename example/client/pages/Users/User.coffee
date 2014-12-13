fission = require '../../app'
User = require '../../models/User'

{div, br} = fission.React.DOM

View = fission.modelView
  model: User
  render: ->

    div className: 'item',
      'User: '
      @model.username
      br null
      'id: '
      @model._id

module.exports = View
