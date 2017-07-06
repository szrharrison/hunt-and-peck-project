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

    //gauge chart definitions start here
    let gData
    let gOptions
    let gChart
    google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      gData = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['WPM', 0]
      ]);

      gOptions = {
        width: 350, height: 200,
        redFrom: 100, redTo: 150,
        yellowFrom:60, yellowTo: 100,
        greenFrom: 20, greenTo: 60,
        max: 150,
        minorTicks: 5
      };

      gChart = new google.visualization.Gauge(document.getElementById('chart_div'));

      //this is the initial chart render
      gChart.draw(gData, gOptions);
    }
    $('#chart_div').fadeIn(800)
    const view = this
    const wpmData = []
    $('#counter').fadeIn(800)
    $('#counter #count-down').html(`${countDown}`)
    const graph = ParagraphView.renderGraph()
    graph.setSize(null,250)
    $('#counter').addClass('counting')
    const timer = setInterval(function() {
      $("#counter #count-down").html(`${countDown -= 1}`)
      countUp += 1
      const acc = Calculations.accuracy(matchesConcern)
      const wpm = Calculations.wordsPerMinute(countUp, matchesConcern)
      const resultsMsg = Calculations.wordsCorrect(matchesConcern)

      //gauge redraws start here and run based on our setInterval function

      gData.setValue(0, 1, wpm);
      gChart.draw(gData, gOptions);

      //guage end
      graph.series[0].addPoint([countUp,wpm])
      if(countDown === 0) {
        $('#input').remove()

        $('#test_results').append(resultsMsg)
        $('#test_results').append(`<ul> <strong>Accuracy:</strong> ${acc}%. <strong>WPM:</strong> ${wpm}</ul>`)
        $('#test_results').append(`<div id="game-over">Please type your name in to save your results!</div>`)
        UserView.new()
        UsersController.create(wpm, acc, view.paraID)
        clearInterval(timer)
        alert(`You're out of time.`)
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
