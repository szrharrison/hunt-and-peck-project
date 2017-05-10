class Paragraph {
  static all() {
    return $.ajax({
      url: "http://localhost:3000/api/v1/paragraphs"
    })
  }

  static random() {
    return $.ajax({
      url: "http://localhost:3000/api/v1/paragraphs/rand",
    })
  }
}
