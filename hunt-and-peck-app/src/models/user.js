class User {
  static create(username, wpm, acc, paraID) {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users',
      data: {
        user: {
          username: username,
          play: {
            wpm: wpm,
            accuracy: acc,
            paragraph_id: paraID
          }
        }
      }
    })
  }
}
