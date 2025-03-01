// Function để khởi tạo menu danh mục động
function initCategoryMenu() {
    console.log("Initializing dynamic category menu...");
    
    // Đảm bảo dữ liệu products đã được load
    if (typeof products === 'undefined') {
        console.error("Products data not found!");
        return;
    }
    
    // Lấy element dropdown content
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (!dropdownContent) {
        console.error("Dropdown content element not found!");
        return;
    }
    
    // Lấy danh sách các category duy nhất từ products
    const categories = [...new Set(products.map(product => product.category))];
    console.log("Found categories:", categories);
    
    // Tạo HTML cho các danh mục
    let categoryHTML = '';
    
    categories.forEach(category => {
        // Lấy đường dẫn icon dựa vào category
        const iconPath = `images/icons/${category}.png`;
        // Lấy tên hiển thị cho category
        const categoryName = getCategoryName(category);
        
        // Thay đổi ở đây: sử dụng link đến category.html với tham số category
        categoryHTML += `<a href="category.html?category=${category}" data-category="${category}"><img src="${iconPath}" alt="${categoryName}"> ${categoryName}</a>`;
    });
    
    // Thêm divider
    categoryHTML += '<div class="dropdown-divider"></div>';
    
    // Các danh mục khác nếu cần
    categoryHTML += `
        <a href="category.html?special=luxury"><img src="images/icons/luxury.png" alt="Thương hiệu cao cấp"> Thương hiệu cao cấp</a>
        <a href="category.html?special=korean"><img src="images/icons/korean.png" alt="Mỹ phẩm Hàn Quốc"> Mỹ phẩm Hàn Quốc</a>
        <a href="category.html?special=organic"><img src="images/icons/organic.png" alt="Mỹ phẩm thiên nhiên"> Mỹ phẩm thiên nhiên</a>
    `;
    
    // Cập nhật nội dung dropdown
    dropdownContent.innerHTML = categoryHTML;
    
    // Loại bỏ sự kiện click cũ (vì giờ ta dùng href trực tiếp)
    // Tuy nhiên, ta có thể giữ lại sự kiện để xử lý các thao tác đặc biệt nếu cần
    document.querySelectorAll('.dropdown-content a[data-category]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Không cần preventDefault() vì chúng ta muốn chuyển hướng đến trang mới
            console.log("Navigating to category:", this.getAttribute('data-category'));
        });
    });
    
    console.log("Category menu updated with dynamic data");
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

// Chạy khởi tạo khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem header đã được load chưa
    if (document.querySelector('.header') && document.querySelector('.dropdown-content')) {
        // Kiểm tra xem products đã được load chưa
        if (typeof products !== 'undefined') {
            initCategoryMenu();
        } else {
            // Nếu products chưa được load, đợi đến khi nó có sẵn
            const checkProducts = setInterval(() => {
                if (typeof products !== 'undefined') {
                    clearInterval(checkProducts);
                    initCategoryMenu();
                }
            }, 100);
        }
    } else {
        // Nếu header chưa được load, đợi đến khi nó xuất hiện
        const checkHeader = setInterval(() => {
            if (document.querySelector('.header') && document.querySelector('.dropdown-content')) {
                clearInterval(checkHeader);
                
                // Bây giờ kiểm tra xem products đã được load chưa
                if (typeof products !== 'undefined') {
                    initCategoryMenu();
                } else {
                    // Nếu products chưa được load, đợi đến khi nó có sẵn
                    const checkProducts = setInterval(() => {
                        if (typeof products !== 'undefined') {
                            clearInterval(checkProducts);
                            initCategoryMenu();
                        }
                    }, 100);
                }
            }
        }, 100);
    }
});