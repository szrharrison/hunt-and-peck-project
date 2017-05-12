$(function() {

  const tableHtml = `<h4 id="player-name" class="heading"></h4><br>
                    <table class="centered striped">
                      <thead>
                        <tr>
                          <th id="wpm-th"></th>
                          <th id="acc-th"></th>
                        </tr>
                      </thead>
                      <tbody id="player-stats">
                      </tbody>
                    </table><br><br><div class="divider"></div><br><br>`

  // ajax request for top 10 plays by wpms
  $.ajax({
    method: 'GET',
    url: "http://localhost:3000/api/v1/statistics/topplays",
    success: function(stats){
      // iterate over data and render each stat
      stats.forEach(function(stat){
        const $wpm = stat['wpm']
        const $user = stat['user']['username']
        $('#topplays').append(`<tr><td>${$wpm}</td><td>${$user}</td></tr>`)
      })
    }
  })

  //get username from form
  $('form#user-stats').on('submit', (e) => {
    e.preventDefault()
    $username = $('#username-input').val()
    $('#username-input').val('').blur()

    $.ajax({
      method: 'GET',
      url: "http://localhost:3000/api/v1/users/find",
      data: {username: $username},
      success: function(data){
        if (data) {
          $('#table').children().remove()
          $('#table').append(tableHtml)
          $('#wpm-th').html('Words Per Minute')
          $('#acc-th').html('Accuracy')
          $('#player-name').html(`Stats for ${data['username']}`)
          data['plays'].forEach(function(play){
            const $wpm = play['wpm']
            const $acc = play['accuracy']
            $('#player-stats').append(`<tr><td>${$wpm}</td><td>${$acc}</td></tr>`)
        })
        }else{
          $('#table').append(`<h4><span class="pfn">Player not found</span></h4>`)
        }

      }
    })
  })

})

