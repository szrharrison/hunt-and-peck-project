$(function() {
  let gettingParagraph = Paragraph.random()

  $('#more_info').click(function(){
    if ($('#more_info').html().includes("More Tips")){
      $('#more_info').html(`<i class="material-icons left">swap_vertical_circle</i>Less Tips`)
    }else{
      $('#more_info').html(`<i class="material-icons left">swap_vert</i>More Tips`)
    }
    $('#keyboard_tips').slideToggle()

  })

  gettingParagraph.then( function(paragraph) {
    const paragraphController = new ParagraphsController(paragraph)
    const paragraphView = new ParagraphView( paragraphController )
    paragraphView.render()
    const matchesConcern = new Matches()
    const keyTracking = new KeyTracking(paragraphView, paragraphController, matchesConcern)
    $('#input').on('keydown.firstKey', function(e){
      if(e.keyCode !== 32) {
        $('#logo').remove()
        $('#keyboard_gif').remove()
        $('#input').prop('placeholder', '')
        paragraphView.timer(matchesConcern)
        keyTracking.trackKeys()
        $('#input').off('keydown.firstKey')
      }
    })
  })
})
