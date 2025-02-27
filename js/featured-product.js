// Function to initialize featured products carousel
function initFeaturedCarousel() {
    console.log("Initializing featured products carousel...");
    
    // Get DOM elements
    const productsContainer = document.querySelector('.featured__products');
    const prevButton = document.querySelector('.featured__carousel .carousel-control.prev');
    const nextButton = document.querySelector('.featured__carousel .carousel-control.next');
    
    if (!productsContainer) {
        console.error("Products container not found!");
        return;
    }
    
    // Filter products to get only featured ones
    const featuredProducts = products.filter(product => product.featured);
    
    // Check if we have any featured products
    if (featuredProducts.length === 0) {
        console.log("No featured products found!");
        document.querySelector('.featured').style.display = 'none';
        return;
    } else {
        // Make sure the featured section is visible
        document.querySelector('.featured').style.display = 'block';
        renderProducts(featuredProducts);
    }
    
    // Function to render products
    function renderProducts(productsList) {
        // Clear container
        productsContainer.innerHTML = '';
        
        // Add products
        productsList.forEach(product => {
            // Format price with commas
            const formattedPrice = product.price.toLocaleString('vi-VN') + '₫';
            
            // Create product card
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${formattedPrice}</p>
                <button class="add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to "Add to cart" buttons
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
    
    // Function to scroll carousel
    function scrollCarousel(direction) {
        const cardWidth = productsContainer.querySelector('.product-card').offsetWidth + 20; // + gap
        const scrollAmount = cardWidth * 3; // Scroll 3 items at a time
        
        if (direction === 'next') {
            productsContainer.scrollLeft += scrollAmount;
        } else {
            productsContainer.scrollLeft -= scrollAmount;
        }
    }
    
    // Add event listeners to navigation buttons
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
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            scrollCarousel('next');
        } else if (e.key === 'ArrowLeft') {
            scrollCarousel('prev');
        }
    });
    
    console.log("Featured carousel initialization complete");
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if products are loaded
    if (typeof products !== 'undefined') {
        initFeaturedCarousel();
    } else {
        // If products not loaded yet, wait for main.js to finish loading components
        const checkProducts = setInterval(() => {
            if (typeof products !== 'undefined') {
                clearInterval(checkProducts);
                initFeaturedCarousel();
            }
        }, 100);
    }
});