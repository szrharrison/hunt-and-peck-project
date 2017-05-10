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
    view.highlight($('#paragraph #content'), text[counter], 'current')
    $('#input').on('keydown.trackKeys', function(e) {
      if(e.keyCode === 32) {
        e.preventDefault()
        let userInput = $(this).val()
        if (userInput === text[counter]){
          console.log(text[counter])
          if ($(`#paragraph #content span:contains(${text[counter]})`)[0]){
            Array.from($(`#paragraph #content span:contains(${text[counter]})`)).forEach(function(el){
              el.className= 'highlight correct'
            })
          }
          matches.addMatch(1)
        }else{
          $(`#paragraph #content span:contains(${text[counter]})`)[0].className = 'highlight wrong'

          matches.addMatch(0)
        }
        view.highlight($('#paragraph #content'), text[counter + 1], 'current')
        counter ++
        $(this).val('')
      }
    })
  }
}
