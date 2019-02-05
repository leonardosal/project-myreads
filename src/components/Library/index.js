import React, { Component } from 'react'
import Bookshelf from '../Bookshelf'
import { Link } from 'react-router-dom'

export default class Library extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf changeList={this.props.changeList} bookList={this.props.books} shelfName="currentlyReading" />
            <Bookshelf changeList={this.props.changeList} bookList={this.props.books} shelfName="wantToRead" />
            <Bookshelf changeList={this.props.changeList} bookList={this.props.books} shelfName="read" />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>)
  }
}
