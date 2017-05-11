class ParagraphView {

  constructor(controller ) {
    this.paragraph = controller.randomText
    this.controller = controller
    this.paraID = controller.paraID
  }

  render() {
    const wrapWordIndexes = []
    let current = $('#content')
    $('#content').html(`<span id="word-0" class="next-word">${this.controller.words[0]}</span>`)
    let height = current.height()

    for(let i = 1; i < this.controller.words.length; i++){
        current.html(`${current.html()} <span id="word-${i}" class="next-word">${this.controller.words[i]}</span>`)
        if ( current.height() > height ) {
            height = current.height()
            wrapWordIndexes.push(i-1)
        }
    }
    wrapWordIndexes.shift()
    this.wrapWordIndexes = wrapWordIndexes
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
    let countUp = 0
    let countDown = 60
    const view = this
    const wpmData = []
    $('#counter').html(`${countDown} seconds`)
    const graph = ParagraphView.renderGraph()
    const timer = setInterval(function() {
      $("#counter").html(`${countDown -= 1} seconds`)
      countUp += 1
      const acc = Calculations.accuracy(matchesConcern)
      const wpm = Calculations.wordsPerMinute(countUp, matchesConcern)
      const resultsMsg = Calculations.wordsCorrect(matchesConcern)
      graph.series[0].addPoint([countUp,wpm])
      if(countDown === 0) {
        clearInterval(timer)
        $('#input').prop('disabled', true)
        alert(`You're out of time.`)
        $('#test_results').append(resultsMsg)
        $('#test_results').append(`<ul> <strong>Accuracy:</strong> ${acc}%. <strong>WPM:</strong> ${wpm}</ul>`)
        UserView.new()
        UsersController.create(wpm, acc, view.paraID)
      }
    }, 1000)
  }

  static renderGraph() {
    return Highcharts.chart('chart-container', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function() {
                }
            }
        },
        title: {
            text: 'Words Per Minute'
        },
        xAxis: {
            title: {
              text: 'Time (s)'
            },
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Words Per Minute (w/min)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.series.name}</b><br/>${Highcharts.numberFormat(this.x, 1)} s<br/>${Highcharts.numberFormat(this.y, 2)} wpm`
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'WPM',
            data: (function () {
                const data = []
                return data
            }())
        }]
    });
  }

  updateGraph(data) {


  }
}
