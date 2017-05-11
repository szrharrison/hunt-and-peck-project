class UserView {
  static new() {
  	$('#username').html(
  		`<form id='form'>
  		  <input type="text" class='input' id='inputUsername' placeholder="Username"><br>
  			<input id="user_submit" type="submit" class="btn purple lighten-3">
  		</form>`
		)
  }
}
