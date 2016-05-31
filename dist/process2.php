<?php
     
function sendMail($name, $email, $message)
{
    // Whitespace pattern, icluding different masking methods
    $whitespace = '~(<CR>|<LF>|0x0A|%0A|0x0D|%0D|\\n|\\r|\s)+~i';

    $name = trim(preg_replace($whitespace, '', $name));
    if (empty($name)) {
        return false;
    }

    $email = trim(preg_replace($whitespace, ' ', $email));
    if (empty($email)) {
        return false;
    }

    $mail_to = 'christopherhalavacs@gmail.com';
    $subject = 'New Contact for My Website from ' . $name;

    $body =  "From: $name\n";
    $body .= "E-mail: $email\n";
    $body .= "Message: $message";

    $headers =  "From: $email\r\n";
    $headers .= "Reply-To: '$email\r\n";

    return mail($mail_to, $subject, $body, $headers);

} 


$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data

    // validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if (empty($_POST['name']))
        $errors['name'] = 'Name is required.';

    if (empty($_POST['email']))
        $errors['email'] = 'Email is required.';

    if (empty($_POST['message']))
        $errors['message'] = 'Superhero alias is required.';


    // return a response ===========================================================

    // if there are any errors in our errors array, return a success boolean of false
    if ( ! empty($errors)) {

        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;

    } else {

        $name    = isset($_POST['name']) ? $_POST['name'] : '';
        $email   = isset($_POST['email']) ? $_POST['email'] : '';
        $message = isset($_POST['message']) ? $_POST['message'] : '';

        // show a message of success and provide a true success variable
        $data['success'] = true;
        $data['message'] = 'Success!';

    }

    // return all our data to an AJAX call
    echo json_encode($data);
     
?>