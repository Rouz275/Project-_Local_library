function getTotalBooksCount(books) {
  //returns the length of the 'books' array as the value for the total number of books
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //returns the length of the 'accounts' array as the value of the total number of accounts
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //creates a total variable equaling 0 that will be returned
  let total = 0;
  //loops through the books array
  //if at each specific 'book' object, the value of that book's 'borrows' array's 'returned' key
  //at index 0 -the first one- is 'false', the total is incremented by 1
  books.forEach((book) => {
    if (book.borrows[0].returned === false) total++;
  })
  return total;
}

function getMostCommonGenres(books) {
  //creates a 'genres' object that will be augmented and pushed into the output array
  let genres = {};
  //returned array
  let sortedGenres = [];
  //loops through the books array and creates a variable for its 'genre' value
  books.forEach((book) => {
    let genre = book.genre;
    //if that 'genre' variable does not exists as a key in the 'genres' object, it will be added
    //and its value will be set to 1
    if(!genres[genre]) {
      genres[genre] = 1;
    } 
    //if it does exists, its value will be incremented by 1
    else {
      genres[genre]++;
    }
  });
  //loops through the 'genres' object and adds to the output array the keys and values
  //as values to the 'name' and 'count' keys
  for (let name in genres) {
    sortedGenres.push({ 'name': name, 'count': genres[name]});
  }
  //returns the array sorted by most to least count, with only the top 5 entries
  return sortedGenres.sort((a, b) => b.count - a.count).splice(0,5);
}

function getMostPopularBooks(books) {
  //creates a varibale that holds an agumented 'books' array
  let mostPopular = books.reduce((result, book) => {
    /*loops through the 'books' array and pushes into a new 'results' array
    a 'nameAndCount' object with keys 'name' and 'count' and values of the 
    specific book's 'title' value and its 'borrows' array's 'length' value respectively*/
    let nameAndCount = {};
    nameAndCount['name'] = book.title;
    nameAndCount['count'] = book.borrows.length;
    result.push(nameAndCount);
    return result;
  }, []);
  //returns the new array sorted by highest to lowest count with the top 5 values
  return mostPopular.sort((a, b) => b.count - a.count).splice(0,5);
}

//helper function for the 'getMostPopularAuthors' function
/*returns an array of objects with 'author' and 'book' as keys
whose values are an author, and the corresponding book they wrote*/
function matchBookWithAuthorHelper(books, authors) {
  let authorsAndBooks = [];
  books.forEach((book) => {
    let matchingAuthor = authors.find((author) => author.id === book.authorId);
    let bookAndAuthor = {author:(matchingAuthor.name.first + " " + matchingAuthor.name.last), book: book.title};
    authorsAndBooks.push(bookAndAuthor);
  });
  return authorsAndBooks;
}

function getMostPopularAuthors(books, authors) {
  //creates 2 variables that hold the arrays of the called functions of 'getMostPopularBooks'
  //and the helper function 'matchVookWithAuthorHelper'
  let mostPopularBooks = getMostPopularBooks(books);
  let authorsAndBooks = matchBookWithAuthorHelper(books, authors);
  /*loops through the most popular books array and at each individual 'book' object
  it loops through the helper array to see if the individual book name matches the
  name of the book in the helper function and stores that in the 'matchingBook' array.*/
  let mostPopularAuthors = [];
  mostPopularBooks.forEach((book) => {
    let matchingBook = authorsAndBooks.find((match) => book.name === match.book);
    /*after finding a match, it creates an object with keys 'name' and 'count'
    holding the 'matchingBook's' author as the name, and the specific book in the loops 'count'
    as the count. it then pushes the object into an empty array before looping again*/
    let authorObject = {name: matchingBook.author, count: book.count};
    mostPopularAuthors.push(authorObject);
  });
  return mostPopularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};