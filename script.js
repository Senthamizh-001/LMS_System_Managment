// JavaScript for EduLearn LMS Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Course enrollment functionality
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseName = this.getAttribute('data-course');
            showEnrollmentModal(courseName);
        });
    });

    // Course filtering functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const courseItems = document.querySelectorAll('.course-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            courseItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .feature-icon, .value-icon');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Show enrollment confirmation modal
function showEnrollmentModal(courseName) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Course Enrollment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="mb-3">
                        <i class="fas fa-graduation-cap text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h6>Enrollment Confirmation</h6>
                    <p class="text-muted mb-4">You're about to enroll in:</p>
                    <h5 class="text-primary mb-4">${courseName}</h5>
                    <p class="small text-muted">In a real application, this would redirect to a payment page or user registration form.</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-primary" onclick="confirmEnrollment('${courseName}')">
                        <i class="fas fa-check me-2"></i>Confirm Enrollment
                    </button>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Clean up modal after hiding
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}

// Confirm enrollment
function confirmEnrollment(courseName) {
    // Hide the current modal
    const currentModal = document.querySelector('.modal.show');
    if (currentModal) {
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
    }
    
    // Show success message
    setTimeout(() => {
        showSuccessToast(`Successfully enrolled in "${courseName}"! Check your email for further instructions.`);
    }, 300);
}

// Show success toast notification
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed';
    toast.style.cssText = 'top: 100px; right: 20px; z-index: 9999;';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-check-circle me-2"></i>${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();
    
    // Clean up toast after hiding
    toast.addEventListener('hidden.bs.toast', function() {
        document.body.removeChild(toast);
    });
}

// Validate contact form
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Reset previous validation states
    form.classList.remove('was-validated');
    
    // Validate required fields
    if (!firstName.value.trim()) {
        firstName.classList.add('is-invalid');
        isValid = false;
    } else {
        firstName.classList.remove('is-invalid');
        firstName.classList.add('is-valid');
    }
    
    if (!lastName.value.trim()) {
        lastName.classList.add('is-invalid');
        isValid = false;
    } else {
        lastName.classList.remove('is-invalid');
        lastName.classList.add('is-valid');
    }
    
    if (!email.value.trim() || !isValidEmail(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }
    
    if (!subject.value) {
        subject.classList.add('is-invalid');
        isValid = false;
    } else {
        subject.classList.remove('is-invalid');
        subject.classList.add('is-valid');
    }
    
    if (!message.value.trim()) {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
    }
    
    form.classList.add('was-validated');
    return isValid;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit contact form
function submitContactForm() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        // Show success message
        showContactSuccessModal();
        
        // Reset form
        document.getElementById('contactForm').reset();
        document.getElementById('contactForm').classList.remove('was-validated');
        
        // Remove validation classes
        const inputs = document.querySelectorAll('#contactForm .form-control, #contactForm .form-select');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
    }, 2000);
}

// Show contact success modal
function showContactSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center py-5">
                    <div class="mb-4">
                        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                    </div>
                    <h4 class="mb-3">Message Sent Successfully!</h4>
                    <p class="text-muted mb-4">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Great!</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Clean up modal after hiding
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading states to buttons
function addLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${loadingText}`;
    button.disabled = true;
    button.classList.add('loading');
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    };
}

// Initialize tooltips (if Bootstrap tooltips are needed)
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize popovers (if Bootstrap popovers are needed)
function initializePopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Call initialization functions if needed
// initializeTooltips();
// initializePopovers();