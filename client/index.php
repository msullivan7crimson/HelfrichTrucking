<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Application</title>

    <!-- CSS Files -->
    <link rel="stylesheet" href="client/assets/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="client/assets/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="client/styles/contact.css">
    <link rel="stylesheet" href="client/styles/LandingPage.css">

    <!-- Fonts -->
    <style>
        @font-face {
            font-family: 'Consolas';
            src: url('Consolas.ttf') format('truetype');
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <?php include_once("fixedNavbar.html"); ?>

    <!-- Landing Page -->
    <?php include_once("landingPage.html"); ?>

    <!-- About Us -->
    <?php include_once("aboutUs.html"); ?>

    <!-- Contact -->
    <?php include_once("contact.html"); ?>

    <!-- Images -->
    <img src="client/assets/brand/bootstrap-logo-white.svg" alt="Bootstrap Logo White">
    <img src="client/assets/brand/bootstrap-logo.svg" alt="Bootstrap Logo">

    <!-- JavaScript Files -->
    <script src="client/assets/dist/js/bootstrap.bundle.min.js"></script>
    <script src="client/js/color-modes.js"></script>
    <script src="client/scripts/contact.js"></script>
    <script src="client/scripts/landingpage.js"></script>
</body>
</html>