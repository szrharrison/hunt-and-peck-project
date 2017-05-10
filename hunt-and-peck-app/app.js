let matchArray = []
let paragraph = ''
$(function() {
  let gettingParagraph = getParagraph()

  gettingParagraph.then( function(paragraph) {
    let text = randomize( paragraph.content ).join(' ')

    $('#test').html(text)

    $('#input').on('keydown.firstKey', function(e){
      if(e.keyCode !== 32) {
        setTimer()
        trackKeys()
        $('#input').off('keydown.firstKey')
      }
    })
  })


})

function trackKeys() {
  const text = $('#test').text().split(" ")
  let counter = 0
  $('#input').on('keydown.trackKeys', function(e) {
    if(e.keyCode === 32) {
      e.preventDefault()
      let userInput = $(this).val()
      if (userInput === text[counter]){
        highlight($('#test'), userInput, 1)
        matchArray.push(1)
      }else{
        highlight($('#test'), text[counter], 0)
        matchArray.push(0)
      }
      counter ++
      $(this).val('')
    }
  })
}


function textMatch(userInput){
  let match = []
  //iterate through paragraph array to see if words match?
  //something like this?
  for (let i=0; i< text.length; i++){
    if (userInput === text[i]){
      match.push(true)
    } else
      match.push(false)
  }
  // if match, make new array with true or falses as elements?
}

function getParagraph() {
  return $.ajax({
    url: "http://localhost:3000/api/v1/paragraphs/1",
  })
}

function setTimer() {
  var countUp = 0
  var countDown = 60
  $('#counter').html(countDown)
  var timer = setInterval(function() {
    $("#counter").html(countDown -= 1)
    countUp += 1
    const acc = accuracy()
    const wpm = wordsPerMinute(countUp)
    console.log(wpm)
    if(countDown === 0) {
      //populateUser function gets evoked
      populateUser()
      clearInterval(timer)
      alert(`You're out of time. Accuracy: ${acc}%. WPM: ${wpm}`)
    }
  }, 1000)
}

function highlight($nodes, pattern, acc) {
  function innerHighlight($node, pattern, acc) {
    var skip = 0
    if ($node.nodeType == 3) {
      var pos = $node.data.indexOf(pattern)
      if (pos >= 0) {
        var spannode = document.createElement('span')
        if (acc) {
          spannode.className = 'highlight correct'
        } else {
          spannode.className = 'highlight wrong'
        }
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
        i += innerHighlight($node.childNodes[i], pattern, acc)
      }
    }
    return skip
  }

  if ($nodes.length && pattern && pattern.length) {
    return $nodes.each(function() {
      innerHighlight(this, pattern, acc)
    })
  } else {
    return $nodes
  }
}

function accuracy(){
	const totalCorrect = matchArray.reduce((total, match) => total + match, 0)
	return Math.round(totalCorrect / matchArray.length * 100)
}

function wordsPerMinute(timeElapsed){
	const total = matchArray.length
	return total * ( accuracy(matchArray) / 100 ) / (timeElapsed / 60)
}

function removeHighlight(node) {
 return node.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName
  with (this.parentNode) {
   replaceChild(this.firstChild, this)
   normalize()
  }
 }).end()
}

function randomize(paragraph) {
  let pArray = paragraph.split(' ')
  pArray = pArray.map(function(word, i, pArray) {
    return word.replace(/[\.,?;:!"]/, '')
  })

  for (let i = pArray.length; i; i--) {
    // Set j to a random element that doesn't include the current element or any elements afterwards
    let j = Math.floor(Math.random() * i);
    // Swap a random element with the current element in the loop
    [pArray[i - 1], pArray[j]] = [pArray[j], pArray[i - 1]];
  }
  return pArray
}
