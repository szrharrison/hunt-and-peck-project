$(function() {
  let gettingParagraph = Paragraph.random()

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
