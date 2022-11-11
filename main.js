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

const addToMain = () => {
    
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
        titleParent.innerHTML += '<div class=card-btns><button class=status-toggle></button><button class=card-delete></button></div>';
        titleParent.children[1].setAttribute('id', 'cardbtns'+i);
        titleParent.children[0].innerHTML = myLib[i].title;

        const cardBtns = document.getElementById('cardbtns'+i);
        cardBtns.children[0].setAttribute('id', 'st'+i)
        cardBtns.children[1].setAttribute('id', i);
        cardBtns.children[0].innerHTML = `<svg style="width:15px;height:15px" viewBox="0 0 24 24">
        <path fill="white" d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" />
        </svg>`;
        cardBtns.children[1].innerHTML = `<svg style="width:15px;height:15px" viewBox="0 0 24 24">
        <path fill="white" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
        </svg>`;

        //Create author parent and child
        document.getElementById('title'+i).insertAdjacentHTML("afterend", '<div class=author>Author:</div>');
        card.children[1].setAttribute('id', 'author'+i);
        const authorParent = document.getElementById('author'+i)
        authorParent.innerHTML += '<div class=author-name></div>';
        authorParent.children[0].setAttribute('id', 'authorname'+i);
        authorParent.children[0].innerHTML = myLib[i].author;

        //Create page count parent and child
        document.getElementById('author'+i).insertAdjacentHTML("afterend", '<div class=pages>Pages:</div>');
        card.children[2].setAttribute('id', 'pages'+i);
        const pagesParent = document.getElementById('pages'+i);
        pagesParent.innerHTML += '<div class=page-count></div>';
        pagesParent.children[0].setAttribute('id', 'pagecount'+i); 
        pagesParent.children[0].innerHTML = myLib[i].pages;

        //Create status memo line
        document.getElementById('pages'+i).insertAdjacentHTML("afterend", '<div class=status></div>')
        card.children[3].setAttribute('id', 'status'+i);
        (myLib[i].read == 'yes') ? document.getElementById('status'+i).innerHTML = 'Finished' : 
        document.getElementById('status'+i).innerHTML = 'Not Started';

        if (document.getElementById('status'+i).innerHTML == 'Finished') {
            document.getElementById('card'+i).style.backgroundColor = '#7fffd4';
        } else {
            document.getElementById('card'+i).style.backgroundColor = '#f87171';
        }

        cardBtns.children[0].addEventListener('click', function(e) {
            if (card.children[3].innerHTML == 'Finished') {
                card.children[3].innerHTML = 'Not Started';
                card.style.backgroundColor = '#f87171';
                myLib[e.target.id.slice(-1)].read = 'no';
            } else {
                card.children[3].innerHTML = 'Finished';
                card.style.backgroundColor = '#7fffd4';
                myLib[e.target.id.slice(-1)].read = 'yes';
            }
        })

        cardBtns.children[1].addEventListener('click', function(e) {
            myLib.splice(e.target.id, 1);
            document.querySelector('.bookshelf').innerHTML = '';
            addToMain()
        })
    }

}

//Submit book button
document.querySelector('.submitForm').onclick = function(e) {
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    let status = document.getElementById('status').value;
    
    if (bookTitle == '' || 
        bookAuthor == '' ||
        bookPages == '') {
            alert('Please enter all book info to proceed');
        } else {
            let bookUpload = new Book(bookTitle, bookAuthor, bookPages, status);
            addBook(bookUpload);
            e.preventDefault();
        }

    
    if (document.querySelector('.bookshelf').innerHTML != '') {
        document.querySelector('.bookshelf').innerHTML = '';
        addToMain();
    } else {
        addToMain();
    }

    document.querySelectorAll('input').forEach(input => input.value = '');
}