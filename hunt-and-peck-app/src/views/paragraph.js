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
    let countDown = 5
    const view = this
    const wpmData = []
    $('#counter').html(countDown)
    const timer = setInterval(function() {
      $("#counter").html(countDown -= 1)
      countUp += 1
      const acc = Calculations.accuracy(matchesConcern)
      const wpm = Calculations.wordsPerMinute(countUp, matchesConcern)
      wpmData.push({time: countUp, wpm: wpm})
      view.renderGraph(wpmData)
      console.log(wpmData)
      if(countDown === 0) {
        clearInterval(timer)
        $('#input').prop('disabled', true)
        alert(`You're out of time. Accuracy: ${acc}%. WPM: ${wpm}`)
        UserView.new()
        UsersController.create(wpm, acc, view.paraID)
      }
    }, 1000)
  }

  static renderGraph(data) {
    const margin = {top: 10, right: 40, bottom: 150, left: 60}
  	const width = 940 - margin.left - margin.right
  	const height = 500 - margin.top - margin.bottom
  	const contextHeight = height - 80
  	const contextWidth = width * .75
    const wpmCount = data.length
    const maxWpm = Math.max(data.map(o => o.wpm))
    const svg = d3.select("#chart-container")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)

    const wpm = []
    const chart = new Chart({
  		data: data.slice(), // copy the array
  		id: 0,
  		name: 'Words Per Minute',
  		width: width,
  		height: height,
  		svg: svg,
  		margin: margin,
  		showBottomAxis: true,
      maxDataPoint: maxWpm
  	})

    function Chart(options){
      this.chartData = options.data
      this.width = options.width
      this.height = options.height
      this.maxDataPoint = options.maxDataPoint
      this.svg = options.svg
      this.id = options.id
      this.name = options.name
      this.margin = options.margin
      this.showBottomAxis = options.showBottomAxis

      var localName = this.name

      this.xScale = d3.scaleLinear()
			    .range([0, this.width])
			    .domain(d3.extent(this.chartData.map(function(d) { return d.time; })))

      /* YScale is linear based on the maxData Point we found earlier */
      this.yScale = d3.scaleLinear()
			    .range([this.height,0])
			    .domain([0,this.maxDataPoint])

      var xS = this.xScale
      var yS = this.yScale
      console.log(d3)
      this.area = d3.area()
      		.interpolate("basis")
      		.x(function(d) { return xS(d.time) })
      		.y0(this.height)
      		.y1(function(d) { return yS(d[localName]) })

      this.svg.append("defs").append("clipPath")
    			.attr("id", `clip-${this.id}`)
    			.append("rect")
    			.attr("width", this.width)
    			.attr("height", this.height)

      /*
      Assign it a class so we can assign a fill color
      And position it on the page
      */

      this.chartContainer = svg.append("g")
    			.attr('class',this.name.toLowerCase())
    			.attr("transform", `translate(${this.margin.left},${this.margin.top + (this.height * this.id) + (10 * this.id)})`)

    /* We've created everything, let's actually add it to the page */

      this.chartContainer.append("path")
    			.data([this.chartData])
    			.attr("class", "chart")
    			.attr("clip-path", `url(#clip-${this.id})`)
    			.attr("d", this.area)

      this.xAxisTop = d3.svg.axis().scale(this.xScale).orient("bottom")
      this.xAxisBottom = d3.svg.axis().scale(this.xScale).orient("top")

      /* We only want a top axis if it's the first country */

      if(this.id == 0){
      	this.chartContainer.append("g")
      			.attr("class", "x axis top")
      			.attr("transform", "translate(0,0)")
      			.call(this.xAxisTop)
      }

      /* Only want a bottom axis on the last country */

      if(this.showBottomAxis){
      	this.chartContainer.append("g")
      		  .attr("class", "x axis bottom")
        		.attr("transform", "translate(0," + this.height + ")")
        		.call(this.xAxisBottom)
      }

      this.yAxis = d3.svg.axis().scale(this.yScale).orient("left").ticks(5)

    	this.chartContainer.append("g")
    			.attr("class", "y axis")
    			.attr("transform", "translate(-15,0)")
    			.call(this.yAxis)

    	this.chartContainer.append("text")
    			.attr("class","country-title")
    			.attr("transform", "translate(15,40)")
    			.text(this.name)
    }

    Chart.prototype.showOnly = function(b){
    	this.xScale.domain(b)
    	this.chartContainer.select("path").data([this.chartData]).attr("d", this.area)
    	this.chartContainer.select(".x.axis.top").call(this.xAxisTop)
    	this.chartContainer.select(".x.axis.bottom").call(this.xAxisBottom)
    }

    const contextXScale = d3.time.scale()
				.range([0, contextWidth])
				.domain(chart.xScale.domain())

    const contextAxis = d3.svg.axis()
    			.scale(contextXScale)
    			.tickSize(contextHeight)
    			.tickPadding(-10)
    			.orient("bottom")

    const contextArea = d3.svg.area()
    			.interpolate("monotone")
    			.x(function(d) { return contextXScale(d.time) })
    			.y0(contextHeight)
    			.y1(0)

    const brush = d3.svg.brush()
    			.x(contextXScale)
    			.on("brush", function() {
            /*
          	this will return a time range to pass into the chart object
          	*/
            var b = brush.empty() ? contextXScale.domain() : brush.extent()

            chart.showOnly(b);
          })

    const context = svg.append("g")
    		.attr("class","context")
    		.attr("transform", `translate(${margin.left + width * .25},${height + margin.top + contextHeight})`)

    context.append("g")
    		.attr("class", "x axis top")
    		.attr("transform", "translate(0,0)")
    		.call(contextAxis)

    context.append("g")
    		.attr("class", "x brush")
    		.call(brush)
    		.selectAll("rect")
    		.attr("y", 0)
    		.attr("height", contextHeight)

    context.append("text")
    		.attr("class","instructions")
    		.attr("transform", `translate(0,${contextHeight + 20})`)
    		.text('Click and drag above to zoom / pan the data')
  }

  updateGraph(data, graph) {

  }
}
