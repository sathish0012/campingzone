document.addEventListener('DOMContentLoaded', function() {
    console.log("Payment page loaded successfully!");

    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const packages = {
        'basic': { name: 'Basic Camping', price: 8000 },
        'adventure': { name: 'Adventure Package', price: 15000 },
        'relax': { name: 'Relax & Reconnect Package', price: 22000 }
    };
    
    // Get all booking details from URL parameters
    const customerName = getQueryParam('name');
    const mobileNumber = getQueryParam('phone');
    const selectedPackage = getQueryParam('package');
    const checkInDate = getQueryParam('check-in');
    const checkOutDate = getQueryParam('check-out');
    const numGuests = getQueryParam('guests');
    
    let totalPrice = 0;
    
    if (selectedPackage && packages[selectedPackage]) {
        const packageInfo = packages[selectedPackage];
        totalPrice = packageInfo.price;

        // Display customer details
        document.getElementById('summary-name').textContent = customerName;
        document.getElementById('summary-mobile').textContent = mobileNumber;
        document.getElementById('summary-package').textContent = packageInfo.name;
        document.getElementById('summary-checkin').textContent = checkInDate;
        document.getElementById('summary-checkout').textContent = checkOutDate;
        document.getElementById('summary-guests').textContent = numGuests;
        document.getElementById('summary-total').textContent = `₹${totalPrice.toLocaleString()}`;
    } else {
        // Fallback for when no package is selected
        document.getElementById('summary-name').textContent = customerName;
        document.getElementById('summary-mobile').textContent = mobileNumber;
        document.getElementById('summary-package').textContent = 'Package not selected.';
        document.getElementById('summary-total').textContent = '₹0';
    }

    const payNowBtn = document.getElementById('pay-now-btn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function() {
            if (totalPrice > 0) {
                const customerName = document.getElementById('summary-name').textContent;
                const mobileNumber =  document.getElementById('summary-mobile').textContent;
                const packageDetails = document.getElementById('summary-package').textContent;
                const checkinDetails = document.getElementById('summary-checkin').textContent;
                const checkoutDetails = document.getElementById('summary-checkout').textContent;
                const guestsDetails = document.getElementById('summary-guests').textContent;
                const totalDetails = document.getElementById('summary-total').textContent;

                // Create a mailto link with all booking details
                const recipient = 'sathish19ucs3121@gmail.com';
                const subject = encodeURIComponent('Booking Confirmation - Natural Camping');
                const body = encodeURIComponent(
                    `Hello,\n\nHere is your booking summary:\n\n` +
                    `Customer Name: ${customerName}\n` +
                    `Mobile Number: ${mobileNumber}\n` +
                    `Package: ${packageDetails}\n` +
                    `Check-in Date: ${checkinDetails}\n` +
                    `Check-out Date: ${checkoutDetails}\n` +
                    `Number of Guests: ${guestsDetails}\n\n` +
                    `Total Amount: ${totalDetails}\n\n` +
                    `Thank you for booking with us!`
                );
                
                const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;

            } else {
                alert('An error occurred. Please go back and select a package.');
            }
        });
    }

    const downloadBtn = document.getElementById('download-summary-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            if (totalPrice === 0) {
                alert('No booking summary to download. Please select a package first.');
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Include customer details in the PDF table
            const tableData = [
                ["Customer Name", document.getElementById('summary-name').textContent],
                ["Mobile Number", document.getElementById('summary-mobile').textContent],
                ["Package", document.getElementById('summary-package').textContent],
                ["Check-in Date", document.getElementById('summary-checkin').textContent],
                ["Check-out Date", document.getElementById('summary-checkout').textContent],
                ["Number of Guests", document.getElementById('summary-guests').textContent],
                ["Total Amount", document.getElementById('summary-total').textContent]
            ];
            
            doc.setFontSize(20);
            doc.text("Natural Camping Booking Summary", 14, 20);
            doc.setFontSize(12);
            doc.text(`Booking ID: ${Date.now()}`, 14, 30);
            
            doc.autoTable({
                startY: 40,
                head: [['Details', 'Information']],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: [52, 58, 64] },
                styles: { fontSize: 11, cellPadding: 3 },
                columnStyles: {
                    0: { fontStyle: 'bold', minCellWidth: 50 },
                    1: { minCellWidth: 100 }
                }
            });

            doc.save("Natural_Camping_Booking_Details.pdf");
        });
    }
});