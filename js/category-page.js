document.addEventListener('DOMContentLoaded', function() {
    console.log("Category page loaded, initializing...");
    
    if (typeof products !== 'undefined') {
        initCategoryPage();
    } else {
        const checkProducts = setInterval(() => {
            if (typeof products !== 'undefined') {
                clearInterval(checkProducts);
                initCategoryPage();
            }
        }, 100);
    }
});

let currentCategoryProducts = [];
let currentCategory = '';

function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const specialParam = urlParams.get('special');
    
    if (!categoryParam && !specialParam) {
        console.log("No category parameter, showing all products");
        document.getElementById('category-title').textContent = "Tất cả sản phẩm";
        document.getElementById('breadcrumb-category').textContent = "Tất cả sản phẩm";
        currentCategoryProducts = [...products];
        renderCategoryProducts(currentCategoryProducts);
        return;
    }
    
    if (categoryParam) {
        console.log("Loading products for category:", categoryParam);
        currentCategory = categoryParam;
        
        currentCategoryProducts = products.filter(product => product.category === categoryParam);
        
        const categoryName = getCategoryName(categoryParam);
        
        document.getElementById('category-title').textContent = categoryName;
        document.getElementById('breadcrumb-category').textContent = categoryName;
        document.getElementById('category-description').textContent = 
            `Hiển thị ${currentCategoryProducts.length} sản phẩm thuộc danh mục ${categoryName.toLowerCase()}`;
    }
    else if (specialParam) {
        console.log("Loading products for special category:", specialParam);
        currentCategory = 'special_' + specialParam;
        
        let specialCategoryName = '';
        let filteredProducts = [];
        
        if (specialParam === 'luxury') {
            specialCategoryName = 'Thương hiệu cao cấp';
            filteredProducts = products.filter(product => product.price > 1000000);
        } 
        else if (specialParam === 'korean') {
            specialCategoryName = 'Mỹ phẩm Hàn Quốc';
            filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes('hàn') || 
                product.category === 'skincare'); // Giả sử các sản phẩm skincare là từ Hàn Quốc
        } 
        else if (specialParam === 'organic') {
            specialCategoryName = 'Mỹ phẩm thiên nhiên';
            filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes('thiên nhiên') || 
                product.category === 'body'); // Giả sử sản phẩm body care là organic
        }
        
        currentCategoryProducts = filteredProducts;
        
        document.getElementById('category-title').textContent = specialCategoryName;
        document.getElementById('breadcrumb-category').textContent = specialCategoryName;
        document.getElementById('category-description').textContent = 
            `Hiển thị ${filteredProducts.length} sản phẩm thuộc danh mục ${specialCategoryName.toLowerCase()}`;
    }
    
    renderCategoryProducts(currentCategoryProducts);
    
    setupFilterEvents();
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

function renderCategoryProducts(productsList) {
    const productsGrid = document.getElementById('category-products');
    
    if (!productsGrid) {
        console.error("Products grid container not found!");
        return;
    }
    
    productsGrid.innerHTML = '';
    
    if (productsList.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = 'Không tìm thấy sản phẩm nào trong danh mục này.';
        noProductsMessage.style.gridColumn = '1 / -1';
        noProductsMessage.style.textAlign = 'center';
        noProductsMessage.style.padding = '2rem 0';
        noProductsMessage.style.color = '#666';
        productsGrid.appendChild(noProductsMessage);
        return;
    }
    
    productsList.forEach(product => {
        // Format giá tiền
        const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-grid-card';
        productCard.dataset.id = product.id;
        productCard.dataset.category = product.category;
        
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
    
    document.querySelectorAll('#category-products .add-to-cart').forEach(button => {
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

function setupFilterEvents() {
    const sortFilter = document.getElementById('sort-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
}

function applyFilters() {
    const sortValue = document.getElementById('sort-filter').value;
    const priceValue = document.getElementById('price-filter').value;
    
    let filteredProducts = [...currentCategoryProducts];
    
    if (priceValue !== 'all') {
        const priceLimits = priceValue.split('-');
        const minPrice = parseInt(priceLimits[0]);
        const maxPrice = priceLimits[1] === 'inf' ? Infinity : parseInt(priceLimits[1]);
        
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }
    
    if (sortValue !== 'default') {
        switch (sortValue) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }
    
    document.getElementById('category-description').textContent = 
        `Hiển thị ${filteredProducts.length} sản phẩm${currentCategory ? ' thuộc danh mục ' + getCategoryName(currentCategory).toLowerCase() : ''}`;
    
    renderCategoryProducts(filteredProducts);
}