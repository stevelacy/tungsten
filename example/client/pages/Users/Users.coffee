fission = require '../../app'
User = require '../../models/User'
UserView = require './User'

{div} = fission.React.DOM

module.exports = ->
  fission.collectionView
    model: User
    itemView: UserView
    render: ->
      div className: 'page',
        console.log @model
        console.log @items
        @items
