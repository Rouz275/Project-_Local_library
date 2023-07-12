function findAccountById(accounts, id) {
  //use the .find function to loop through the accounts array
  //and return the account whose 'id' value matches the function's 'id' input
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  /* returns a sorted array where the function compares 2 values at a time
  it will find the string character values of each account and assign them 1 or -1
  if the number returned is negative, the first value will be moved before the second */
  return accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  //creates a total valuing 0 to be returned
  let total = 0;
  //loops through the array of books and looks at each 'borrows' key
  books.forEach((book) => {
    //loops through the 'borrows' array within each book object
    book.borrows.forEach((bb) => {
      //if the 'borrows' id value matches the functions 'accounts' id value
      //the total gets increased by 1
      if (bb.id === account.id) total++;
    });
  });
  return total;
}


function getBooksPossessedByAccount(account, books, authors) {
  //creates a variable that represents a filtered version of the 'books' array
  //the filter function will check each individual 'book' object in the 'books' array
  let checkedOutBooks = books.filter((book) => book.borrows.find((borrowed) => 
    /* the find function will then look through each 'book' object's 'borrows' array                     and checks at each 'borrowed' object if the value of its 'id' key matches the value of
  the main function's 'account' object's 'id' value and also that the 'borrowed' object's
  'returned' value is false -meaning the book is still checked out */    
  borrowed.id === account.id && borrowed.returned === false));

  //loops through the new variable's array 
  checkedOutBooks.forEach((book) => {
    /*creates a variable that finds within the function's 'authors' array,
    an 'id' value that matches the 'authorId' value of a specific object within
    the new filtered 'accounts' array*/
    let authorId = authors.find((author) => author.id === book.authorId);
    //creates a new key-value pair with the 'author' string and the value of the authorId variable
    book['author'] = authorId;
  });

  return checkedOutBooks;
  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};