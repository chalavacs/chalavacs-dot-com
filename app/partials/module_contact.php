    <!--  BEGIN: Contact Form -->
    <section id="contact" class="page-block pb120 pt96">
        <div class="container">
            <div class="contactForm">
                <div class="col-xs-12 col-sm-8 col-md-6 col-md-offset-3 mb24">
                    <div class="subheading subheading__bar">Keep In Touch</div>
                    <h2 class="contactForm__title mb18">Let’s work together</h2>
                    <div class="col-md-9 col-md-offset-1">
                        <p>My online portfolio is currently under construction. However, a digital PDF version is available. To request a copy, simply fill out the form below.</p>
                    </div>
                </div>
                <form action="/process.php" method="POST" datatype="json">
                    <div class="col-xs-12 col-md-6 col-md-offset-3 form__shadow">
                        <div class="row mb30">
                            <div class="col-xs-12 col-md-6">
                                <input type="text" name="name" class="input__field" required>
                                <label class="input__label">
                                    <span class=input__label-content>Name</span>
                                </label>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <input type="email" name="email" class="input__field" required>
                                <label class="input__label">
                                    <span class=input__label-content >E-Mail</span>
                                </label>
                            </div>
                        </div>
                        <div class="row mb18">
                            <div class="col-md-12">
                                <textarea rows="1" name="message" class="input__field" required></textarea>
                                <label class="input__label">
                                    <span class=input__label-content>Leave a Message...</span>
                                </label>
                            </div>
                        </div>
                        <button name="submit" type="submit" class="btn btn-primary center-block">Push it Real Good</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <!--  END: Contact Form -->