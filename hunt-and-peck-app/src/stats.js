$(function() {

  // ajax request for top 10 plays by wpms
  $.ajax({
    method: 'GET',
    url: "http://localhost:3000/api/v1/statistics/topplays",
    success: function(stats){
      // iterate over data and render each stat
      var lis = stats.map(function(stat){
        const $wpm = stat['wpm']
        const $user = stat['user']['username']
        $('#topplays').append(`<tr><td>${$wpm}</td><td>${$user}</td></tr>`)
      })
    }
  })

  // // ajax request for most accurate users
  // // the response i'm getting isn't something the app can work with
  // $.ajax({
  //   method: 'GET',
  //   url: "http://localhost:3000/api/v1/statistics/mostaccurateusers",
  //   success: function(stats){
  //     stats.forEach(function(stat){
  //       console.log(`ACCURACY: ${stats['accuracy']}`)
  //     })
  //   }
  // })

  //get username from form
  $('form#user-stats').on('submit', (e) => {
      e.preventDefault()
      $username = $('#username').val()

      $.ajax({
        method: 'GET',
        url: "http://localhost:3000/api/v1/users/find",
        data: {username: $username},
        success: function(data){
          console.log(data)
          $('#player').html(`${data['username']}`)
        }
      })
    })




  // let gettingParagraph = Paragraph.random()

  // gettingParagraph.then( function(paragraph) {
  //   const paragraphController = new ParagraphsController(paragraph)
  //   const paragraphView = new ParagraphView( paragraphController.randomText, paragraph.id )
  //   const matchesConcern = new Matches()
  //   const keyTracking = new KeyTracking(paragraphView, paragraphController, matchesConcern)
  //   paragraphView.render()
  //   $('#input').on('keydown.firstKey', function(e){
  //     if(e.keyCode !== 32) {
  //       paragraphView.timer(matchesConcern)
  //       keyTracking.trackKeys()
  //       $('#input').off('keydown.firstKey')
  //     }
  //   })
  // })
})

 // + Top 10 plays by WPM
 // + search for username stats
 // + Top 10 most accurate user