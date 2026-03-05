import { environment } from "./books-detail/environment/environment.dev.js";
// import { environment } from "./books-detail/environment/environment.js";

export class BookService {

  constructor() {
  }
  getBooks() {
    console.log('getting books' + environment.url);
    
    return fetch(environment.url)
      .then(resp => resp.json())
      .then(result => result)

  }

  getBooksById(bookId) {
    return fetch(environment.url + bookId + '/')
      .then(resp => resp.json())
      .then(result => result)
  }
  searchBook(query) {
    return fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}`)
      .then(res => res.json());
  }
}