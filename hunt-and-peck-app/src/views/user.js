class UserView {
  static new() {
  	$('#username').html(
  		`<form id='form'>
  		  <input type="text" class='input' id='inputUsername' placeholder="Username">
  			<input type="submit" class="btn purple lighten-3">
  		</form>`
		)
  }
}
