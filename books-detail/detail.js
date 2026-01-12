import { randomColorHex } from '../node_modules/@labstraction/random-color/main.js'
import { BookService } from '../book-service.js';

document.body.style.backgroundColor = randomColorHex();
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');
const bookService = new BookService();
const bookInfo = document.getElementById('book-info');

function displayBookDetails(book) {
    // Crear elementos
    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');
    
    const bookImg = document.createElement('img');
    bookImg.src = book.formats['image/jpeg'];
    bookDetails.appendChild(bookImg);
    
    const bookTitle = document.createElement('h1');
    bookTitle.classList.add('detail-title')
    bookTitle.innerHTML = book.title;
    bookDetails.appendChild(bookTitle)
    bookInfo.appendChild(bookDetails);
    
    // Acordeón 1: Summary
    const summaryBodyOne = document.querySelector('#collapseOne .accordion-body');
    if (summaryBodyOne && book.summaries && book.summaries[0]) {
        summaryBodyOne.textContent = book.summaries[0];
    }
    
    // Acordeón 2: Author
    const authorBody = document.querySelector('#collapseTwo .accordion-body');
    if (authorBody && book.authors && book.authors.length > 0) {
        const author = book.authors[0];
        authorBody.textContent = `${author.name} (${author.birth_year} - ${author.death_year || 'presente'})`;
    }
    
    // Acordeón 3: Bookshelves y Languages
    const bookshelvesBody = document.querySelector('#collapseThree .accordion-body');
    if (bookshelvesBody) {
        bookshelvesBody.innerHTML = '';
        
        // Bookshelves
        if (book.bookshelves && book.bookshelves.length > 0) {
            const bookshelvesTitle = document.createElement('strong');
            bookshelvesTitle.textContent = 'Categories:';
            bookshelvesBody.appendChild(bookshelvesTitle);
            
            const list = document.createElement('ul');
            list.classList.add('mb-3');
            
            book.bookshelves.forEach(shelf => {
                const li = document.createElement('li');
                li.textContent = shelf;
                list.appendChild(li);
            });
            
            bookshelvesBody.appendChild(list);
        }
        
        // Languages
        if (book.languages && book.languages.length > 0) {
            const languagesTitle = document.createElement('strong');
            languagesTitle.textContent = 'Languages: ';
            bookshelvesBody.appendChild(languagesTitle);
            
            const languagesText = document.createElement('span');
            languagesText.textContent = book.languages.join(', ').toUpperCase();
            bookshelvesBody.appendChild(languagesText);
        }
    }
} // ✅ Aquí cierra displayBookDetails

function loadBook() {
    console.log('1. bookId:', bookId);
    bookService.getBooksById(bookId)
        .then(bookData => {
            console.log(bookData);
            displayBookDetails(bookData);
        })
        .catch(error => {
            console.error('Error al cargar el libro', error);
            bookInfo.innerHTML = "<p>No se pudo cargar los datos del libro</p>";
        });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBook);
} else {
    loadBook();
}