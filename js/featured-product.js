function initFeaturedCarousel() {
    console.log("Initializing featured products carousel...");
    
    const productsContainer = document.querySelector('.featured__products');
    const prevButton = document.querySelector('.featured__carousel .carousel-control.prev');
    const nextButton = document.querySelector('.featured__carousel .carousel-control.next');
    
    if (!productsContainer) {
        console.error("Products container not found!");
        return;
    }
    
    const featuredProducts = products.filter(product => product.featured);
    
    if (featuredProducts.length === 0) {
        console.log("No featured products found!");
        document.querySelector('.featured').style.display = 'none';
        return;
    } else {
        document.querySelector('.featured').style.display = 'block';
        renderProducts(featuredProducts);
    }
    
    function renderProducts(productsList) {
        // Clear container
        productsContainer.innerHTML = '';
        
        productsList.forEach(product => {
            const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-content">
                    <p class="price">${formattedPrice}</p>
                    <h3>${product.name}</h3>
                    <button class="add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        document.querySelectorAll('.featured__products .add-to-cart').forEach(button => {
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
    
    function scrollCarousel(direction) {
        const cardWidth = productsContainer.querySelector('.product-card').offsetWidth + 20; // + gap
        const scrollAmount = cardWidth * 3; // Scroll 3 items at a time
        
        if (direction === 'next') {
            productsContainer.scrollLeft += scrollAmount;
        } else {
            productsContainer.scrollLeft -= scrollAmount;
        }
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => scrollCarousel('prev'));
    } else {
        console.error("Previous button not found in featured carousel!");
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => scrollCarousel('next'));
    } else {
        console.error("Next button not found in featured carousel!");
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            scrollCarousel('next');
        } else if (e.key === 'ArrowLeft') {
            scrollCarousel('prev');
        }
    });
    
    console.log("Featured carousel initialization complete");
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof products !== 'undefined') {
        initFeaturedCarousel();
    } else {
        const checkProducts = setInterval(() => {
            if (typeof products !== 'undefined') {
                clearInterval(checkProducts);
                initFeaturedCarousel();
            }
        }, 100);
    }
});