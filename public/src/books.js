function findAuthorById(authors, id) {
  //will use the find function to loop through the authors array 
  //and find the 'author.Id' that matches the function's 'id'
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  //will us the find function to loop through the books array
  //and find the 'book.Id' that matches the function's 'id'
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //creates 3 arrays, one that represents the returned books, one the non returned books
  //and one that will combine the 2 other arrays and be returned
  let returnedBooks = [];
  let notReturnedBooks = [];
  let answer = [];
  //loops through the 'books' array
  books.forEach((book) => {
    //at each individual 'book' object, if the value of the book's 'borrows' array's
    //'returned' value at index 0 -the first one- is false, it will be added to returned
    //if not false, it will be added to not returned.
    if (book.borrows[0].returned === false) {
      returnedBooks.push(book);
    } else {
      notReturnedBooks.push(book);
    }
  });
  //combines the 2 arrays together and returns them
  answer.push(returnedBooks);
  answer.push(notReturnedBooks);
  return answer;
}

function getBorrowersForBook(book, accounts) {
  //creates a variable that will hold the object values of the specific accounts
  //that are borrowing specific books
  let filteredAccounts = [];
  //loops through the accounts array
  accounts.forEach((account) => {
    //at each individual account it will loop through the funcion's 'book' object's 'borrows' array
    book.borrows.forEach((bb) => {
      //if the 'borrow's array's 'id' value matches the specific accounts 'id' value
      //the new array will have that specific account added to it
      //and a new key called 'returned' with the value of the specific books 'borrows.returned' value
      if (bb.id === account.id) {
        filteredAccounts.push(account);
        account['returned'] = bb.returned;
      }
    })
  });
  //limits the returned array to at most 10 borrowers
  return filteredAccounts.splice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
