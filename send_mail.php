<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "sathish19ucs3121@gmail.com";  // ✅ your email
    $subject = "Test Mail from PHP";
    
    // Collect form data (if any)
    $name = isset($_POST['name']) ? $_POST['name'] : "Anonymous";
    $email = isset($_POST['email']) ? $_POST['email'] : "No email";
    $message = isset($_POST['message']) ? $_POST['message'] : "No message";

    // Email body
    $body = "You have received a new message:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message: \n$message\n";

    // Headers
    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send mail
    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Mail sent successfully to $to";
    } else {
        echo "❌ Failed to send mail.";
    }
}
?>
