const myLibrary = [];


function Book(title, author, numPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
  this.info = function() {
    //// "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
    return string =  "" + this.title + " by " + this.author + ", " + this.numPages + " pages, " + (haveRead ? "has been read." : "not read yet.");
  }
}


function addBookToLibrary(title, author, numPages, haveRead) {
  let currBook = new Book(title, author, numPages, haveRead);
  myLibrary.push(currBook);
}

function removeBookFromLibrary(book) {
  let index = myLibrary.indexOf(book);
  myLibrary.splice(index, 1);
}

function toggleDialog() {
  const form = document.getElementById("form-section");
  form.toggleAttribute("open");
}


function getBookInfo() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const numPages = document.getElementById("pages");
  const haveRead = document.getElementById("haveRead");
  if (title.value && author.value && numPages.value) {
    addBookToLibrary(title.value, author.value, numPages.value, haveRead.checked);
    toggleDialog();
    title.value = "";
    author.value = "";
    numPages.value = 50;
    haveRead.checked = false;
  }
  else {
    alert("missing information");
  }
  
}


function displayLibrary() {
  const tableBody = document.querySelector("#book-table tbody");

  // Clear the table before adding new rows
  tableBody.innerHTML = "";
  // Iterate over the myLibrary array and create table rows
  for (let book of myLibrary) {
    const row = document.createElement("tr");

    // Create cells for each property
    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;

    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.numPages;

    const statusCell = document.createElement("td");
    statusCell.textContent = book.haveRead;

    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.textContent = book.haveRead ? "Set to unread": "Set to read";
    changeStatusBtn.addEventListener("click", function() {
      book.haveRead = book.haveRead ? false : true;
      displayLibrary();
    });
    statusCell.appendChild(changeStatusBtn);

    const removeBook = document.createElement("td");
    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove Book";
    removeBookBtn.addEventListener("click", function() {
      removeBookFromLibrary(book);
      displayLibrary();
    }); 
    removeBook.appendChild(removeBookBtn);

    // Append cells to the row
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(statusCell);
    row.appendChild(removeBook);

    // Append the row to the table body
    tableBody.appendChild(row);
  }
}


addBookToLibrary("The hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("Playschool", "Alberto", 34, true);
displayLibrary();

const openDialog = document.getElementById("open-dialog");
openDialog.addEventListener("click", function() {
  toggleDialog();
});

const addNewBook = document.getElementById("add-new-book");
addNewBook.addEventListener("click", submitClick, false);

function submitClick(event) {
  event.preventDefault();
  getBookInfo();
  displayLibrary();
  
}