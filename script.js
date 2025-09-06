document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the values from the input fields
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple hardcoded validation (for demonstration purposes)
        if (username === 'admin' && password === 'password123') {
            messageDiv.textContent = 'Login successful! Redirecting...';
            messageDiv.className = 'mt-3 text-center text-success';
            
            // Redirect the user to the homepage after a short delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500); // 1.5-second delay to show the success message
        } else {
            messageDiv.textContent = 'Invalid username or password.';
            messageDiv.className = 'mt-3 text-center text-danger';
        }
    });
});

//------------home page------------------------------//

document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to Natural Camping!");

    // Example of smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


//-------------------------------about page------------------------//


document.addEventListener('DOMContentLoaded', function() {
    console.log("About page loaded successfully!");
});


//*===========================book now=================================//document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const customerName = document.getElementById('customer-name').value;
    const mobileNumber = document.getElementById('mobile-number').value;
    const selectedPackage = document.getElementById('package-select').value;
    const checkInDate = document.getElementById('check-in-date').value;
    const checkOutDate = document.getElementById('check-out-date').value;
    const numGuests = document.getElementById('guests-input').value;

    const queryParams = new URLSearchParams({
        'customer-name': customerName,
        'mobile-number': mobileNumber,
        'package': selectedPackage,
        'check-in': checkInDate,
        'check-out': checkOutDate,
        'guests': numGuests
    });

    // Redirect to the payment page with all details in the URL
    window.location.href = `payment.html?${queryParams.toString()}`;
});