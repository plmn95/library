function Book(title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
}

const holyland = new Book('Holyland', 'Kouji Mori', '212', true)
const braveNewWorld = new Book('Brave New World', 'Aldous Huxley', '288', true)

const myLibrary = [holyland, braveNewWorld]

function addToLibrary(book) {
    myLibrary.push(book)
}

const library = document.querySelector('.library')

function displayLibrary(books) {
    console.log(books)
    for(let i = 0; i < books.length; i++) {
        let book = document.createElement('div')
        book.classList.add('book')
        book.id = i
        library.appendChild(book)
        let title = document.createElement('p')
        title.classList.add('title')
        title.innerText = `${books[i].title}`
        book.appendChild(title)
        let author = document.createElement('p')
        author.classList.add('author')
        author.innerText = `${books[i].author}`
        book.appendChild(author)
        let pages = document.createElement('p')
        pages.classList.add('author')
        pages.innerText = `${books[i].pages} pages long`
        book.appendChild(pages)
        let haveRead = document.createElement('input')
        haveRead.type = 'checkbox'
        haveRead.classList.add('haveRead')
        haveRead.addEventListener('click', () => {
            books[i].haveRead = haveRead.checked
        })
        if(books[i].haveRead == true) {
            haveRead.checked = true
        } else {
            haveRead.checked = false
        }
        book.appendChild(haveRead)
        let btnRemove = document.createElement('p')
        btnRemove.innerText = 'delete'
        btnRemove.classList.add('btnRemove')
        btnRemove.addEventListener('click', () => {
            console.log(book.id)
            myLibrary.splice(i, 1)
            clearLibrary()
            displayLibrary(myLibrary)
        })
        book.appendChild(btnRemove)
    }
}

function clearLibrary() {
    document.querySelectorAll('.book')
    .forEach(e => e.remove())
}

displayLibrary(myLibrary)

function addBook(title, author, pages, haveRead) {
    let book = new Book(title, author, pages, haveRead)
    addToLibrary(book)
    clearLibrary()
    displayLibrary(myLibrary)
}

const btnAdd = document.querySelector('.btnAdd')
const addBookDialog = document.querySelector('dialog')
const btnCloseModal = document.querySelector('.btnCloseModal')
const btnSubmit = document.querySelector('.btnSubmit')

btnAdd.addEventListener('click', () => {
    addBookDialog.showModal()
    // addBook('jumanji', 'text', '500', false)
})

btnCloseModal.addEventListener('click', () => {
    addBookDialog.close()
})

btnSubmit.addEventListener('click', () => {
    const name = document.querySelector('.inputName').value
    const author = document.querySelector('.inputAuthor').value
    const pages = document.querySelector('.inputPages').value
    const haveRead = document.querySelector('.inputHaveRead').checked
    addBook(name, author, pages, haveRead)
})