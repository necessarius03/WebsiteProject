// Function to initialize products
function initProducts() {
    console.log("Initializing products grid...");
    
    // Get the products grid element
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.error("Products grid element not found!");
        return;
    }
    
    // Filter elements
    const brandFilter = document.querySelector('.filter-brand');
    const priceFilter = document.querySelector('.filter-price');
    
    // Function to render products
    function renderProducts(filteredProducts) {
        // Clear products grid
        productsGrid.innerHTML = '';
        
        // Check if there are any products
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<p>Không tìm thấy sản phẩm phù hợp.</p>';
            return;
        }
        
        // Loop through products and create product cards
        filteredProducts.forEach(product => {
            // Format price with commas
            const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
            
            // Create product card element
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            productCard.dataset.category = product.category;
            
            // Set HTML structure - matching the structure used in featured-product.js
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-content">
                    <p class="price">${formattedPrice}</p>
                    <h3>${product.name}</h3>
                    <button class="add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            `;
            
            // Add product card to grid
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to "Add to cart" buttons
        document.querySelectorAll('#products-grid .add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                if (typeof window.addToCart === 'function') {
                    window.addToCart(productId);
                } else {
                    console.error('addToCart function not found!');
                }
            });
        });
    }
    
    // Function to filter products
    function filterProducts() {
        const selectedBrand = brandFilter ? brandFilter.value : '';
        const selectedPrice = priceFilter ? priceFilter.value : '';
        
        let filteredProducts = [...products];
        
        // Filter by category (brand)
        if (selectedBrand) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedBrand);
        }
        
        // Filter by price
        if (selectedPrice) {
            switch(selectedPrice) {
                case '0-300':
                    filteredProducts = filteredProducts.filter(product => product.price < 300000);
                    break;
                case '300-1000':
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= 300000 && product.price <= 1000000
                    );
                    break;
                case '1000+':
                    filteredProducts = filteredProducts.filter(product => product.price > 1000000);
                    break;
            }
        }
        
        // Render filtered products
        renderProducts(filteredProducts);
    }
    
    // Add event listeners to filters
    if (brandFilter) {
        brandFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    // Initially render all products
    renderProducts(products);
    
    console.log("Products grid initialization complete");
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if products are loaded
    if (typeof products !== 'undefined') {
        initProducts();
    } else {
        // If products not loaded yet, wait for main.js to finish loading components
        const checkProducts = setInterval(() => {
            if (typeof products !== 'undefined') {
                clearInterval(checkProducts);
                initProducts();
            }
        }, 100);
    }
});