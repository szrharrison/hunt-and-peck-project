class KeyTracking {
  constructor(view, controller, matches) {
    this.view = view
    this.controller = controller
    this.matches = matches
  }
  trackKeys() {
    const text = this.controller.words
    let counter = 0
    let letterCounter = 0
    let view = this.view
    let matches = this.matches
    let singleWordArray = []
    singleWordArray.push(text[counter])
    $('#input').on('keyup.trackKeys', function(e) {
      view.highlight($('#paragraph #content'), text[counter], 'current')
      // console.log(singleWordArray)
      // const key = parseInt(e.which || e.detail)
      let userInput = $(this).val()
      let lettersArray = singleWordArray[0].split('')
      console.log(key, String.fromCharCode(key).toLowerCase(),lettersArray[letterCounter] )
      if (String.fromCharCode(key).toLowerCase() === lettersArray[letterCounter]){
        view.letterHighlight($('#paragraph #content'), lettersArray[letterCounter], 'colorCorrect')
        letterCounter ++

      }else{
        view.letterHighlight($('#paragraph #content'), lettersArray[letterCounter], 'colorWrong')
        letterCounter ++
      }
      if (e.keyCode === 8 && letterCounter != 0){
        //remove highlight
          letterCounter --
      }
      console.log(letterCounter)
      if(e.keyCode === 32) {
        e.preventDefault()
        singleWordArray.shift(text[counter])
        if (userInput === text[counter]){
          view.highlight($('#paragraph #content'), text[counter], 'correct')
          matches.addMatch(1)
        }else{
          view.highlight($('#paragraph #content'), text[counter], 'wrong')
          matches.addMatch(0)
        }
        counter ++
        singleWordArray.push(text[counter])
        letterCounter = 0
        $(this).val('')
      }
    })
  }
  }
