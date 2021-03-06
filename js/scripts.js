// Contains various scripts for the working of the portfolio website code. 
// Executes on document load
$(document).ready(function() {
    // Remove no-js class
    $('html').removeClass('no-js');

    // Initialize all elements
    MainScripts.initScrollingElements();
    MainScripts.initHeader();
    MainScripts.initExperienceTimeline();
    MainScripts.initProjects();

});

// Scope for main site page
var MainScripts = {};

MainScripts.initScrollingElements = function _initScrollingElements() {
    // Scroll to top
    $('.scroll-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('.scroll-down').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Scroll callback method to hide/show various elements based on scroll height
    $(document).scroll(function() {
        var y = $(this).scrollTop();

        // Show the scroll up span if we are below the lead div but not at the footer
        var leadBottom = $('#lead').height() + $('#lead').offset().top;
        var footerTop = $('footer').offset().top - $(window).height();
        if (y >= leadBottom && y < footerTop) {
          $('#to-top-rightpage').fadeIn(500);
        } else {
          $('#to-top-rightpage').fadeOut(500);
        }

      });
}

MainScripts.initHeader = function _initHeader() {
    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });
}

MainScripts.initExperienceTimeline = function _initExperienceTimeline() {
    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap(
                '<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) {
                // If multiple dates, split
                date = date.split('\\n');

                let dateHtml = '';
                for (let index in date) {
                    dateHtml += '<p>'+date[index]+'</p>';
                }
                $(this).parent().prepend('<div class="vtimeline-date">' + dateHtml + '</div>');
               
            }
        });

    });
}

MainScripts.initProjects = function _initProjects() {
    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    // On each project, add click event handler for the three buttons (more) div
    // to show the full view of the project
    $('.project-info .three-button-info').click(function(e){
        let $projectInfo = $(e.currentTarget).parents('.project-info');
        if ($projectInfo.hasClass('project-fullview')) {
            $projectInfo.removeClass('project-fullview');
            $projectInfo.children('.project-details').css('opacity', 0);
        } else {
            $projectInfo.addClass('project-fullview');
            $projectInfo.children('.project-details').css('opacity', 1);
        }
    });

    // On tooltip hover, need to remove overflow on parent element
    $('a[data-tooltip]').hover(function(e) {
        // on hover enter callback. 
        // Remove the overflow: hidden style from .project parent class
        $(e.currentTarget).parents('.project').css('overflow', 'visible');
    }, function(e) {
        // on hover exit callback
        // Add back the overflow: hidden style from .project parent class
        $(e.currentTarget).parents('.project').css('overflow', 'hidden');
    })

}
