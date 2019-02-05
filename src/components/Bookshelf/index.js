import React from 'react'
import Book from '../Book'
import * as BookFormatter from '../../helpers/BookFormatter'

const Bookshelf = (props) => {
  const shelf = BookFormatter.getShelfName(props.shelfName)
  return (
  <div className="bookshelf">
  <h2 className="bookshelf-title">{shelf}</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">
     {props.bookList
      .filter((book) => book.shelf.includes(props.shelfName))
      .map((book) => (
        <li key={book.id}>
          <Book book={book} changeList={props.changeList} />
        </li>))}
    </ol>
  </div>
</div>
)}

export default Bookshelf
