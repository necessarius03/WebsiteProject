document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.header__search input');
    const searchButton = document.querySelector('.header__search button');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchProducts(query);
        }
    });
});

function searchProducts(query) {
    // Implement search logic
    console.log('Searching for:', query);
}