import { randomColorHex } from './node_modules/@labstraction/random-color/main.js'
import { BookService } from './book-service.js';
document.body.style.backgroundColor = randomColorHex();

const service = new BookService();
service.getBooks()
    .then(booksData => displayBooks(booksData));

function displayBooks(booksData) {
    console.log('display', booksData);
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    for (const book of booksData.results) {

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        // cardDiv.classList.add('col')
        cardDiv.style.width = '18rem';

        const topImg = document.createElement('img');
        topImg.classList.add('card-img-top');
        topImg.classList.add('img-cover')
        topImg.src = book.formats['image/jpeg'];
        cardDiv.appendChild(topImg);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardDiv.appendChild(cardBody);

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = book.title;
        cardBody.appendChild(cardTitle);
        cardDiv.appendChild(cardBody);

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = reduceSummary(book.summaries[0]);
        cardBody.appendChild(cardText);

        const detailLink = document.createElement('a');
        detailLink.classList.add('btn');
        detailLink.classList.add('btn-primary');

        console.log('Book ID:', book.id); // ← Agregar esto para debug
        console.log('Book completo:', book); // ← Ver el objeto completo
        detailLink.href = './books-detail/detail.html?id=' + book.id;
        detailLink.textContent = 'Apri Dettaglio'
        cardBody.appendChild(detailLink);

        container.appendChild(cardDiv)
    }

}

function reduceSummary(summary) {
       if (!summary) {
        return 'Nessuna descrizione disponibile';
    }
    const maxLength = 20;
    let words = summary.split(' ');
    let end = '';
    if (words.length > maxLength) {
        words = words.slice(0, maxLength);
        end = '...'
    }
    const newSummary = words.join(' ') + end;
    return newSummary;

}

// Prevenir el submit del formulario
const searchForm = document.querySelector('form[role="search"]');
const searchInput = document.getElementById('search');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que recargue la página
    const query = searchInput.value.trim();
      console.log('Submit prevenido'); 
    if (query.length >= 3) {
        service.searchBook(query)
            .then(data => {
                console.log('Datos recibidos:', data);
                displayBooks(data);
            })
            .catch(error => {
                console.error('Errore nella ricerca:', error);
            });
    }
});


// event listener
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
     console.log('Query escrita:', query, 'Longitud:', query.length); 

    // reicerca se almeno ci sono 3 caratteri
    if (query.length >= 3) {
        console.log('Iniciando búsqueda para:', query);
        service.searchBook(query)
            .then(data => {
                console.log('Datos recibidos:', data) 
                displayBooks(data);
            })
            .catch(error => {
                console.error('Errore nella ricerca:', error);
            });
    }else if (query.length === 0) {
        console.log('Campo vacío, mostrando todos los libros')
        //cancella tutto e mostra i libri di nuovo
        service.getBooks()
            .then(booksData => displayBooks(booksData));
    }
});
