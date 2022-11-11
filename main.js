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
}

//Submit book button
document.querySelector('.submitForm').onclick = function() {
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    let status = document.getElementById('status').value;
    
    let bookUpload = new Book(bookTitle, bookAuthor, bookPages, status);
    addBook(bookUpload);
}