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
    let countUp = 0
    let countDown = 60
    const view = this
    const wpmData = []
    $('#counter').html(countDown)
    const graph = ParagraphView.renderGraph()
    const timer = setInterval(function() {
      $("#counter").html(countDown -= 1)
      countUp += 1
      const acc = Calculations.accuracy(matchesConcern)
      const wpm = Calculations.wordsPerMinute(countUp, matchesConcern)
      graph.series[0].addPoint([countUp,wpm])
      if(countDown === 0) {
        clearInterval(timer)
        $('#input').prop('disabled', true)
        alert(`You're out of time. Accuracy: ${acc}%. WPM: ${wpm}`)
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

// /**
//  * (c) 2010-2017 Torstein Honsi
//  *
//  * License: www.highcharts.com/license
//  *
//  * Sand-Signika theme for Highcharts JS
//  * @author Torstein Honsi
//  */
//
// 'use strict';
// import Highcharts from '../parts/Globals.js';
// /* global document */
// // Load the fonts
// Highcharts.createElement('link', {
//    href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
//    rel: 'stylesheet',
//    type: 'text/css'
// }, null, document.getElementsByTagName('head')[0]);
//
// // Add the background image to the container
// Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
//    proceed.call(this);
//    this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
// });
//
//
// Highcharts.theme = {
//    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
//       '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
//    chart: {
//       backgroundColor: null,
//       style: {
//          fontFamily: 'Signika, serif'
//       }
//    },
//    title: {
//       style: {
//          color: 'black',
//          fontSize: '16px',
//          fontWeight: 'bold'
//       }
//    },
//    subtitle: {
//       style: {
//          color: 'black'
//       }
//    },
//    tooltip: {
//       borderWidth: 0
//    },
//    legend: {
//       itemStyle: {
//          fontWeight: 'bold',
//          fontSize: '13px'
//       }
//    },
//    xAxis: {
//       labels: {
//          style: {
//             color: '#6e6e70'
//          }
//       }
//    },
//    yAxis: {
//       labels: {
//          style: {
//             color: '#6e6e70'
//          }
//       }
//    },
//    plotOptions: {
//       series: {
//          shadow: true
//       },
//       candlestick: {
//          lineColor: '#404048'
//       },
//       map: {
//          shadow: false
//       }
//    },
//
//    // Highstock specific
//    navigator: {
//       xAxis: {
//          gridLineColor: '#D0D0D8'
//       }
//    },
//    rangeSelector: {
//       buttonTheme: {
//          fill: 'white',
//          stroke: '#C0C0C8',
//          'stroke-width': 1,
//          states: {
//             select: {
//                fill: '#D0D0D8'
//             }
//          }
//       }
//    },
//    scrollbar: {
//       trackBorderColor: '#C0C0C8'
//    },
//
//    // General
//    background2: '#E0E0E8'
//
// };
//
// // Apply the theme
// Highcharts.setOptions(Highcharts.theme);
