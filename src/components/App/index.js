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
    const local = localStorage.getItem('state')
    if (!local) {
      const response = await BooksAPI.getAll()
      const state = {
        books: response,
      }
      this.setState({
        ...this.state,
        ...state
      })
      localStorage.setItem('state', JSON.stringify(state))
      return
    }
    this.setState({ books: JSON.parse(local).books })
  }

  changeList = (selectBook, destinationShelf) => {
    
    const booksListUpdated = this.state.books.filter((book) => book.id !== selectBook.id)

    const bookUpdated = Object.assign(selectBook, { shelf: destinationShelf })

    const state = {
      books: [...booksListUpdated, bookUpdated]
    }
    this.setState({
      ...this.state,
      ...state
    }, () => {
      const { books } = this.state
      localStorage.setItem('state', JSON.stringify(books))
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
