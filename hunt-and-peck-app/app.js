console.log('ok')

$.ajax({
	url: "http://localhost:3000/paragraphs/1",
	success: function(data){
		$('#test').html(data.content)
	}
})

