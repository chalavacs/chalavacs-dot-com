<?php


    $errors         = array();      // array to hold validation errors
    $data           = array();      // array to pass back data

    // validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if ($_POST['name'] != "") {
        $_POST['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        if ($_POST['name'] == "") {
            $errors .= 'Please enter a valid name.<br/><br/>';
        }
    } else {
        $errors .= 'Please enter your name.<br/>';
    }
    
    if ($_POST['email'] != "") {
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors .= "$email is <strong>NOT</strong> a valid email address.<br/><br/>";
        }
    } else {
        $errors .= 'Please enter your email address.<br/>';
    }

    if ($_POST['message'] != "") {
        $_POST['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        if ($_POST['message'] == "") {
            $errors .= 'Please enter a message to send.<br/>';
        }
    } else {
        $errors .= 'Please enter a message to send.<br/>';
    }

    // return a response ===========================================================

    if (!$errors) {
        $emailTo = 'christopherhalavacs@gmail.com';
        $subject = 'New Mail from Form Submission';
        $message  = 'From: ' . $_POST['name'] . "\n";
        $message .= 'Email: ' . $_POST['email'] . "\n";
        $message .= 'Homepage: ' . $_POST['homepage'] . "\n";
        $message .= "Message:\n" . $_POST['message'] . "\n\n";
        mail($emailTo, $subject, $message);

        // show a message of success and provide a true success variable
        $data['success'] = true;
        $data['message'] = 'Success!';

    } else {
        echo '<div style="color: red">' . $errors . '<br/></div>';
    }

    // return all our data to an AJAX call
    echo json_encode($data);

     
?>