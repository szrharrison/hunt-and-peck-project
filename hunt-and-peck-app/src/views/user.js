class UserView {
  static new() {
  	$('#username').html(
  		`<form id='form'>
        <div class='input-field'>
          <label for='inputUsername'>Username</label>
    		  <input type="text" class='input' id='inputUsername'>
        </div><br>
  			<input id="user_submit" type="submit" class="btn purple lighten-3">
  		</form>`
		)
  }
}
