// Function to initialize cart
function initCart() {
    // Get cart count element
    const cartCount = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart-icon');
    
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
    
    // Create cart modal
    function createCartModal() {
        // Check if modal already exists
        if (document.getElementById('cart-modal')) {
            return;
        }
        
        // Create modal container
        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'cart-modal';
        
        // Create modal content
        modal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h3>Giỏ hàng của bạn</h3>
                    <button class="close-cart">&times;</button>
                </div>
                <div class="cart-items">
                    <!-- Cart items will be displayed here -->
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Tổng cộng:</span>
                        <span class="total-amount">0₫</span>
                    </div>
                    <button class="checkout-btn">Thanh toán</button>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Add event listener to close button
        modal.querySelector('.close-cart').addEventListener('click', function() {
            modal.classList.remove('show');
        });
        
        // Add event listener to checkout button
        modal.querySelector('.checkout-btn').addEventListener('click', function() {
            alert('Chức năng thanh toán đang được phát triển!');
        });
        
        // Close modal when clicking outside the content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Render cart items
    function renderCartItems() {
        const cartItems = document.querySelector('.cart-items');
        const totalAmount = document.querySelector('.total-amount');
        
        if (!cartItems || !totalAmount) {
            return;
        }
        
        // Clear cart items
        cartItems.innerHTML = '';
        
        // Check if cart is empty
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
            totalAmount.textContent = '0₫';
            return;
        }
        
        // Calculate total amount
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Format total amount
        totalAmount.textContent = total.toLocaleString('vi-VN') + '₫';
        
        // Add cart items
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.id = item.id;
            
            // Cấu trúc: ảnh bên trái, tên sản phẩm bên phải góc trên và giá sản phẩm góc dưới bên phải
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">${item.price.toLocaleString('vi-VN')}₫</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">Xóa</button>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons
        cartItems.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                decreaseQuantity(itemId);
            });
        });
        
        cartItems.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                increaseQuantity(itemId);
            });
        });
        
        cartItems.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                removeItem(itemId);
            });
        });
    }
    
    // Decrease item quantity
    function decreaseQuantity(itemId) {
        const item = cart.find(item => item.id == itemId);
        
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            saveCartAndUpdate();
        }
    }
    
    // Increase item quantity
    function increaseQuantity(itemId) {
        const item = cart.find(item => item.id == itemId);
        
        if (item) {
            item.quantity += 1;
            saveCartAndUpdate();
        }
    }
    
    // Remove item from cart
    function removeItem(itemId) {
        cart = cart.filter(item => item.id != itemId);
        saveCartAndUpdate();
    }
    
    // Save cart to localStorage and update UI
    function saveCartAndUpdate() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
    
    // Toggle cart modal
    function toggleCartModal() {
        const modal = document.getElementById('cart-modal');
        
        if (modal) {
            modal.classList.toggle('show');
            renderCartItems();
        }
    }
    
    // Create cart modal
    createCartModal();
    
    // Add event listener to cart icon
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCartModal();
        });
    } else {
        console.error("Cart icon not found!");
    }
    
    // Initialize cart count
    updateCartCount();
}