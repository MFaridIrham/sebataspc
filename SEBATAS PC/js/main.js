// Sample product data (in a real application, this would come from a backend)
const products = [
    {
        id: 1,
        name: "Gaming Laptop Pro",
        price: 1299.99,
        description: "High-performance gaming laptop with RTX 3060",
        image: "assets/laptop.jpg",
        category: "Laptops"
    },
    {
        id: 2,
        name: "RTX 4070 Graphics Card",
        price: 599.99,
        description: "Latest generation GPU for gaming enthusiasts",
        image: "assets/gpu.jpg",
        category: "GPUs"
    },
    {
        id: 3,
        name: "27\" 4K Monitor",
        price: 399.99,
        description: "Ultra-sharp 4K display with HDR support",
        image: "assets/monitor.jpg",
        category: "Monitors"
    },
    // Add more products as needed
];

// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `;
}

// Initialize shopping cart
let cart = [];

// Function to add items to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
        showNotification('Product added to cart!');
    }
}

// Function to update cart UI
function updateCartUI() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cart.length})`;
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to initialize the page
function initializePage() {
    // Populate featured products
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.innerHTML = products.map(createProductCard).join('');
    }

    // Initialize search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            // Implement search functionality
            console.log('Search clicked');
        });
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Add CSS styles for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #007bff;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        animation: slideIn 0.5s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .product-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .product-card:hover {
        transform: translateY(-5px);
    }

    .product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .product-info {
        padding: 1rem;
    }

    .price {
        font-size: 1.2rem;
        font-weight: bold;
        color: #007bff;
        margin: 0.5rem 0;
    }

    .add-to-cart {
        width: 100%;
        padding: 0.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .add-to-cart:hover {
        background-color: #0056b3;
    }
`;
document.head.appendChild(style);

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);