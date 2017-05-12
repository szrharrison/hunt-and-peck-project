class KeyTracking {
  constructor(view, controller, matches) {
    this.view = view
    this.controller = controller
    this.matches = matches
  }

  trackKeys() {
    const text = this.controller.words
    let counter = 0
    let lineNum = 1
    let view = this.view
    let matches = this.matches
    let wrapWordIndex = this.view.wrapWordIndexes
    view.highlight($('#paragraph #content'), text[counter], 'current')
    $('#input').on('keydown.trackKeys', function(e) {
      if(e.keyCode === 32) {
        e.preventDefault()
        let userInput = $(this).val()
        if ( userInput !== '' ) {
          if (wrapWordIndex.includes(counter)){
            $('#paragraph').animate({scrollTop: 54 * lineNum + 10}, 1000)
            lineNum ++
          }
          if ( userInput === text[counter]) {
            if( $(`#word-${counter}`)[0] ){
              $(`#word-${counter}`)[0].className= 'highlight correct'
            }
            matches.addMatch(1)
          } else {
            $(`#word-${counter}`)[0].className = 'highlight wrong'
            matches.addMatch(0)
          }

          $(`#word-${counter + 1}`)[0].className = 'highlight current'
          counter ++
          $(this).val('')
        }
      }

    })
  }


}
