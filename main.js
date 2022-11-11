let myLib = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, pages, ${this.read}`;
}

function addBook(book) {
    myLib.push(book);
}

// Add book button function
document.getElementById('add').onclick = function() {
    document.getElementById('bookForm').style.display = 'flex';
    document.querySelector('.formButtons').style.display = 'flex';
}

// Close Form button function
document.querySelector('.closeForm').onclick = function() {
    document.getElementById('bookForm').style.display = 'none';
    document.querySelector('.formButtons').style.display = 'none';
    document.querySelectorAll('input').forEach(input => input.value = '');
}

// Delete All button function
document.getElementById('clear').onclick = function() {
    document.querySelector('.bookshelf').innerHTML = '';
    myLib = [];
}

let shownBooks = document.querySelector('.bookshelf').children.length;

const addToMain = (bookTitle, bookAuthor, bookPages, bookStatus) => {
    
    for (i = 0; i < myLib.length; i++) {
        const div = document.createElement('div');
        document.querySelector('.bookshelf').appendChild(div).id = 'card'+i;

        //Create card element
        const card = document.getElementById('card'+i);
        card.setAttribute('class', 'card');
        card.innerHTML = '<div class=title>Title:</div>';
        card.firstChild.setAttribute('id', 'title'+i);

        //Create title parent and child
        const titleParent = document.getElementById('title'+i);
        titleParent.innerHTML += '<div class=title-name></div>';
        titleParent.children[0].setAttribute('id', 'titlename'+i);
        titleParent.children[0].innerHTML = bookTitle;

        //Create author parent and child
        document.getElementById('title'+i).insertAdjacentHTML("afterend", '<div class=author>Author:</div>');
        card.children[1].setAttribute('id', 'author'+i);
        const authorParent = document.getElementById('author'+i)
        authorParent.innerHTML += '<div class=author-name></div>';
        authorParent.children[0].setAttribute('id', 'authorname'+i);
        authorParent.children[0].innerHTML = bookAuthor;

        //Create page count parent and child
        document.getElementById('author'+i).insertAdjacentHTML("afterend", '<div class=pages>Pages:</div>');
        card.children[2].setAttribute('id', 'pages'+i);
        const pagesParent = document.getElementById('pages'+i);
        pagesParent.innerHTML += '<div class=page-count></div>';
        pagesParent.children[0].setAttribute('id', 'pagecount'+i); 
        pagesParent.children[0].innerHTML = bookPages;

        //Create status memo line
        document.getElementById('pages'+i).insertAdjacentHTML("afterend", '<div class=status></div>')
        card.children[3].setAttribute('id', 'status'+i);
        (bookStatus == 'yes') ? document.getElementById('status'+i).innerHTML = 'Finished' : 
        document.getElementById('status'+i).innerHTML = 'Not Started';
    }

}

//Submit book button
document.querySelector('.submitForm').onclick = function(e) {
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    let status = document.getElementById('status').value;
    
    let bookUpload = new Book(bookTitle, bookAuthor, bookPages, status);
    addBook(bookUpload);
    e.preventDefault();
    
    if (document.querySelector('.bookshelf')) {
        document.querySelector('.bookshelf').innerHTML = '';
        addToMain(bookTitle, bookAuthor, bookPages, status);
    } else {
        addToMain(bookTitle, bookAuthor, bookPages, status);
    }

    document.querySelectorAll('input').forEach(input => input.value = '');
}