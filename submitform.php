<?php
// Load Composer's autoloader
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$message = "";
$messageClass = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS);
    $messageContent = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
    

    // Check if the email is valid
    if ($email === false) {
        $message = "Invalid email address.";
        $messageClass = "error";
    } else {
        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; //SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'infotrafiri@gmail.com'; // Gmail address
            $mail->Password = 'vlgv ewup vkgs lqlk'; // Gmail password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom($email,$name); // Set the sender's email address and name
            $mail->addAddress('infotrafiri@gmail.com'); // Adding a recipient

            // Content
            $mail->isHTML(false); // Set email format to plain text
            $mail->Subject = $subject;
            $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$messageContent";

            // Send the email
            $mail->send();
            // Send thank you email to the user
            $thankYouMail = new PHPMailer(true);
            $thankYouMail->isSMTP();
            $thankYouMail->Host = 'smtp.gmail.com';
            $thankYouMail->SMTPAuth = true;
            $thankYouMail->Username = 'infotrafiri@gmail.com';
            $thankYouMail->Password = 'vlgv ewup vkgs lqlk';
            $thankYouMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $thankYouMail->Port = 587;

            $thankYouMail->setFrom('infotrafiri@gmail.com', 'Trafiri');
            $thankYouMail->addAddress($email);

            $thankYouMail->isHTML(false);
            $thankYouMail->Subject = "Thank you for contacting us!";
            $thankYouMail->Body    = 
            "Dear $name,\nThank you for reaching out to us. We have received your message:\n$subject\n$message\nWe will get back to you shortly.\nBest regards,\n\nTrafiri Support Team\nEmail: infotrafiri@gmail.com\nWebsite: www.trafiri.com";

            $thankYouMail->send();

            $message = "Message sent successfully!";
            $messageClass = "success";
        } catch (Exception $e) {
            $message = "Failed to send message. Mailer Error: {$mail->ErrorInfo}";
            $messageClass = "error";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us</title>
    <link rel="stylesheet" href="submitform.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="placesToGo.html">Places</a></li>
                <li><a href="activities.html">Activities</a></li>
                <li><a href="Registration website/login.html">Login</a></li>
                <li><a href="Review website/review.html">Reviews</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <div class="contact">
        <h1>Contact Us</h1>
        <?php if (!empty($message)): ?>
            <div class="message <?php echo $messageClass; ?>">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>
        <form action="submitform.php" method="post">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send</button>
        </form>
    </div>
    <footer>
        <p>Contact us at: <a href="mailto:infotrafiri@gmail.com">info@trafiri.com</a></p>
        <p>&copy; 2024 Trafiri. All rights reserved.</p>
    </footer>
</body>
</html>