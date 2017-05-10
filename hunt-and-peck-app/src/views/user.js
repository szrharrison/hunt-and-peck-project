class UserView {
  static new() {
  	$('#username').html(
  		`<form id='form'>
  		  <input type="text" id='inputUsername' placeholder="Username">
  			<input type="submit">
  		</form>`
		)
  }
}
