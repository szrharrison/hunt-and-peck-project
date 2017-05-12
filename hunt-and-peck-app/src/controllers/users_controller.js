class UsersController {
  static create(wpm, acc, paraID){
  	$('#form').on('submit', function(e){
  		e.preventDefault()
  		let player = $('#inputUsername').val()
      $('#inputUsername').remove()
      $('#user_submit').remove()
      $('#game-over').html(`Thank you for playing, ${player}!<br><br>`)
      $('#test_results').append('<a class="btn purple lighten-3" href="app.html">Play Again!</a>')
      User.create(player, wpm, acc, paraID)

  	})
  }
}
