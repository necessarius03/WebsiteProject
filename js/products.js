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
            
            // Create product card HTML
            const productCard = `
                <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${formattedPrice}</p>
                    <button class="add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            `;
            
            // Add product card to grid
            productsGrid.innerHTML += productCard;
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
        
        // Filter by brand
        if (selectedBrand) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedBrand);
        }
        
        // Filter by price
        if (selectedPrice) {
            const [min, max] = selectedPrice.split('-');
            
            if (min && max) {
                // Price range (e.g., 5-10 million)
                filteredProducts = filteredProducts.filter(product => 
                    product.price >= min * 1000000 && product.price <= max * 1000000
                );
            } else if (min === '0') {
                // Below a certain price (e.g., below 5 million)
                filteredProducts = filteredProducts.filter(product => 
                    product.price <= max * 1000000
                );
            } else if (max === '+') {
                // Above a certain price (e.g., above 10 million)
                filteredProducts = filteredProducts.filter(product => 
                    product.price >= min * 1000000
                );
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

// Function to filter products
function filterProducts() {
    const selectedBrand = brandFilter ? brandFilter.value : '';
    const selectedPrice = priceFilter ? priceFilter.value : '';
    
    let filteredProducts = [...products];
    
    // Filter by category (brand)
    if (selectedBrand) {
        filteredProducts = filteredProducts.filter(product => product.category === selectedBrand);
    }
    
    // Filter by price (điều chỉnh cho phù hợp với giá mỹ phẩm)
    if (selectedPrice) {
        const [min, max] = selectedPrice.split('-');
        
        if (min && max) {
            // Price range (e.g., 300k-1 million)
            filteredProducts = filteredProducts.filter(product => 
                product.price >= min * 1000 && product.price <= max * 1000
            );
        } else if (min === '0') {
            // Below a certain price (e.g., below 300k)
            filteredProducts = filteredProducts.filter(product => 
                product.price <= max * 1000
            );
        } else if (max === '+') {
            // Above a certain price (e.g., above 1 million)
            filteredProducts = filteredProducts.filter(product => 
                product.price >= min * 1000
            );
        }
    }
    
    // Render filtered products
    renderProducts(filteredProducts);
}