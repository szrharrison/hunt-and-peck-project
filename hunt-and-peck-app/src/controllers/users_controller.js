class UsersController {
  static create(wpm, acc, paraID){
  	$('#form').on('submit', function(e){
  		e.preventDefault()
  		let player = $('#inputUsername').val()
      User.create(player, wpm, acc, paraID)
  	})
  }
}
