class KeyTracking {
  constructor(view, controller, matches) {
    this.view = view
    this.controller = controller
    this.matches = matches
  }
  trackKeys() {
    const text = this.controller.words
    let counter = 0
    let view = this.view
    let matches = this.matches
    $('#input').on('keydown.trackKeys', function(e) {
      if(e.keyCode === 32) {
        e.preventDefault()
        let userInput = $(this).val()
        if (userInput === text[counter]){
          view.highlight($('#paragraph #content'), userInput, 'correct')
          matches.addMatch(1)
        }else{
          view.highlight($('#paragraph #content'), text[counter], 'wrong')
          matches.addMatch(0)
        }
        counter ++
        $(this).val('')
      }
    })
  }
}
