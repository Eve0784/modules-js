import {randomColorHex} from './node_modules/@labstraction/random-color/main.js'
import {BookService} from './book-service.js';
document.body.style.backgroundColor= randomColorHex();

const service = new BookService()
service.getBooks()
.then(booksData => displayDetails(booksData));

function displayDetails(booksData) {
    const detailContainer= document.getElementById('detail-container')
    detailContainer.innerHTML = '';

    
    
}