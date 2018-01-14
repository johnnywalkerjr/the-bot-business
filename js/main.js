//Navbar Scroll Event
var lastScrollTop = 0;
var navbar        = $('.navbar');
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       navbar.addClass('navbar-scroll-custom');
   } else {
      navbar.removeClass('navbar-scroll-custom');
   }
   lastScrollTop = st;
});

//Open On Hover Tabs
$(document).on('mouseenter', '[data-toggle="tab"]', function () {
	$(this).tab('show');
});