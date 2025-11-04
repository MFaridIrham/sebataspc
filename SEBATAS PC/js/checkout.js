// Current step tracker
let currentStep = 1;

// Form data storage
let checkoutData = {
    shipping: {},
    payment: {},
    order: {
        items: [],
        subtotal: 0,
        shipping: 15.00,
        tax: 0,
        total: 0
    }
};

// Initialize checkout page
function initializeCheckout() {
    // Load cart items from localStorage (in a real app, this might come from a backend)
    loadCartItems();
    
    // Set up form submission handlers
    setupFormHandlers();
    
    // Initialize payment method handlers
    setupPaymentMethods();
}

// Load cart items
function loadCartItems() {
    // In a real application, you would get this from your cart/backend
    checkoutData.order.items = [
        {
            id: 1,
            name: "Gaming Laptop Pro X",
            price: 1299.99,
            quantity: 1
        },
        {
            id: 2,
            name: "RTX 4070 Graphics Card",
            price: 599.99,
            quantity: 1
        }
    ];

    // Calculate totals
    calculateOrderTotals();
}

// Calculate order totals
function calculateOrderTotals() {
    checkoutData.order.subtotal = checkoutData.order.items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );
    checkoutData.order.tax = checkoutData.order.subtotal * 0.1; // 10% tax
    checkoutData.order.total = checkoutData.order.subtotal + 
                              checkoutData.order.shipping + 
                              checkoutData.order.tax;
}

// Setup form handlers
function setupFormHandlers() {
    // Shipping form submission
    document.getElementById('shipping-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveShippingInfo();
        nextStep();
    });

    // Payment form submission
    document.getElementById('payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        savePaymentInfo();
        nextStep();
    });
}

// Setup payment method handlers
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            const creditCardForm = document.getElementById('credit-card-form');
            creditCardForm.style.display = this.value === 'credit-card' ? 'block' : 'none';
        });
    });
}

// Save shipping information
function saveShippingInfo() {
    checkoutData.shipping = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        phone: document.getElementById('phone').value
    };
}

// Save payment information
function savePaymentInfo() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    checkoutData.payment = {
        method: paymentMethod,
        cardNumber: document.getElementById('card-number').value,
        cardName: document.getElementById('card-name').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value
    };
}

// Move to next step
function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        updateCheckoutProgress();
        updateFormDisplay();
        
        if (currentStep === 3) {
            updateReviewSection();
        }
    }
}

// Move to previous step
function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateCheckoutProgress();
        updateFormDisplay();
    }
}

// Edit a specific step
function editStep(step) {
    currentStep = step;
    updateCheckoutProgress();
    updateFormDisplay();
}

// Update checkout progress display
function updateCheckoutProgress() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('completed');
        }
    });
}

// Update form display
function updateFormDisplay() {
    document.querySelectorAll('.checkout-form').forEach(form => {
        form.classList.remove('active');
    });

    let currentForm;
    switch (currentStep) {
        case 1:
            currentForm = document.getElementById('shipping-form');
            break;
        case 2:
            currentForm = document.getElementById('payment-form');
            break;
        case 3:
            currentForm = document.getElementById('order-review');
            break;
    }

    if (currentForm) {
        currentForm.classList.add('active');
    }
}

// Update review section
function updateReviewSection() {
    // Update shipping address
    const shippingAddress = document.getElementById('review-shipping-address');
    shippingAddress.innerHTML = `
        ${checkoutData.shipping.firstName} ${checkoutData.shipping.lastName}<br>
        ${checkoutData.shipping.address}<br>
        ${checkoutData.shipping.city}, ${checkoutData.shipping.state} ${checkoutData.shipping.zip}<br>
        ${checkoutData.shipping.country}<br>
        ${checkoutData.shipping.phone}
    `;

    // Update payment method
    const paymentMethod = document.getElementById('review-payment-method');
    paymentMethod.innerHTML = `
        ${getPaymentMethodDisplay(checkoutData.payment.method)}<br>
        ${checkoutData.payment.method === 'credit-card' ? 
            `Card ending in ${checkoutData.payment.cardNumber.slice(-4)}` : ''}
    `;

    // Update order items
    const orderItems = document.getElementById('review-order-items');
    orderItems.innerHTML = checkoutData.order.items.map(item => `
        <div class="review-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Update totals
    document.getElementById('review-subtotal').textContent = `$${checkoutData.order.subtotal.toFixed(2)}`;
    document.getElementById('review-shipping').textContent = `$${checkoutData.order.shipping.toFixed(2)}`;
    document.getElementById('review-tax').textContent = `$${checkoutData.order.tax.toFixed(2)}`;
    document.getElementById('review-total').textContent = `$${checkoutData.order.total.toFixed(2)}`;
}

// Get payment method display text
function getPaymentMethodDisplay(method) {
    switch (method) {
        case 'credit-card':
            return 'Credit/Debit Card';
        case 'paypal':
            return 'PayPal';
        case 'bank-transfer':
            return 'Bank Transfer';
        default:
            return 'Unknown Payment Method';
    }
}

// Place order
function placeOrder() {
    // In a real application, you would send the order to your backend
    showNotification('Order placed successfully! Thank you for your purchase.');
    
    // Simulate redirect to order confirmation
    setTimeout(() => {
        // Clear cart and redirect to home page
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    }, 2000);
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

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCheckout);