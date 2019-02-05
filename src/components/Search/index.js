import React, { Component } from 'react'
import * as BooksAPI from '../../helpers/BooksAPI'
import BookFormatter from '../../helpers/BookFormatter'
import Book from '../Book'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';

export default class Search extends Component {

  state = {
    books: []
  }

  clearSearchList = () => {
    this.setState({
      books: []
    })
  }

  search = async (text) => {
    if(!text) {
      this.clearSearchList()
      return
    }

    const booksSearched = await BooksAPI.search(text)
    
    if (booksSearched.error) {
      this.clearSearchList()
      return
    }
    
    const booksFix = BookFormatter.safeBook(booksSearched, this.props.books)
    
    this.setState({
      books: booksFix
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              debounceTimeout={300}
              onChange={(event) => this.search(event.target.value)}
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} changeList={this.props.changeList} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
