$ ->
  $('#first-task-button').on 'click', ->
    query = {query: '{firstTask {id title status priority}}'};
    $.ajax
      url: '/graphql',
      type: 'POST',
      dataType: 'json',
      data: query
    .done (result) ->
      console.log(result)
    .fail (error) ->
      console.log(error)
