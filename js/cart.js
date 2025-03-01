function initCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart-icon');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    window.addToCart = function(productId) {
        const product = products.find(p => p.id == productId);
        
        if (!product) {
            console.error('Product not found!');
            return;
        }
        
        const existingItem = cart.find(item => item.id == productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();
        
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    };
    
    function createCartModal() {
        if (document.getElementById('cart-modal')) {
            return;
        }
        
        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'cart-modal';
        
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
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-cart').addEventListener('click', function() {
            modal.classList.remove('show');
        });
        
        modal.querySelector('.checkout-btn').addEventListener('click', function() {
            alert('Chức năng thanh toán đang được phát triển!');
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    function renderCartItems() {
        const cartItems = document.querySelector('.cart-items');
        const totalAmount = document.querySelector('.total-amount');
        
        if (!cartItems || !totalAmount) {
            return;
        }
        
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
            totalAmount.textContent = '0₫';
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Format total amount
        totalAmount.textContent = total.toLocaleString('vi-VN') + '₫';
        
        // Add cart items
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.id = item.id;
            
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
    
    function decreaseQuantity(itemId) {
        const item = cart.find(item => item.id == itemId);
        
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            saveCartAndUpdate();
        }
    }
    
    function increaseQuantity(itemId) {
        const item = cart.find(item => item.id == itemId);
        
        if (item) {
            item.quantity += 1;
            saveCartAndUpdate();
        }
    }
    
    function removeItem(itemId) {
        cart = cart.filter(item => item.id != itemId);
        saveCartAndUpdate();
    }
    
    function saveCartAndUpdate() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
    
    function toggleCartModal() {
        const modal = document.getElementById('cart-modal');
        
        if (modal) {
            modal.classList.toggle('show');
            renderCartItems();
        }
    }
    
    createCartModal();
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCartModal();
        });
    } else {
        console.error("Cart icon not found!");
    }
    
    updateCartCount();
}