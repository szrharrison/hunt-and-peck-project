class Calculations {
  static accuracy(matchesConcern){
  	const totalCorrect = matchesConcern.matches.reduce((total, match) => total + match, 0)
  	return Math.round(totalCorrect / matchesConcern.matches.length * 100)
  }

  static wordsPerMinute(timeElapsed, matchesConcern){
  	const total = matchesConcern.matches.length
  	return total * ( this.accuracy(matchesConcern) / 100 ) / (timeElapsed / 60)
  }

  static wordsCorrect(matchesConcern){
    const totalWordsTyped = matchesConcern.matches.length
    const totalCorrect = matchesConcern.matches.reduce((total, match) => total + match, 0)
    let wrongCount = 0
    matchesConcern.matches.forEach(function(el){
      if (el === 0){
        wrongCount ++
      }
    })
    const totalWrong = wrongCount
    return `You got ${totalCorrect} <span class="correct_words">correct</span> and ${totalWrong} <span class="incorrect_words">incorrect</span> out of ${totalWordsTyped} words attempted!`
  }
}
