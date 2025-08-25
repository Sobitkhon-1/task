import './style.css'
function runWordCounter() {
  const str = document.getElementById("wc-text").value;
  const n = Number(document.getElementById("wc-n").value);
  const words = str.split(/\s+/);
  const freq = {};
  for (let w of words) freq[w] = (freq[w] || 0) + 1;
  const result = Object.keys(freq).filter(w => freq[w] === n);
  document.getElementById("wc-result").innerText = result.join(", ") || "No matches";
}

function runTwoSums() {
  const arr = document.getElementById("ts-array").value.split(",").map(Number);
  const target = Number(document.getElementById("ts-target").value);
  let left = 0, right = arr.length - 1;
  arr.sort((a, b) => a - b);
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      document.getElementById("ts-result").innerText = `${arr[left]} + ${arr[right]} = ${target}`;
      return;
    } else if (sum < target) left++;
    else right--;
  }
  document.getElementById("ts-result").innerText = "No match found";
}

class Library {
  constructor() {
    this.books = [];
    this.idCounter = 1;
  }
  addBook(title, author) {
    const book = { id: this.idCounter++, title, author };
    this.books.push(book);
    return book;
  }
  getAllBooks() {
    return this.books;
  }
  getBookById(id) {
    return this.books.find(b => b.id === id) || null;
  }
  deleteBook(id) {
    this.books = this.books.filter(b => b.id !== id);
  }
}
const lib = new Library();

function addBook() {
  const title = document.getElementById("lib-title").value;
  const author = document.getElementById("lib-author").value;
  lib.addBook(title, author);
  document.getElementById("lib-result").innerText = "Book added!";
}
function listBooks() {
  document.getElementById("lib-result").innerText = JSON.stringify(lib.getAllBooks(), null, 2);
}
function getBook() {
  const id = Number(document.getElementById("lib-id").value);
  document.getElementById("lib-result").innerText = JSON.stringify(lib.getBookById(id), null, 2);
}
function deleteBook() {
  const id = Number(document.getElementById("lib-id").value);
  lib.deleteBook(id);
  document.getElementById("lib-result").innerText = "Book deleted!";
}

function runRemoveDuplicates() {
  let arr = document.getElementById("rd-array").value.split(",").map(Number);
  if (arr.length === 0) {
    document.getElementById("rd-result").innerText = "Empty array";
    return;
  }
  arr.sort((a, b) => a - b);
  let write = 1;
  for (let read = 1; read < arr.length; read++) {
    if (arr[read] !== arr[read - 1]) {
      arr[write] = arr[read];
      write++;
    }
  }
  const result = arr.slice(0, write);
  document.getElementById("rd-result").innerText = result.join(", ");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("wc-run-btn").addEventListener("click", runWordCounter);
  document.getElementById("ts-run-btn").addEventListener("click", runTwoSums);

  document.getElementById("lib-add-btn").addEventListener("click", addBook);
  document.getElementById("lib-list-btn").addEventListener("click", listBooks);
  document.getElementById("lib-get-btn").addEventListener("click", getBook);
  document.getElementById("lib-del-btn").addEventListener("click", deleteBook);

  document.getElementById("rd-run-btn").addEventListener("click", runRemoveDuplicates);
});

