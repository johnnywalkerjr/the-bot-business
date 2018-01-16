//Navbar Scroll Event
var lastScrollTop = 0;
var navbar        = $('.navbar');
var $document = $(document);
var $window = $(window);

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
//$document.on('mouseenter', '[data-toggle="tab"]', function () {
//  $(this).tab('show');
//});

$document.ready();
$document.ready(setupVideo);

function setupVideo() {
  var $allVideos = $('video');
  $document.on('click', 'video', togglePlayPause);
  $document.on('click', '[data-video-tabs-controls] [data-toggle]', togglePlayPauseOnTabChange);
  autoplayVideosOnScroll();

  function togglePlayPauseOnTabChange() {
    var $link = $(this);
    var video = $('video', $link.attr('href')).get(0);
    var videoGroup = $link.closest('[data-video-tabs-controls]').data('video-tabs-controls');
    var $videos = $('[data-video-tabs-content=' + videoGroup + '] video');
    $videos.each(function(index, el) {
      el.pause();
    });

    video.play();
  }

  function togglePlayPause() {
    if(this.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  function autoplayVideosOnScroll() {
    var $autoplayMedia = $('[data-scroll-autoplay="true"]');
    var tolerancePixel = 40;

    function checkMedia(){
      var windowScrollTop = $window.scrollTop();
      var scrollTop = windowScrollTop + tolerancePixel;
      var scrollBottom = windowScrollTop + $window.height() - tolerancePixel;

      $autoplayMedia.each(function(index, el) {
        var $medium = $(this);
        var yTopMedia = $medium.offset().top;
        var yBottomMedia = $medium.height() + yTopMedia;

        if(!$medium.is(':visible')) {
          return;
        }

        if(scrollTop < yBottomMedia && scrollBottom > yTopMedia){
          if(!$medium.get(0).alreadyPlayed) {
            $medium.get(0).play();
          }
          $medium.get(0).alreadyPlayed = true;
        } else {
          $medium.get(0).pause();
          $medium.get(0).alreadyPlayed = false;
        }
      });
    }

    $document.on('scroll', throttle(checkMedia, 150));
  }
}

function throttle(func, wait) {
  var timeout, context, args, result;

  function later() {
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  }

  function throttled() {
    var now = Date.now();
    var remaining = wait - now;
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      result = func.apply(context, args);

      if (!timeout) {
        context = args = null;
      }
    } else if(!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  }

  throttled.cancel = function() {
    clearTimeout(timeout);
    timeout = context = args = null;
  };

  return throttled;
}