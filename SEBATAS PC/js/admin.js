// Sample data
const sampleData = {
    orders: [
        { id: "ORD001", customer: "John Doe", product: "Gaming Laptop Pro X", amount: 1299.99, status: "Pending" },
        { id: "ORD002", customer: "Jane Smith", product: "RTX 4070", amount: 599.99, status: "Shipped" },
        { id: "ORD003", customer: "Mike Johnson", product: "4K Monitor", amount: 399.99, status: "Delivered" }
    ],
    products: [
        {
            id: 1,
            name: "Gaming Laptop Pro X",
            category: "laptops",
            price: 1299.99,
            stock: 10,
            status: "in-stock"
        },
        {
            id: 2,
            name: "RTX 4070 Graphics Card",
            category: "gpus",
            price: 599.99,
            stock: 5,
            status: "low-stock"
        }
    ]
};

// Initialize admin dashboard
function initializeAdmin() {
    // Set up navigation
    setupNavigation();
    
    // Initialize charts
    initializeCharts();
    
    // Load initial data
    loadDashboardData();
    
    // Set up event listeners
    setupEventListeners();
}

// Set up navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding page
            const pageId = `${item.dataset.page}-page`;
            document.getElementById(pageId).classList.add('active');
        });
    });

    // Mobile menu toggle
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.admin-sidebar').classList.toggle('active');
    });
}

// Initialize charts
function initializeCharts() {
    // Sales Chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#007bff',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Load dashboard data
function loadDashboardData() {
    // Load recent orders
    loadRecentOrders();
    
    // Load products
    loadProducts();
}

// Load recent orders
function loadRecentOrders() {
    const tableBody = document.querySelector('.data-table tbody');
    
    tableBody.innerHTML = sampleData.orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>$${order.amount.toFixed(2)}</td>
            <td>
                <span class="status-badge ${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </td>
        </tr>
    `).join('');
}

// Load products
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    productsGrid.innerHTML = sampleData.products.map(product => `
        <div class="product-card">
            <div class="product-header">
                <h3>${product.name}</h3>
                <div class="product-actions">
                    <button onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Stock: ${product.stock}</p>
                <span class="status-badge ${product.status}">
                    ${product.status.replace('-', ' ')}
                </span>
            </div>
        </div>
    `).join('');
}

// Set up event listeners
function setupEventListeners() {
    // Add product form submission
    document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);
    
    // Filter listeners
    setupFilters();
}

// Set up filters
function setupFilters() {
    const filters = document.querySelectorAll('.filters select, .filters input');
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}

// Apply filters
function applyFilters() {
    // Get filter values
    const categoryFilter = document.getElementById('category-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const searchFilter = document.querySelector('.filters input[type="text"]').value.toLowerCase();
    
    // Filter products
    const filteredProducts = sampleData.products.filter(product => {
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesStatus = !statusFilter || product.status === statusFilter;
        const matchesSearch = !searchFilter || 
            product.name.toLowerCase().includes(searchFilter) ||
            product.category.toLowerCase().includes(searchFilter);
        
        return matchesCategory && matchesStatus && matchesSearch;
    });
    
    // Update products display
    const productsGrid = document.querySelector('.products-grid');
    // ... update with filtered products
}

// Handle add product
function handleAddProduct(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        description: document.getElementById('product-description').value,
        // Image handling would typically involve file upload
    };
    
    // Add to products (in a real app, this would be an API call)
    sampleData.products.push({
        id: sampleData.products.length + 1,
        ...formData,
        status: formData.stock > 5 ? 'in-stock' : 'low-stock'
    });
    
    // Refresh products display
    loadProducts();
    
    // Close modal
    closeAddProductModal();
    
    // Show success message
    showNotification('Product added successfully');
}

// Modal functions
function openAddProductModal() {
    document.getElementById('add-product-modal').classList.add('active');
}

function closeAddProductModal() {
    document.getElementById('add-product-modal').classList.remove('active');
    document.getElementById('add-product-form').reset();
}

// Product management functions
function editProduct(productId) {
    // Find product
    const product = sampleData.products.find(p => p.id === productId);
    if (!product) return;
    
    // In a real app, this would open an edit modal with the product data
    console.log('Editing product:', product);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        // Remove product
        sampleData.products = sampleData.products.filter(p => p.id !== productId);
        
        // Refresh products display
        loadProducts();
        
        // Show success message
        showNotification('Product deleted successfully');
    }
}

// Handle logout
function handleLogout() {
    // In a real app, this would handle logout logic
    window.location.href = 'auth.html';
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAdmin);