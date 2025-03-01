// Function to initialize products grid
function initProducts() {
    console.log("Initializing products grid...");
    
    // Get DOM element
    const productsGrid = document.querySelector('.products__grid');
    const productsHeader = document.querySelector('.products__header');
    
    if (!productsGrid) {
        console.error("Products grid container not found!");
        return;
    }
    
    // Check if we have products data
    if (!products || products.length === 0) {
        console.error("No products data found!");
        return;
    }
    
    // Tạo UI cho bộ lọc
    createFilterUI(productsHeader);
    
    // Lấy danh sách category từ sản phẩm
    const categories = [...new Set(products.map(product => product.category))];
    
    // Thêm options cho dropdown category
    const categorySelect = document.getElementById('category-filter');
    if (categorySelect) {
        categorySelect.innerHTML = '<option value="all">Tất cả danh mục</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = getCategoryName(category);
            categorySelect.appendChild(option);
        });
    }
    
    // Render all products in grid layout
    renderProductsGrid(products);
    
    console.log("Products grid initialization complete");
    
    // Thêm sự kiện cho bộ lọc
    setupFilterEvents();
    
    // Function to render products in grid layout
    function renderProductsGrid(productsList) {
        // Clear container
        productsGrid.innerHTML = '';
        
        // Kiểm tra nếu không có sản phẩm nào
        if (productsList.length === 0) {
            const noProductsMessage = document.createElement('div');
            noProductsMessage.className = 'no-products-message';
            noProductsMessage.textContent = 'Không tìm thấy sản phẩm phù hợp.';
            noProductsMessage.style.gridColumn = '1 / -1';
            noProductsMessage.style.textAlign = 'center';
            noProductsMessage.style.padding = '2rem 0';
            noProductsMessage.style.color = '#666';
            productsGrid.appendChild(noProductsMessage);
            return;
        }
        
        // Add products
        productsList.forEach(product => {
            // Format price with commas
            const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
            
            // Create product card
            const productCard = document.createElement('div');
            productCard.className = 'product-grid-card';
            productCard.dataset.id = product.id;
            productCard.dataset.category = product.category;
            productCard.dataset.price = product.price;
            
            // HTML structure similar to featured products
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-content">
                    <p class="price">${formattedPrice}</p>
                    <h3>${product.name}</h3>
                    <button class="add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to "Add to cart" buttons
        document.querySelectorAll('.products__grid .add-to-cart').forEach(button => {
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
    
    // Tạo UI cho bộ lọc
    function createFilterUI(headerElement) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'products__filters';
        filterContainer.style.display = 'flex';
        filterContainer.style.gap = '15px';
        filterContainer.style.alignItems = 'center';
        
        // Filter by category
        const categoryFilter = document.createElement('div');
        categoryFilter.innerHTML = `
            <select id="category-filter" class="filter-select">
                <option value="all">Tất cả danh mục</option>
            </select>
        `;
        
        // Filter by price
        const priceFilter = document.createElement('div');
        priceFilter.innerHTML = `
            <select id="price-filter" class="filter-select">
                <option value="all">Tất cả giá</option>
                <option value="0-500000">Dưới 500.000₫</option>
                <option value="500000-1000000">500.000₫ - 1.000.000₫</option>
                <option value="1000000-2000000">1.000.000₫ - 2.000.000₫</option>
                <option value="2000000-inf">Trên 2.000.000₫</option>
            </select>
        `;
        
        // Apply styles to selects
        const selectStyle = `
            .filter-select {
                padding: 8px 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background-color: white;
                font-size: 14px;
            }
            .filter-select:focus {
                outline: none;
                border-color: #b3d9ff;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = selectStyle;
        document.head.appendChild(styleElement);
        
        // Add to container
        filterContainer.appendChild(categoryFilter);
        filterContainer.appendChild(priceFilter);
        
        // Add to header
        headerElement.appendChild(filterContainer);
    }
    
    // Setup sự kiện cho bộ lọc
    function setupFilterEvents() {
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        
        if (categoryFilter && priceFilter) {
            categoryFilter.addEventListener('change', applyFilters);
            priceFilter.addEventListener('change', applyFilters);
        }
    }
    
    // Áp dụng bộ lọc
    function applyFilters() {
        const categoryValue = document.getElementById('category-filter').value;
        const priceValue = document.getElementById('price-filter').value;
        
        let filteredProducts = products;
        
        // Filter by category
        if (categoryValue !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
        }
        
        // Filter by price
        if (priceValue !== 'all') {
            const priceLimits = priceValue.split('-');
            const minPrice = parseInt(priceLimits[0]);
            const maxPrice = priceLimits[1] === 'inf' ? Infinity : parseInt(priceLimits[1]);
            
            filteredProducts = filteredProducts.filter(product => 
                product.price >= minPrice && product.price <= maxPrice
            );
        }
        
        // Render filtered products
        renderProductsGrid(filteredProducts);
    }
    
    // Chuyển đổi category code thành tên hiển thị
    function getCategoryName(categoryCode) {
        const categoryMap = {
            'skincare': 'Chăm sóc da',
            'makeup': 'Trang điểm',
            'fragrance': 'Nước hoa',
            'body': 'Chăm sóc cơ thể',
            'hair': 'Chăm sóc tóc'
        };
        
        return categoryMap[categoryCode] || categoryCode;
    }
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