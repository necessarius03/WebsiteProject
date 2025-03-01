// Function để hiển thị sản phẩm theo danh mục trong trang category.html
document.addEventListener('DOMContentLoaded', function() {
    console.log("Category page loaded, initializing...");
    
    // Đợi đến khi products đã được load
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

// Biến lưu trữ danh sách sản phẩm hiện tại của trang
let currentCategoryProducts = [];
let currentCategory = '';

function initCategoryPage() {
    // Lấy tham số category từ URL
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
    
    // Xử lý trường hợp danh mục thông thường
    if (categoryParam) {
        console.log("Loading products for category:", categoryParam);
        currentCategory = categoryParam;
        
        // Lọc sản phẩm theo danh mục
        currentCategoryProducts = products.filter(product => product.category === categoryParam);
        
        // Cập nhật tiêu đề và breadcrumb
        const categoryName = getCategoryName(categoryParam);
        
        document.getElementById('category-title').textContent = categoryName;
        document.getElementById('breadcrumb-category').textContent = categoryName;
        document.getElementById('category-description').textContent = 
            `Hiển thị ${currentCategoryProducts.length} sản phẩm thuộc danh mục ${categoryName.toLowerCase()}`;
    }
    // Xử lý trường hợp danh mục đặc biệt
    else if (specialParam) {
        console.log("Loading products for special category:", specialParam);
        currentCategory = 'special_' + specialParam;
        
        // Xác định tên và nội dung hiển thị cho danh mục đặc biệt
        let specialCategoryName = '';
        let filteredProducts = [];
        
        if (specialParam === 'luxury') {
            specialCategoryName = 'Thương hiệu cao cấp';
            // Giả sử sản phẩm cao cấp có giá > 1tr
            filteredProducts = products.filter(product => product.price > 1000000);
        } 
        else if (specialParam === 'korean') {
            specialCategoryName = 'Mỹ phẩm Hàn Quốc';
            // Đây chỉ là giả định, trong thực tế bạn cần dữ liệu về xuất xứ sản phẩm
            filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes('hàn') || 
                product.category === 'skincare'); // Giả sử các sản phẩm skincare là từ Hàn Quốc
        } 
        else if (specialParam === 'organic') {
            specialCategoryName = 'Mỹ phẩm thiên nhiên';
            // Giả sử là một số sản phẩm nhất định
            filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes('thiên nhiên') || 
                product.category === 'body'); // Giả sử sản phẩm body care là organic
        }
        
        currentCategoryProducts = filteredProducts;
        
        // Cập nhật tiêu đề và breadcrumb
        document.getElementById('category-title').textContent = specialCategoryName;
        document.getElementById('breadcrumb-category').textContent = specialCategoryName;
        document.getElementById('category-description').textContent = 
            `Hiển thị ${filteredProducts.length} sản phẩm thuộc danh mục ${specialCategoryName.toLowerCase()}`;
    }
    
    // Hiển thị danh sách sản phẩm
    renderCategoryProducts(currentCategoryProducts);
    
    // Thiết lập sự kiện cho bộ lọc
    setupFilterEvents();
}

// Hàm chuyển đổi category code thành tên hiển thị
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

// Hàm hiển thị danh sách sản phẩm
function renderCategoryProducts(productsList) {
    const productsGrid = document.getElementById('category-products');
    
    if (!productsGrid) {
        console.error("Products grid container not found!");
        return;
    }
    
    // Xóa nội dung hiện tại
    productsGrid.innerHTML = '';
    
    // Kiểm tra nếu không có sản phẩm nào
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
    
    // Thêm sản phẩm vào grid
    productsList.forEach(product => {
        // Format giá tiền
        const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
        
        // Tạo card sản phẩm
        const productCard = document.createElement('div');
        productCard.className = 'product-grid-card';
        productCard.dataset.id = product.id;
        productCard.dataset.category = product.category;
        
        // HTML structure - giống như trong file products.js
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
    
    // Thêm sự kiện click cho các nút "Thêm vào giỏ"
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

// Thiết lập sự kiện cho các bộ lọc
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

// Áp dụng các bộ lọc
function applyFilters() {
    // Lấy giá trị bộ lọc
    const sortValue = document.getElementById('sort-filter').value;
    const priceValue = document.getElementById('price-filter').value;
    
    // Sao chép danh sách sản phẩm hiện tại để lọc
    let filteredProducts = [...currentCategoryProducts];
    
    // Lọc theo giá
    if (priceValue !== 'all') {
        const priceLimits = priceValue.split('-');
        const minPrice = parseInt(priceLimits[0]);
        const maxPrice = priceLimits[1] === 'inf' ? Infinity : parseInt(priceLimits[1]);
        
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }
    
    // Sắp xếp sản phẩm
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
    
    // Cập nhật mô tả
    document.getElementById('category-description').textContent = 
        `Hiển thị ${filteredProducts.length} sản phẩm${currentCategory ? ' thuộc danh mục ' + getCategoryName(currentCategory).toLowerCase() : ''}`;
    
    // Hiển thị sản phẩm đã lọc
    renderCategoryProducts(filteredProducts);
}