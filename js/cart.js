// Function to initialize cart
function initCart() {
    // Get cart count element
    const cartCount = document.querySelector('.cart-count');
    
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count display
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    // Add product to cart
    window.addToCart = function(productId) {
        // Find product in products array
        const product = products.find(p => p.id == productId);
        
        if (!product) {
            console.error('Product not found!');
            return;
        }
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id == productId);
        
        if (existingItem) {
            // Increase quantity
            existingItem.quantity += 1;
        } else {
            // Add new item to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    };
    
    // Initialize cart count
    updateCartCount();
}