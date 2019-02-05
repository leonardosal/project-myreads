const safeBook = (booksSearched, booksCategorized) => {
  return booksSearched.map((book) => {
    return !book.imageLinks ?
      Object.assign(book, { imageLinks: { thumbnail: 'http://via.placeholder.com/128x193?text=No%20Cover' } }) :
      Object.assign({}, book)
  }).map((book) => {
    return !book.authors ?
      Object.assign(book, { authors: [] }) :
      Object.assign({}, book)
  }).map((book) => {
    const bookSearch = booksCategorized.find((item) => item.id === book.id)
    return !bookSearch ?
      Object.assign(book, { shelf: 'none' }) :
      Object.assign({}, bookSearch)
  })
}

const getShelfName = (option) => {
  return {
    'currentlyReading': 'Currently Reading',
    'read': 'Read',
    'wantToRead': 'Want To Read'
  }[option]
}

module.exports = { safeBook, getShelfName }