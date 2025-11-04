// Handle tab switching
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all tabs and forms
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding form
        button.classList.add('active');
        document.getElementById(`${button.dataset.tab}-form`).classList.add('active');
    });
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful login
    console.log('Login attempt:', { email, password, rememberMe });

    // Simulate API call
    setTimeout(() => {
        // For demo purposes, always succeed
        const success = true;
        
        if (success) {
            // Store user data in localStorage if remember me is checked
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify({ email }));
            }
            
            // Show success message and redirect
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage('Invalid email or password', 'error');
        }
    }, 1000);

    return false;
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const terms = document.getElementById('terms').checked;

    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return false;
    }

    // Validate terms acceptance
    if (!terms) {
        showMessage('Please accept the Terms & Conditions', 'error');
        return false;
    }

    // Here you would typically make an API call to your backend
    console.log('Register attempt:', { name, email, password });

    // Simulate API call
    setTimeout(() => {
        // For demo purposes, always succeed
        const success = true;
        
        if (success) {
            showMessage('Registration successful! Please login.', 'success');
            
            // Clear form and switch to login tab
            event.target.reset();
            document.querySelector('[data-tab="login"]').click();
        } else {
            showMessage('Registration failed. Please try again.', 'error');
        }
    }, 1000);

    return false;
}

// Helper function to show messages
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create and show new message
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type === 'success' ? 'success-message' : 'error-message'}`;
    messageElement.textContent = message;

    const activeForm = document.querySelector('.auth-form.active');
    activeForm.insertBefore(messageElement, activeForm.querySelector('button'));

    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Check for remembered user on page load
document.addEventListener('DOMContentLoaded', () => {
    const rememberedUser = localStorage.getItem('user');
    if (rememberedUser) {
        const { email } = JSON.parse(rememberedUser);
        document.getElementById('login-email').value = email;
        document.getElementById('remember-me').checked = true;
    }
});