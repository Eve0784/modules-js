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

    const summaryBodyOne = document.querySelector('#collapseOne .accordion-body');
    if (summaryBodyOne && book.summaries && book.summaries[0]) {
        summaryBodyOne.textContent = book.summaries[0];
    }
    document.querySelector('.accordion-body').textContent = book.summaries[0];

    const summaryBodyTwo = document.querySelector('#collapseTwo .accordion-body');
    if (summaryBodyTwo && book.authors && book.authors.length > 0) {
        const author = book.authors[0];
        summaryBodyTwo.textContent = `${author.name} (${author.birth_year} - ${author.death_year || 'presente'})`;
    }
    document.querySelector('.accordion-body').textContent = book.summaries[0];
    
    
    
    
}

function loadBook() {
    console.log('1. bookId:', bookId);

    bookService.getBooksById(bookId)
        .then(bookData => {
            console.log(bookData);
            displayBookDetails(bookData); // Mostrar datos una vez cargados
        })
        .catch(error => {
            console.error('Error al cargar el libro', error);
            bookInfo.innerHTML = "<p>No se pudo cargar los datos del libro</p>";
        });
}

loadBook();