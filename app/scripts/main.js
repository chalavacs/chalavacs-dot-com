//
// GreenSock Animations
//

// Preload JS
var queue = new createjs.LoadQueue(),
    $preloader = $('.preloader'),
    $progress = $('.preloader__progress'),
    $progressbar = $('.preloader__progressbar');

queue.on('complete',     onComplete);
queue.on('error',        onError);
queue.on('fileload',     onFileLoad);
queue.on('fileprogress', onFileProgress);
queue.on('progress',     onProgress);

queue.loadManifest([
  {
    id:   '1',
    src:  'http://upload.wikimedia.org/wikipedia/commons/a/a2/Polycyclic_Aromatic_Hydrocarbons_In_Space.jpg'
  },
  {
    id: '2',
    src: 'http://static3.businessinsider.com/image/522746c56bb3f72e2a316155/photo-airbus-proves-its-huge-new-warplane-doesnt-need-a-paved-runway.jpg'
  },
  {
    id:   '3',
    src:  'http://www.chem.gla.ac.uk/staff/wynne/i/2005/TRVS/TRVS-group-photo-huge.jpg'
  }
]);

function onError(event) {}

function onFileLoad(event) {}

function onFileProgress(event) {}

function onProgress(event) {
    console.log("loading...");
    var progress = Math.round(event.loaded * 100);
    $progress.text(progress + '%');
    $progressbar.css({
        'width': progress + '%'
    });
}

function onComplete(event) {
    dataActiveOff($preloader);
    tl.play();
}

//
// Preloader Animation


var preloaderTimeline = new TimelineMax({repeat: false});

// Begin: 'prepareLoader' timeline
preloaderTimeline.add("prepareLoader")

.staggerFromTo('.svg__preloader circle', 1.5, {
    scale: 3,
    opacity: 0, 
    visibility: 'hidden'
}, {
    scale: 1,
    opacity: 1, 
    visibility: 'visible', 
    ease: Back.easeOut
}, 0.25)

// Begin: 'l12' timeline
.add("l12_1", "+=0.4")
.to('.loader__path-top', 0.75, {
    repeat: 3,
    attr: {
        cx: 50, 
        cy: 50
    },
    ease: Power4.easeOut
}, "l12_1")

.to('.loader__path-left', 0.75, {
    repeat: 3,
    attr: {
        cx: 27, 
        cy: 5
    },
    ease: Power4.easeOut
}, "l12_1")

.to('.loader__path-right', 0.75, {
    repeat: 3,
    attr: {
        cx: 5, 
        cy: 50
    },
    ease: Power4.easeOut
}, "l12_1");
                        
//
//  Waypoints Config
//

var $pageBlock = $('.page-block');
                                            
var waypoints = $pageBlock.waypoint(function(direction) {
    $(this.element).addClass("in-view");
}, {
  offset: '75%'
})


//
// Homepage
//

// NAVIGATION
var navModule = $('.nav__module--animate'),
    animateFadeUp = $('.animate__fadeUp');

// INNER BORDER
var innerBorder1 = $('.home__innerBorder1'),
    innerBorder2 = $('.home__innerBorder2'),
    innerBorder3 = $('.home__innerBorder3'),
    innerBorder4 = $('.home__innerBorder4');

// HERO TEXT
var heroInner = $('.hero__inner'),
    heroHeading = $('.hero__heading'),
    heroSubheading = $('.hero__subheading'),
    heroSubtext = $('.hero__subtext');

var tl = new TimelineLite({ 
    repeat:0, 
    yoyo:false,
    paused:true,
    delay: 1
});

tl.fromTo(innerBorder1, 0.25, {height:0}, {height:'100%', autoAlpha:1})
.fromTo(innerBorder2, 0.25, {width:0},  {width:'100%', autoAlpha:1})
.fromTo(innerBorder3, 0.25, {height:0}, {height:'100%', autoAlpha:1})
.fromTo(innerBorder4, 0.25, {width:0},  {width:'100%', autoAlpha:1})

.add("homeAll")

.to(".home__headshot", 0.3, {
    x:"-30",
    autoAlpha:1,
    ease: Power1.easeOut
}, "homeAll")


.staggerFromTo(navModule, 0.3, {
    y:"-48",
}, { 
    y: "0",
    autoAlpha:1,
    ease: Power1.easeOut
}, .1)

.staggerFromTo(animateFadeUp, .4, {
    y: "48",
}, {
    y: "0",
    autoAlpha:1,
    ease: Power1.easeOut
}, .1)

tl.to('.scrollLink', 0.6, {
    y: -100, 
    autoAlpha:1,
    ease: Power1.easeOut
},"homeAll")

//
// On DOM Ready
//
$(function() {

    dataActiveOn($preloader);

    if(isMobile()){
    }

    // Performs a smooth page scroll to an anchor on the same page.
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // jQuery & AJAX Form
    $('form').unbind('submit').bind('submit',function() {

        var $form = $(this);

        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            dataType: $form.attr('datatype'),
            data: $form.serialize()
        })

        // using the done promise callback
        .done(function(data) {

            // error handling
            if ( ! data.success) {

            // success handing
            } else {
                $form[0].reset();
                $form.find('button[type=submit]').prop('disabled', true).html('Message Sent');
            }

        })

        // using the fail promise callback
        .fail(function(data) {
        });

        // stop the form from submitting and refreshing
        event.preventDefault();

    });

});

// On Mouse Move
$(document).mousemove(function(e) {

    if(!isMobile()){

        // Parallax Configs
        // Parallax - Inner Border
        $([innerBorder1,innerBorder2,innerBorder3,innerBorder4]).each(function() {
            $(this).parallax( -30, e );
        });

        // Parallax - Hero Text
        $(heroInner).parallax( 90, e );
    }

});

//
// Custom Functions
//

function dataActiveOff(e) {
    e.attr("data-active", "off")
}

function dataActiveOn(e) {
    e.attr("data-active", "on")
}

function animation(e) {
    e.attr("data-active", "on")
}

// isMobile
function isMobile() {
    var isMobile = window.matchMedia("only screen and (max-width: 48em)");

    if (isMobile.matches) {
        return true;
    }
}

// GSAP Parallax
$.fn.parallax = function(resistance, mouse) {
    $el = $(this);
    TweenLite.to($el, 0.2, {
        x: -((mouse.clientX - (window.innerWidth / 2)) / resistance),
        y: -((mouse.clientY - (window.innerHeight / 2)) / resistance)
    });
};
