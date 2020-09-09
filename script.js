// HTML Elements --> for styling
let cardTitle = document.querySelector(".book-card__span"); // Select book card text content


// Define library array
let myLibrary = [];
let bookDisplay = document.querySelector("#book-display")
let bookSubmit = 0;

// Define book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add print statement to prototype
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages. Read: ${this.read}`;
}

// Define function to add book to library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Populate Library
addBookToLibrary(new Book("The Assassins Apprentice", "Robin Hobb", 448, true));
addBookToLibrary(new Book("The Magician", "Raymond E.Feist", 545, true));
addBookToLibrary(new Book("The Catcher in the Rye", "J.D. Salinger", 277, true));

// Display books in library
function printBooks(array) {

    // Iterate through books in library
    for (let book of array) {
        let newCard = document.createElement('div');
        newCard.classList.add("book-card");
        
        // Append title to card
        let titleDisplay = document.createElement('span');
        titleDisplay.classList.add("book-card__span");
        titleDisplay.innerHTML = `<span>Title:</span> ${book["title"]}`;
        newCard.appendChild(titleDisplay)

        // Append author to card
        let authorDisplay = document.createElement('span');
        authorDisplay.classList.add("book-card__span");
        authorDisplay.innerHTML = `<span>Author:</span> ${book["author"]}`;
        newCard.appendChild(authorDisplay)

        // Append page count to card
        let pageCount = document.createElement('span');
        pageCount.classList.add("book-card__span");
        pageCount.innerHTML = `<span>Page Count:</span> ${book["pages"]}`;
        newCard.appendChild(pageCount)

        // Append read to card
        let readStatus = document.createElement('button');
        let buttons = document.createElement('div');        // Div for read button and del button
        buttons.classList.add('card-buttons');
        readStatus.classList.add("book-card__read");
        if (book["read"] == true) {
            readStatus.textContent = "Read";
            readStatus.classList.add("book-card__read__yes");
        } else {
            readStatus.textContent = "Unread";
            readStatus.classList.add("book-card__read__no");
        }
        readStatus["data-card"] = book["title"];
        buttons.appendChild(readStatus)

        // Remove from library button
        let deleteFromLibrary = document.createElement('button');
        deleteFromLibrary.classList.add("remove-from-library");
        deleteFromLibrary["data-card"] = book["title"];     // Link remove button to card
        deleteFromLibrary.textContent = "Remove"
        buttons.appendChild(deleteFromLibrary);
        newCard.appendChild(buttons);

        // Append card to display
        bookDisplay.appendChild(newCard);
    }
}

// Display Books to Date
printBooks(myLibrary);

// Add book to library
document.addEventListener('click', function (e) {
    if (e.target.id != "new-book") { return }
    if (bookSubmit == 1) { return }

    // Flag submitting new book
    bookSubmit = 1;

    // Create new book form
    let newForm = document.createElement('form');
    newForm.id = "add-book-form"
    newForm.classList.add('add-book');
        
    // Add title input
    let newTitle = document.createElement('input');
    newTitle.type = "text";
    newTitle.name = "title";
    newTitle.placeholder = "Enter title of book";
    newTitle.classList.add('add-book__text-input');
    newForm.appendChild(newTitle);

    // Add author input
    let newAuthor = document.createElement('input');
    newAuthor.type = "text";
    newAuthor.name = "author";
    newAuthor.placeholder = "Enter author's name";
    newAuthor.classList.add('add-book__text-input');
    newForm.appendChild(newAuthor);

    // Add pages input
    let pageCount = document.createElement('input');
    pageCount.type = "number";
    pageCount.name = "pages";
    pageCount.placeholder = "Enter page count";
    pageCount.classList.add('add-book__text-input');
    newForm.appendChild(pageCount);

    // Add read status
    let readStatus = document.createElement('input');
    let readStatusLabel = document.createElement('label');
    let readDiv = document.createElement('div');
    readDiv.classList.add('add-book__read')
    readStatus.type = "checkbox";
    readStatus.name = "read";
    readStatus.classList.add('add-book__read-status')
    readStatusLabel.textContent = "Read?"
    readStatusLabel.for = "read";
    readStatusLabel.classList.add('add-book__read-label');
    readDiv.appendChild(readStatusLabel);
    readDiv.appendChild(readStatus);
    newForm.appendChild(readDiv);

    // Add submit
    let submitNewBook = document.createElement('input');
    submitNewBook.type = "submit";
    submitNewBook.classList.add('add-book__submit');
    submitNewBook.id = "submit-new-book"
    newForm.appendChild(submitNewBook);
        
    // Add entire form to div
    let formContainer = document.querySelector("#new-form-container");
    formContainer.appendChild(newForm);

    
    // Submit form event
    let submitForm = document.querySelector("#add-book-form");
    submitForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let title = newTitle.value;
        let author = newAuthor.value;
        let pages = pageCount.value;
        let read = readStatus.checked;
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        console.log("Form has been submitted!");    // Acknowledge form submission
        let formContainer = document.querySelector("#new-form-container");
        formContainer.innerHTML = "";   // Reset div
        bookSubmit = 0;                 // Reset Submit Flag
        printBooks(myLibrary.slice(myLibrary.length - 1)); // Adds book card for only this entry
    });
});

// Delete book from library
document.addEventListener('click', function (e) {
    if (!e.target.classList.contains("remove-from-library")) { return }
    let selectedCard = e.target["data-card"];
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i]["title"] == selectedCard) {
            myLibrary.splice(i, 1);
        }
    }
    bookDisplay.innerHTML = "";
    printBooks(myLibrary);
})

// Toggle read button
document.addEventListener('click', function (e) {
    if (!e.target.classList.contains("book-card__read")) { return }
    if (e.target.textContent == "Read") {
        e.target.textContent = "Unread";
    } else { e.target.textContent = "Read"; }
    e.target.classList.toggle("book-card__read__yes")
    e.target.classList.toggle("book-card__read__no")

    // Update read key on book obj
    let selectedCard = e.target["data-card"];
    console.log(selectedCard);
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i]["title"] == selectedCard) {
            if (e.target.textContent == "Unread") {
                myLibrary[i]["read"] = false;
            } else { myLibrary[i]["read"] = true; }
        }
    }
})





/* TO DO

SEARCH FUNCTIONALITY
IMPROVE REMOVE BUTTON
MAKE INPUT ESSENTIAL ON ADD
BACK END
FOOTER

*/