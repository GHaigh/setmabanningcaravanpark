// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Booking form functionality
const bookingForm = document.getElementById('bookingForm');
const accommodationType = document.getElementById('accommodationType');
const checkIn = document.getElementById('checkIn');
const checkOut = document.getElementById('checkOut');
const adults = document.getElementById('adults');
const children = document.getElementById('children');

// Pricing data
const pricing = {
    'camping': 25,
    'holiday-home': 120,
    'tourer': 35
};

// Update booking summary
function updateBookingSummary() {
    const accommodation = accommodationType.value;
    const checkInDate = checkIn.value;
    const checkOutDate = checkOut.value;
    const adultsCount = parseInt(adults.value);
    const childrenCount = parseInt(children.value);
    
    if (accommodation && checkInDate && checkOutDate) {
        const nights = calculateNights(checkInDate, checkOutDate);
        const pricePerNight = pricing[accommodation] || 0;
        const totalPrice = nights * pricePerNight;
        
        document.getElementById('summaryAccommodation').textContent = 
            accommodationType.options[accommodationType.selectedIndex].text;
        document.getElementById('summaryCheckIn').textContent = formatDate(checkInDate);
        document.getElementById('summaryCheckOut').textContent = formatDate(checkOutDate);
        document.getElementById('summaryGuests').textContent = 
            `${adultsCount} Adult${adultsCount > 1 ? 's' : ''}${childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}`;
        document.getElementById('summaryNights').textContent = `${nights} night${nights > 1 ? 's' : ''}`;
        document.getElementById('summaryTotal').textContent = `£${totalPrice}`;
    }
}

// Calculate number of nights
function calculateNights(checkIn, checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
checkIn.min = today;
checkOut.min = today;

// Update check-out minimum date when check-in changes
checkIn.addEventListener('change', () => {
    if (checkIn.value) {
        const nextDay = new Date(checkIn.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOut.min = nextDay.toISOString().split('T')[0];
    }
    updateBookingSummary();
});

// Add event listeners for form updates
[accommodationType, checkIn, checkOut, adults, children].forEach(element => {
    element.addEventListener('change', updateBookingSummary);
});

// Booking form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (!accommodationType.value || !checkIn.value || !checkOut.value || !adults.value) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate dates
    if (new Date(checkIn.value) >= new Date(checkOut.value)) {
        alert('Check-out date must be after check-in date.');
        return;
    }
    
    // Show payment modal
    showPaymentModal();
});

// Payment modal functionality
const paymentModal = document.getElementById('paymentModal');
const paymentForm = document.getElementById('paymentForm');
const backToBookingBtn = document.getElementById('backToBooking');

function showPaymentModal() {
    // Populate payment summary
    const summary = document.getElementById('paymentSummary');
    summary.innerHTML = `
        <div class="summary-item">
            <span>Accommodation:</span>
            <span>${accommodationType.options[accommodationType.selectedIndex].text}</span>
        </div>
        <div class="summary-item">
            <span>Check-in:</span>
            <span>${formatDate(checkIn.value)}</span>
        </div>
        <div class="summary-item">
            <span>Check-out:</span>
            <span>${formatDate(checkOut.value)}</span>
        </div>
        <div class="summary-item">
            <span>Guests:</span>
            <span>${adults.value} Adult${adults.value > 1 ? 's' : ''}${children.value > 0 ? `, ${children.value} Child${children.value > 1 ? 'ren' : ''}` : ''}</span>
        </div>
        <div class="summary-item">
            <span>Nights:</span>
            <span>${calculateNights(checkIn.value, checkOut.value)} night${calculateNights(checkIn.value, checkOut.value) > 1 ? 's' : ''}</span>
        </div>
        <div class="summary-item total">
            <span>Total Price:</span>
            <span>£${calculateNights(checkIn.value, checkOut.value) * pricing[accommodationType.value]}</span>
        </div>
    `;
    
    paymentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close payment modal
backToBookingBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with X button
document.querySelector('.close').addEventListener('click', () => {
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Payment form validation and submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate payment form
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    const billingAddress = document.getElementById('billingAddress').value;
    
    if (!cardNumber || !expiryDate || !cvv || !cardName || !billingAddress) {
        alert('Please fill in all payment fields.');
        return;
    }
    
    // Validate card number (basic validation)
    if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid card number.');
        return;
    }
    
    // Validate expiry date
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter expiry date in MM/YY format.');
        return;
    }
    
    // Validate CVV
    if (!/^\d{3}$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV.');
        return;
    }
    
    // Simulate payment processing
    showPaymentProcessing();
});

// Show payment processing
function showPaymentProcessing() {
    const submitBtn = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Processing Payment...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        showSuccessModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Success modal
const successModal = document.getElementById('successModal');

function showSuccessModal() {
    // Generate booking reference
    const bookingRef = 'SET' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('bookingReference').textContent = bookingRef;
    
    successModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    bookingForm.reset();
    updateBookingSummary();
}

// Close success modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Card number formatting
document.getElementById('cardNumber').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Expiry date formatting
document.getElementById('expiryDate').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// CVV formatting (numbers only)
document.getElementById('cvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.accommodation-card, .about-content, .contact-content').forEach(el => {
    observer.observe(el);
});

// Initialize booking summary
updateBookingSummary();

// Add loading states and better UX
function addLoadingState(element, text) {
    const originalText = element.textContent;
    element.textContent = text;
    element.disabled = true;
    return () => {
        element.textContent = originalText;
        element.disabled = false;
    };
}

// Add smooth reveal animation for hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    setTimeout(() => {
        heroContent.classList.add('fade-in-up');
    }, 100);
    
    setTimeout(() => {
        heroImage.classList.add('fade-in-up');
    }, 300);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add click tracking for analytics (mock)
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // In a real application, this would send data to analytics service
}

// Track booking form interactions
document.querySelectorAll('#bookingForm input, #bookingForm select').forEach(element => {
    element.addEventListener('change', () => {
        trackEvent('booking_form_interaction', {
            field: element.id,
            value: element.value
        });
    });
});

// Track accommodation card clicks
document.querySelectorAll('.accommodation-card .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.accommodation-card');
        const accommodationType = card.querySelector('h3').textContent;
        trackEvent('accommodation_interest', {
            type: accommodationType
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (paymentModal.style.display === 'block') {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (successModal.style.display === 'block') {
            closeSuccessModal();
        }
    }
});

// Add form validation feedback
function showFieldError(field, message) {
    field.style.borderColor = '#dc3545';
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '#e9ecef';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Enhanced form validation
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('#bookingForm input, #bookingForm select').forEach(field => {
        field.style.borderColor = '#e9ecef';
    });
    
    // Validate required fields
    const requiredFields = [
        { field: accommodationType, message: 'Please select accommodation type' },
        { field: checkIn, message: 'Please select check-in date' },
        { field: checkOut, message: 'Please select check-out date' },
        { field: adults, message: 'Please select number of adults' }
    ];
    
    requiredFields.forEach(({ field, message }) => {
        if (!field.value) {
            showFieldError(field, message);
            isValid = false;
        }
    });
    
    // Validate dates
    if (checkIn.value && checkOut.value) {
        if (new Date(checkIn.value) >= new Date(checkOut.value)) {
            showFieldError(checkOut, 'Check-out date must be after check-in date');
            isValid = false;
        }
    }
    
    if (isValid) {
        showPaymentModal();
    }
});

// Clear errors on field change
document.querySelectorAll('#bookingForm input, #bookingForm select').forEach(field => {
    field.addEventListener('change', () => {
        clearFieldError(field);
    });
});

console.log('Setmabanning Caravan Park website loaded successfully!');
