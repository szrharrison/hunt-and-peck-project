class ParagraphView {

  constructor(paragraph, paraID) {
    this.paragraph = paragraph
    this.paraID = paraID
  }

  render() {
    $('#paragraph #content').html(this.paragraph)
  }

  highlight($nodes, pattern, className) {
    function innerHighlight($node, pattern, className) {
      var skip = 0
      if ($node.nodeType == 3) {
        var pos = $node.data.indexOf(pattern)
        if (pos >= 0) {
          var spannode = document.createElement('span')
          spannode.className = `highlight ${className}`
          var middlebit = $node.splitText(pos)
          var endbit = middlebit.splitText(pattern.length)
          var middleclone = middlebit.cloneNode(true)
          spannode.appendChild(middleclone)
          middlebit.parentNode.replaceChild(spannode, middlebit)
          skip = 1
          return
        }
      } else if ($node.nodeType == 1 && !$node.className && $node.childNodes && !/(script|style)/i.test($node.tagName)) {
        for (var i = 0; i < $node.childNodes.length; ++i) {
          i += innerHighlight($node.childNodes[i], pattern, className)
        }
      }
      return skip
    }

    if ($nodes.length && pattern && pattern.length) {
      return $nodes.each(function() {
        innerHighlight(this, pattern, className)
      })
    } else {
      return $nodes
    }
  }

  timer(matchesConcern) {
    var countUp = 0
    var countDown = 5
    var paraID = this.paraID
    $('#counter').html(`${countDown} seconds`)
    var timer = setInterval(function() {
      $("#counter").html(`${countDown -= 1} seconds`)
      countUp += 1
      const acc = Calculations.accuracy(matchesConcern)
      const wpm = Calculations.wordsPerMinute(countUp, matchesConcern)
      const resultsMsg = Calculations.wordsCorrect(matchesConcern)
      console.log(wpm)
      if(countDown === 0) {
        clearInterval(timer)
        $('#input').prop('disabled', true)
        alert(`You're out of time.`)
        $('#test_results').append(resultsMsg)
        $('#test_results').append(`<ul> <strong>Accuracy:</strong> ${acc}%. <strong>WPM:</strong> ${wpm}</ul>`)
        UserView.new()
        UsersController.create(wpm, acc, paraID)
      }
    }, 1000)
  }
}
