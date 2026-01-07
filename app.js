import {randomColorHex} from './node_modules/@labstraction/random-color/main.js'
import {BookService} from './book-service.js';
document.body.style.backgroundColor= randomColorHex();

const service = new BookService();
service.getBooks()
.then(booksData =>displayBooks(booksData));

function displayBooks(booksData) {
    console.log('display', booksData);
    
    const container = document.getElementById('books-container');
    container.innerHTML='';

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
        detailLink.href = './detail.html?id='+book.id;
        detailLink.textContent = 'Apri Dettaglio'
        cardBody.appendChild(detailLink); 
        
        container.appendChild(cardDiv)
    }
    
}

function reduceSummary(summary) {
    const maxLength = 20;
    let words = summary.split(' ');
    let end = '';
    if (words.length > maxLength) {
        words = words.slice(0, maxLength);
        end = '...'
    }
    const newSummary = words.join(' ')+ end;
    return newSummary;
    
}