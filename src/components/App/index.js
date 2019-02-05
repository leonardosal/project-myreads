import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../../helpers/BooksAPI'
import Library from '../Library'
import Search from '../Search'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const local = localStorage.getItem('booksList')
    if (!local) {
      const books = await BooksAPI.getAll()

      if(books) {
        this.setState({
          books
        })
        localStorage.setItem('booksList', JSON.stringify(books))
      }

      return
    }
    this.setState({ books: JSON.parse(local) })
  }

  changeList = (selectBook, destinationShelf) => {
    
    const booksListUpdated = this.state.books.filter((book) => book.id !== selectBook.id)

    const bookUpdated = Object.assign(selectBook, { shelf: destinationShelf })

    this.setState({
      books: [...booksListUpdated, bookUpdated]
    }, () => {
      const { books } = this.state
      localStorage.setItem('booksList', JSON.stringify(books))
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <Library books={this.state.books}
            changeList={this.changeList} />
          )} />
        <Route path='/search' render={() => (
            <Search books={this.state.books}
            changeList={this.changeList} />
          )} />
      </div>
    )
  }
}

export default BooksApp
