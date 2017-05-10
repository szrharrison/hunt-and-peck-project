function populateUser(){
	$('#username').html(
		`<form id='form'> 
			<input type="text" id='inputUsername' placeholder="Username">
			<input type="submit">
			</form>`
		)
}



function submitUserInfo(wpm, acc, paraID){
	$('#form').on('submit', function(e){
		e.preventDefault()
		console.log(wpm, paraID)
		let player = $('#inputUsername').val()
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/api/v1/users',
			data: {
				user: {
					username: player,
					play: {
						wpm: wpm,
						accuracy: acc,
						paragraph_id: paraID,
						dude: 'dude'
					}
				}
			}
		})
	})
	
}