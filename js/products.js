function initProducts() {
    console.log("Initializing products grid...");
    
    const productsGrid = document.querySelector('.products__grid');
    const productsHeader = document.querySelector('.products__header');
    
    if (!productsGrid) {
        console.error("Products grid container not found!");
        return;
    }
    
    if (!products || products.length === 0) {
        console.error("No products data found!");
        return;
    }
    
    createFilterUI(productsHeader);
    
    const categories = [...new Set(products.map(product => product.category))];
    
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
    
    renderProductsGrid(products);
    
    console.log("Products grid initialization complete");
    
    setupFilterEvents();
    
    function renderProductsGrid(productsList) {
        productsGrid.innerHTML = '';
        
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
        
        productsList.forEach(product => {
            const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
            
            const productCard = document.createElement('div');
            productCard.className = 'product-grid-card';
            productCard.dataset.id = product.id;
            productCard.dataset.category = product.category;
            productCard.dataset.price = product.price;
            
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
    
    function createFilterUI(headerElement) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'products__filters';
        filterContainer.style.display = 'flex';
        filterContainer.style.gap = '15px';
        filterContainer.style.alignItems = 'center';
        
        const categoryFilter = document.createElement('div');
        categoryFilter.innerHTML = `
            <select id="category-filter" class="filter-select">
                <option value="all">Tất cả danh mục</option>
            </select>
        `;
        
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
        
        filterContainer.appendChild(categoryFilter);
        filterContainer.appendChild(priceFilter);
        
        headerElement.appendChild(filterContainer);
    }
    
    function setupFilterEvents() {
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        
        if (categoryFilter && priceFilter) {
            categoryFilter.addEventListener('change', applyFilters);
            priceFilter.addEventListener('change', applyFilters);
        }
    }
    
    function applyFilters() {
        const categoryValue = document.getElementById('category-filter').value;
        const priceValue = document.getElementById('price-filter').value;
        
        let filteredProducts = products;
        
        if (categoryValue !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
        }
        
        if (priceValue !== 'all') {
            const priceLimits = priceValue.split('-');
            const minPrice = parseInt(priceLimits[0]);
            const maxPrice = priceLimits[1] === 'inf' ? Infinity : parseInt(priceLimits[1]);
            
            filteredProducts = filteredProducts.filter(product => 
                product.price >= minPrice && product.price <= maxPrice
            );
        }
        
        renderProductsGrid(filteredProducts);
    }
    
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

document.addEventListener('DOMContentLoaded', () => {
    if (typeof products !== 'undefined') {
        initProducts();
    } else {
        const checkProducts = setInterval(() => {
            if (typeof products !== 'undefined') {
                clearInterval(checkProducts);
                initProducts();
            }
        }, 100);
    }
});