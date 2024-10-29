const tabs = {
    "bookList": document.querySelector(".book-list"),
    "bestSelling": document.querySelector(".best-selling"),
    "allGenreTab": document.getElementById("all-genre"),
    "businessTab": document.getElementById("business"),
    "technologyTab": document.getElementById("technology"),
    "romanticTab": document.getElementById("romantic"),
    "adventureTab": document.getElementById("adventure"),
    "fictionalTab": document.getElementById("fictional")
};

// Add click event listeners to each nav-link to toggle the 'active' class
document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from the currently active link
        document.querySelector('.nav-link.active').classList.remove('active');
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});

// Function to fetch book data from a given URL and pass the data to a callback function
function fetchBooks(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error:', error));
}

// Fetch and display last 4 books
function loadLastBooks() {
    fetchBooks('https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/', books => {
        displayBooks(books, tabs.bookList, [-4]);
    });
}
// function to load genre books
function loadGenreBooks(genreTab, range) {
    fetchBooks('https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/', books => {
        displayBooks(books, genreTab.querySelector(".row"), range);
    });
}

// Function to display a range of books in a container
function displayBooks(books, container, range) {
    container.innerHTML = ''; 
    books.slice(...range).forEach(book => {
        container.innerHTML += `
            <div class="col-md-3"
                <div class="cards border-0">
                    <div class="book-container d-flex flex-column justify-content-center align-items-center bg-light m-2 py-4 position-relative">
                        <img src="${book.simple_thumb}" class="card-img-top w-75" alt="${book.title}">
                        <button type="button" class="add-to-cart-btn btn btn-dark  w-100 rounded-0 py-2 position-absolute bottom-0 opacity-0">ADD TO CART</button>
                    </div>
                    <div class="card-body text-center text-body-secondary">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author}</p>
                    </div>
                </div>
            </div>`;
    });
}
// Fetch and display best-selling book
function loadBestSellingBook() {
    fetchBooks('https://wolnelektury.pl/api/books/studnia-i-wahadlo/', bestselling => {
        tabs.bestSelling.innerHTML = `
        <div class="row container d-flex justify-content-center">
            <div class="col-xs-12 col-md-5 d-flex justify-content-center align-items-center">
                <img class="d-block w-75" src="${bestselling.simple_cover}" alt="${bestselling.title}">
            </div>
            <div class="col-xs-12 col-md-4 d-flex flex-column justify-content-end pt-5 mt-5">
                <h2 class="under-line fs-2">BEST SELLING BOOK</h2>
                <p class="mt-5 text-body-secondary">By ${bestselling.authors[0].name}</p>
                <h3>${bestselling.title}</h3>
                <div class="my-5 text-body-secondary">${bestselling.fragment_data.html}</div>
                <p class="fw-bold">Shop it Now <i class="bi bi-arrow-right"></i></p>
            </div>
        </div>`;
    });
}



window.onload = () => {
    loadLastBooks();
    loadBestSellingBook();
    loadGenreBooks(tabs.allGenreTab, [0, 46]);
    loadGenreBooks(tabs.businessTab, [0, 9]);
    loadGenreBooks(tabs.technologyTab, [9, 18]);
    loadGenreBooks(tabs.romanticTab, [18, 27]);
    loadGenreBooks(tabs.adventureTab, [28, 37]);
    loadGenreBooks(tabs.fictionalTab, [38, 46]);
};

