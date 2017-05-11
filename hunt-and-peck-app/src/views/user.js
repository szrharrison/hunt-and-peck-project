class UserView {
  static new() {
  	$('#username').html(
  		`<form id='form'>
  		  <input type="text" class='input' id='inputUsername' placeholder="Username">
  			<input id="user_submit" type="submit" class="center btn purple lighten-3">
  		</form>`
		)
  }
}
