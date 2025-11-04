// Sample product data (in a real application, this would come from a backend)
const productData = {
    id: 1,
    name: "Gaming Laptop Pro X",
    price: 1299.99,
    originalPrice: 1499.99,
    description: "Experience ultimate gaming performance with the Gaming Laptop Pro X. Featuring the latest NVIDIA RTX graphics and powerful Intel processor, this laptop delivers exceptional gaming experiences and content creation capabilities.",
    specs: [
        "Intel Core i7 12th Gen",
        "NVIDIA RTX 3070 8GB",
        "16GB DDR4 RAM",
        "1TB NVMe SSD",
        "15.6\" QHD 165Hz Display",
        "RGB Backlit Keyboard",
        "Wi-Fi 6E",
        "Windows 11 Pro"
    ],
    images: [
        "assets/laptop-1.jpg",
        "assets/laptop-2.jpg",
        "assets/laptop-3.jpg",
        "assets/laptop-4.jpg"
    ],
    reviews: [
        {
            name: "John D.",
            rating: 5,
            date: "2025-10-15",
            comment: "Amazing laptop! The performance is incredible and the build quality is top-notch."
        },
        {
            name: "Sarah M.",
            rating: 4,
            date: "2025-10-10",
            comment: "Great gaming performance, but the fan can get a bit loud under heavy load."
        }
        // Add more reviews as needed
    ]
};

// Get product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// In a real application, you would fetch the product data based on the ID
// For now, we'll use our sample data

// Initialize page with product data
function initializeProductPage() {
    // Set product name
    document.getElementById('product-name').textContent = productData.name;
    
    // Set prices
    document.getElementById('product-price').textContent = `$${productData.price.toFixed(2)}`;
    document.getElementById('original-price').textContent = `$${productData.originalPrice.toFixed(2)}`;
    
    // Calculate and set discount
    const discount = ((productData.originalPrice - productData.price) / productData.originalPrice * 100).toFixed(0);
    document.getElementById('discount-percentage').textContent = `-${discount}%`;
    
    // Set description
    document.getElementById('product-description').textContent = productData.description;
    
    // Set specifications
    const specsList = document.getElementById('product-specs');
    productData.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
    
    // Set main image
    document.getElementById('main-product-image').src = productData.images[0];
    
    // Create thumbnail images
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    productData.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Product thumbnail ${index + 1}">`;
        thumbnail.addEventListener('click', () => switchMainImage(image, thumbnail));
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Initialize reviews
    initializeReviews();
}

// Switch main product image
function switchMainImage(imageSrc, thumbnailElement) {
    document.getElementById('main-product-image').src = imageSrc;
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
}

// Initialize reviews section
function initializeReviews() {
    const reviewsList = document.querySelector('.reviews-list');
    
    // Add review items
    productData.reviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsList.appendChild(reviewElement);
    });
    
    // Initialize rating breakdown
    initializeRatingBreakdown();
}

// Create review element
function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item';
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <span class="reviewer-name">${review.name}</span>
            <span class="review-date">${formatDate(review.date)}</span>
        </div>
        <div class="stars">
            ${createStarRating(review.rating)}
        </div>
        <p class="review-comment">${review.comment}</p>
    `;
    
    return reviewDiv;
}

// Create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Initialize rating breakdown
function initializeRatingBreakdown() {
    const ratingBreakdown = document.querySelector('.rating-breakdown');
    
    // Calculate rating distribution (in a real app, this would come from the backend)
    const ratings = {
        5: 75,
        4: 15,
        3: 7,
        2: 2,
        1: 1
    };
    
    // Create rating bars
    for (let i = 5; i >= 1; i--) {
        const percentage = ratings[i];
        const ratingBar = document.createElement('div');
        ratingBar.className = 'rating-bar';
        ratingBar.innerHTML = `
            <span>${i} star</span>
            <div class="progress-bar">
                <div class="fill" style="width: ${percentage}%"></div>
            </div>
            <span>${percentage}%</span>
        `;
        ratingBreakdown.appendChild(ratingBar);
    }
}

// Update quantity
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    const newValue = Math.max(1, Math.min(99, parseInt(quantityInput.value) + change));
    quantityInput.value = newValue;
}

// Add to cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    // Here you would typically update the cart in your shopping cart system
    // For now, we'll just show a notification
    showNotification(`Added ${quantity} item(s) to cart`);
}

// Buy now
function buyNow() {
    const quantity = parseInt(document.getElementById('quantity').value);
    // Here you would typically redirect to the checkout page
    // For now, we'll just show a notification
    showNotification('Redirecting to checkout...');
    // Simulate redirect
    setTimeout(() => {
        // window.location.href = 'checkout.html';
        console.log('Redirect to checkout');
    }, 1500);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProductPage);