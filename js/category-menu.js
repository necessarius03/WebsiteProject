function initCategoryMenu() {
    console.log("Initializing dynamic category menu...");
    
    if (typeof products === 'undefined') {
        console.error("Products data not found!");
        return;
    }
    
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (!dropdownContent) {
        console.error("Dropdown content element not found!");
        return;
    }
    
    const categories = [...new Set(products.map(product => product.category))];
    console.log("Found categories:", categories);
    
    let categoryHTML = '';
    
    categories.forEach(category => {
        const iconPath = `images/icons/${category}.png`;
        const categoryName = getCategoryName(category);
        
        categoryHTML += `<a href="category.html?category=${category}" data-category="${category}"><img src="${iconPath}" alt="${categoryName}"> ${categoryName}</a>`;
    });
    
    categoryHTML += '<div class="dropdown-divider"></div>';
    
    categoryHTML += `
        <a href="category.html?special=luxury"><img src="images/icons/luxury.png" alt="Thương hiệu cao cấp"> Thương hiệu cao cấp</a>
        <a href="category.html?special=korean"><img src="images/icons/korean.png" alt="Mỹ phẩm Hàn Quốc"> Mỹ phẩm Hàn Quốc</a>
        <a href="category.html?special=organic"><img src="images/icons/organic.png" alt="Mỹ phẩm thiên nhiên"> Mỹ phẩm thiên nhiên</a>
    `;
    
    dropdownContent.innerHTML = categoryHTML;
    
    document.querySelectorAll('.dropdown-content a[data-category]').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log("Navigating to category:", this.getAttribute('data-category'));
        });
    });
    
    console.log("Category menu updated with dynamic data");
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

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.header') && document.querySelector('.dropdown-content')) {
        if (typeof products !== 'undefined') {
            initCategoryMenu();
        } else {
            const checkProducts = setInterval(() => {
                if (typeof products !== 'undefined') {
                    clearInterval(checkProducts);
                    initCategoryMenu();
                }
            }, 100);
        }
    } else {
        const checkHeader = setInterval(() => {
            if (document.querySelector('.header') && document.querySelector('.dropdown-content')) {
                clearInterval(checkHeader);
                
                if (typeof products !== 'undefined') {
                    initCategoryMenu();
                } else {
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