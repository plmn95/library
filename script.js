function Book(title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
}

const braveNewWorld = new Book('Brave New World', 'Aldous Huxley', '288', true)
const nightInLisbon = new Book('The Night in Lisbon', 'Erich Maria Remarque', '272', true)

const myLibrary = [braveNewWorld, nightInLisbon]

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
        let titleEdit = document.createElement('input')
        titleEdit.classList.add('title')
        titleEdit.type = 'text'
        book.appendChild(title)
        let author = document.createElement('p')
        author.classList.add('author')
        author.innerText = `${books[i].author}`
        let authorEdit = document.createElement('input')
        authorEdit.classList.add('author')
        authorEdit.type = 'text'
        book.appendChild(author)
        let pages = document.createElement('p')
        pages.classList.add('pages')
        pages.innerText = `${books[i].pages}`
        let pagesEdit = document.createElement('input')
        pagesEdit.type = 'text'
        pagesEdit.classList.add('pages')
        book.appendChild(pages)
        let haveRead = document.createElement('p')
        haveRead.classList.add('btnHaveRead')
        haveRead.classList.add('btn')
        if(books[i].haveRead == true) {
            haveRead.innerText = 'read'
            haveRead.classList.add('haveReadTrue')
        } else {
            haveRead.innerText = 'unread'
            haveRead.classList.add('haveReadFalse')
        }
        book.appendChild(haveRead)
        haveRead.addEventListener('click', () => {
            if(books[i].haveRead == true) {
                books[i].haveRead = false
                haveRead.innerText = 'unread'
                haveRead.classList.remove('haveReadTrue')
                haveRead.classList.add('haveReadFalse')
            } else {
                books[i].haveRead = true
                haveRead.innerText = 'read'
                haveRead.classList.remove('haveReadFalse')
                haveRead.classList.add('haveReadTrue')
            }
        })
        let btnEdit = document.createElement('p')
        btnEdit.innerText = 'edit'
        btnEdit.classList.add('btnEdit')
        btnEdit.classList.add('btn')
        btnEdit.addEventListener('click', () => {
            if(btnEdit.innerText == 'edit') {
                btnEdit.innerText = 'save'
                titleEdit.value = books[i].title
                title.parentNode.replaceChild(titleEdit, title)
                authorEdit.value = books[i].author
                author.parentNode.replaceChild(authorEdit, author)
                pagesEdit.value = books[i].pages
                pages.parentNode.replaceChild(pagesEdit, pages)
            } else {
                if(titleEdit.value != '') {
                    books[i].title = titleEdit.value
                    title.innerText = books[i].title
                }
                titleEdit.parentNode.replaceChild(title, titleEdit)
                if(authorEdit.value != '') {
                    books[i].author = authorEdit.value
                    author.innerText = books[i].author
                }
                authorEdit.parentNode.replaceChild(author, authorEdit)
                if(pagesEdit.value != '') {
                    books[i].pages = pagesEdit.value
                    pages.innerText = books[i].pages
                }
                pagesEdit.parentNode.replaceChild(pages, pagesEdit)
                btnEdit.innerText = 'edit'
            }
        })
        book.appendChild(btnEdit)
        let btnRemove = document.createElement('p')
        btnRemove.innerText = 'delete'
        btnRemove.classList.add('btnRemove')
        btnRemove.classList.add('btn')
        btnRemove.addEventListener('click', () => {
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
const btnFormRead = document.querySelector('.btnFormRead')
const btnFormUnread = document.querySelector('.btnFormUnread')

btnAdd.addEventListener('click', () => {
    addBookDialog.showModal()
})

btnCloseModal.addEventListener('click', () => {
    addBookDialog.close()
})

btnFormRead.addEventListener('click', () => {
    if(btnFormUnread.classList.contains('btnHaveReadSelected')) {
        btnFormUnread.classList.remove('btnHaveReadSelected')
        btnFormRead.classList.add('btnHaveReadSelected')
    }
})

btnFormUnread.addEventListener('click', () => {
    if(btnFormRead.classList.contains('btnHaveReadSelected')) {
        btnFormRead.classList.remove('btnHaveReadSelected')
        btnFormUnread.classList.add('btnHaveReadSelected')
    }
})

btnSubmit.addEventListener('click', () => {
    const name = document.querySelector('.inputName').value
    const author = document.querySelector('.inputAuthor').value
    const pages = document.querySelector('.inputPages').value
    let haveRead = true
    if(btnFormUnread.classList.contains('btnHaveReadSelected')) {
        haveRead = false
    }
    addBook(name, author, pages, haveRead)
    addBookDialog.close()
})