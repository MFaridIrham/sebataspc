// Sample cart data (in a real application, this would be stored in localStorage or a backend)
let cartItems = [
    {
        id: 1,
        name: "Gaming Laptop Pro X",
        price: 1299.99,
        image: "assets/laptop-1.jpg",
        quantity: 1,
        stock: 10
    },
    {
        id: 2,
        name: "RTX 4070 Graphics Card",
        price: 599.99,
        image: "assets/gpu.jpg",
        quantity: 1,
        stock: 5
    }
];

// Sample suggested products
const suggestedProducts = [
    {
        id: 3,
        name: "27\" 4K Gaming Monitor",
        price: 399.99,
        image: "assets/monitor.jpg",
        description: "Ultra-sharp 4K display with HDR support"
    },
    {
        id: 4,
        name: "Mechanical Gaming Keyboard",
        price: 129.99,
        image: "assets/keyboard.jpg",
        description: "RGB mechanical keyboard with custom switches"
    },
    {
        id: 5,
        name: "Gaming Mouse Pro",
        price: 79.99,
        image: "assets/mouse.jpg",
        description: "High-precision gaming mouse with adjustable DPI"
    }
];

// Initialize the cart page
function initializeCart() {
    updateCartDisplay();
    updateSummary();
    displaySuggestedProducts();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');

    if (cartItems.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartContent.style.display = 'grid';
        
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>In Stock: ${item.stock}</p>
                </div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="${item.stock}"
                            onchange="updateQuantityDirect(${item.id}, this.value)">
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Update cart count in header
    updateCartCount();
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1 && newQuantity <= item.stock) {
            item.quantity = newQuantity;
            updateCartDisplay();
            updateSummary();
            showNotification('Cart updated');
        }
    }
}

// Update quantity directly
function updateQuantityDirect(itemId, newQuantity) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        newQuantity = parseInt(newQuantity);
        if (newQuantity >= 1 && newQuantity <= item.stock) {
            item.quantity = newQuantity;
            updateCartDisplay();
            updateSummary();
            showNotification('Cart updated');
        } else {
            // Reset to valid quantity if input is invalid
            updateCartDisplay();
        }
    }
}

// Remove item from cart
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCartDisplay();
    updateSummary();
    showNotification('Item removed from cart');
}

// Update cart summary
function updateSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15.00 : 0; // Free shipping over certain amount could be implemented here
    const tax = subtotal * 0.1; // 10% tax rate
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${totalItems})`;
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.querySelector('.promo-code input');
    const promoCode = promoInput.value.trim();
    
    // In a real application, you would validate the promo code with your backend
    if (promoCode === 'DISCOUNT20') {
        showNotification('Promo code applied successfully!');
        // Apply discount logic here
    } else {
        showNotification('Invalid promo code', 'error');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // In a real application, you would redirect to the checkout page
    window.location.href = 'checkout.html';
}

// Display suggested products
function displaySuggestedProducts() {
    const productGrid = document.querySelector('.suggested-products .product-grid');
    
    productGrid.innerHTML = suggestedProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add suggested product to cart
function addToCart(productId) {
    const product = suggestedProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            updateQuantity(productId, 1);
        } else {
            cartItems.push({
                ...product,
                quantity: 1,
                stock: 10 // Default stock value
            });
            updateCartDisplay();
            updateSummary();
        }
        showNotification('Item added to cart');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCart);