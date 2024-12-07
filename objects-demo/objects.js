// Write a constructor for making “Book” objects. 
// We will revisit this in the next project. Your book objects should have the book’s title, author, 
// the number of pages, and whether or not you have read the book.

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function() {
    console.log(this.name)
  };
}

function Book(title, author, numPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
  this.info = function() {
    //// "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
    return "" + this.title + " by " + this.author + ", " + this.numPages + " pages, " + this.haveRead;
  }
}

