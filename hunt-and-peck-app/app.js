$(function() {
  getParagraph()


  $('#input').on('keydown.firstKey', function(e){
    if(e.keyCode == 32){
      console.log('SB')
    } else {

      setTimer()
      trackKeys()
      $('#input').off('keydown.firstKey')
    }
  })
})

function trackKeys() {
  const text = $('#test').text().split(" ")
  let counter = 0
  let matchArray = []
  $('#input').on('keydown.trackKeys', function(e) {
    console.log(e.keyCode)
    if(e.keyCode === 32) {
      let userInput = $(this).val()
      if (userInput === text[counter]){
        matchArray.push(1)
        console.log("PUSHED 1")
      }else{
        matchArray.push(0)
        console.log("PUSHED 2")
      }
      counter ++
      // console.log(userInput)
      // textMatch(userInput)
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
  $.ajax({
    url: "http://localhost:3000/paragraphs/1",
    success: function(data){
      $('#test').html(data.content)
    }
  })
}

function setTimer() {
  var count = 60
  $('#counter').html(count)
  var timer = setInterval(function() {
    $("#counter").html(count -= 1)

    if(count === 0) {
      clearInterval(timer)
      alert(`You're out of time`)
    }
  }, 1000)
}

jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat)
   if (pos >= 0) {
    var spannode = document.createElement('span')
    spannode.className = 'highlight'
    var middlebit = node.splitText(pos)
    var endbit = middlebit.splitText(pat.length)
    var middleclone = middlebit.cloneNode(true)
    spannode.appendChild(middleclone)
    middlebit.parentNode.replaceChild(spannode, middlebit)
    skip = 1
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat)
   }
  }
  return skip
 }
 return this.length && pat && pat.length ? this.each(function() {
  innerHighlight(this, pat.toUpperCase())
 }) : this
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName
  with (this.parentNode) {
   replaceChild(this.firstChild, this)
   normalize()
  }
 }).end()
}

// function highlight($node, pattern) {
//   let node = $node[0]
//   console.log(node.nodeType)
//  function innerHighlight(node, pattern) {
//   var skip = 0
//   if (node.nodeType == 3) {
//    var pos = node.data.indexOf(pattern)
//    if (pos >= 0) {
//     var spannode = document.createElement('span')
//     spannode.className = 'highlight'
//     var middlebit = node.splitText(pos)
//     var endbit = middlebit.splitText(pattern.length)
//     var middleclone = middlebit.cloneNode(true)
//     spannode.appendChild(middleclone)
//     middlebit.parentNode.replaceChild(spannode, middlebit)
//     skip = 1
//    }
//  } else {
//   if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
//     console.log('got here')
//    for (var i = 0; i < node.childNodes.length; ++i) {
//     i += innerHighlight(node.childNodes[i], pattern)
//    }
//   }
//   return skip
//  }
//  if (node.length && pattern && pattern.length) {
//    return node.each(function() {
//     innerHighlight(node, pattern.toUpperCase());
//   })
//   } else {
//     return node
//   }
// };
//
// function removeHighlight(node) {
//  return node.find("span.highlight").each(function() {
//   this.parentNode.firstChild.nodeName
//   with (this.parentNode) {
//    replaceChild(this.firstChild, this)
//    normalize()
//   }
//  }).end()
// };
