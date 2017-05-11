class ParagraphsController {
  constructor(paragraph) {
    this.content = paragraph.content
    this.randomText = ParagraphsController.randomize( paragraph.content ).join(' ').toLowerCase()
    this.paraID = paragraph.id
    this.words = this.randomText.split(' ')
    this.letters = this.randomText.split('')
  }

  static randomize(paragraph) {
    let pArray = paragraph.replace(/[\.,?;:!"\s]/g, ' ').split(' ')
    pArray = clean(pArray, '')
    for (let i = pArray.length; i; i--) {
      // Set j to a random element that doesn't include the current element or any elements afterwards
      let j = Math.floor(Math.random() * i);
      // Swap a random element with the current element in the loop
      [pArray[i - 1], pArray[j]] = [pArray[j], pArray[i - 1]];
    }
    return pArray
  }

}
  


function clean(array, deleteValue) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == deleteValue) {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}
