class KeyTracking {
  constructor(view, controller, matches) {
    this.view = view
    this.controller = controller
    this.matches = matches
    const wrapWordIndexes = []
    const wrapWords = []
    let current = $('#content')
    $('#content').text(this.controller.words[0])
    let height = current.height()

      for(let i = 1; i < this.controller.words.length; i++){
          current.text(current.text() + ' ' + this.controller.words[i])
          if ( current.height() > height ) {
              height = current.height()
              wrapWordIndexes.push(i-1)
              wrapWords.push(this.controller.words[i-1])
          }
      }
      wrapWordIndexes.shift()
      this.wrapWordIndexes = wrapWordIndexes
  }

  trackKeys() {
    const text = this.controller.words
    let counter = 0
    let lineNum = 1
    let view = this.view
    let matches = this.matches
    let wrapWordIndex = this.wrapWordIndexes
    view.highlight($('#paragraph #content'), text[counter], 'current')
    $('#input').on('keydown.trackKeys', function(e) {
      if(e.keyCode === 32) {
        e.preventDefault()
        if (wrapWordIndex.includes(counter)){
          $('#paragraph').animate({scrollTop: 54 * lineNum + 10}, 1000)
          lineNum ++
        }
        let userInput = $(this).val()
        if (userInput === text[counter]){
          if ($(`span:contains(${text[counter]}).highlight.current`)[0]){
            Array.from($(`span:contains(${text[counter]}).highlight.current`)).forEach(function(el){
              el.className= 'highlight correct'
            })
          }
          matches.addMatch(1)
        }else{
          $(`span:contains(${text[counter]}).highlight.current`)[0].className = 'highlight wrong'

          matches.addMatch(0)
        }
        view.highlight($('#paragraph #content'), text[counter + 1], 'current')
        counter ++
        $(this).val('')
      }

    })
  }

  
}


