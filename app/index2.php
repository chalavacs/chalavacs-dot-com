<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>directory</title>

    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <!-- Place favicon.ico in the root directory -->

    <!-- build:css styles/vendor.css -->
    <link rel="stylesheet" href="styles/vendors/animate.css" type="text/css" media="all" />
    <link rel="stylesheet" href="styles/vendors/chalavacs-icons.css" type="text/css" media="all" />
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->

    <!-- build:css styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->

    <!-- build:js scripts/vendor/modernizr.js -->
    <script src="/bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->
</head>
<body id="home">
    
    <!-- INCLUDE: Navigation - Transparent -->
    <?php include 'partials/nav_transparent.php'; ?>

    <header class="home bg-dark">

        <div class="home__innerBorder">
            <span class="home__innerBorder1 invisible"></span>
            <span class="home__innerBorder2 invisible"></span>
            <span class="home__innerBorder3 invisible"></span>
            <span class="home__innerBorder4 invisible"></span>

            <div class="container va">
                <div class="col-md-5">
                    <div class="hero__inner">
                        <h1 class="hero__heading animate__fadeUp invisible text-italic mb6">Chris<br />Halavacs</h1>
                        <h6 class="subheading hero__subheading animate__fadeUp invisible uppercase mb36">Creative director / technical marketer</h6>
                    </div>
                </div>
            </div>

        </div>

        <!-- BEGIN: Scroll Button -->
        <a href="#contact" class="scrollLink invisible">
            <div class="scrollLink__border"></div>
            <div class="scrollLink__arrow">
                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="20" height="64" viewBox="0 0 20 64">
                    <path d="M.79 56.905l9.24 6.972 9.24-6.972M10 0v63" fill="none" stroke="#ffffff"/>
                </svg>
            </div>
            <div class="scrollLink__label">Contact</div>
        </a>
        <!-- END: Scroll Button -->
        
        <div class="home__headshot invisible"></div>

    </header>

    <!-- INCLUDE: Module - Contact -->
    <?php include('partials/module_contact.php') ?>

    <!-- INCLUDE: Module - Footer -->
    <?php include('partials/module_footer.php') ?>

    <!-- INCLUDE: Scripts -->
    <?php include 'partials/footer_scripts.php'; ?>

</body>
</html>
