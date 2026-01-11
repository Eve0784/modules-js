export class BookService {
  static url = 'https://gutendex.com/books/'
  constructor() {
  }
  getBooks() {
    return fetch(BookService.url)
      .then(resp => resp.json())
      .then(result => result)

  }

  getBooksById(bookId) {
    return fetch(BookService.url + bookId + '/')
      .then(resp => resp.json())
      .then(result => result)
  }
  searchBook(query) {
    return fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}`)
      .then(res => res.json());
  }
}