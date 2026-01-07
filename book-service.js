export class BookService {
    constructor() {  
        this.baseUrl='https://gutendex.com/books/';
    }
      getBooks(){
        const url = this.baseUrl;
        return fetch(url)
        .then(resp=> resp.json())
        .then(result => result)
            
        }

    getBooksById(id){
        const url = this.baseUrl
    }
}