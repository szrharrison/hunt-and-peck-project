class Calculations {
  static accuracy(matchesConcern){
  	const totalCorrect = matchesConcern.matches.reduce((total, match) => total + match, 0)
  	return Math.round(totalCorrect / matchesConcern.matches.length * 100)
  }

  static wordsPerMinute(timeElapsed, matchesConcern){
  	const total = matchesConcern.matches.length
  	return total * ( this.accuracy(matchesConcern) / 100 ) / (timeElapsed / 60)
  }
}
