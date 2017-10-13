(function ($) {
	"use strict";

  var viewportWidth;
  var scrollBarWidth;

	Drupal.behaviors.sparkle_motion = {
		attach: function(context, settings) {
			//this.functionName(context, settings);
      this.initializeSparkleMotion(context);
		},


		initializeSparkleMotion: function(context) {
      // use debounce to prevent this to firing in
      // a non-performant way.
      $(window).bind( 'resize', $.debounce( 100, false, setViewportWidth) );



      // Set Scrollbar Width class on body. This is used
      // by breakout() mixin, for example.
      // This is because the people who decided how vw
      // should be implemented decided that it 100vw should
      // not exclude the scrollbar... because reasons.

      // Create a temporary scrollbar measurement node
      var scrollDiv = document.createElement("div");
      scrollDiv.className = "temporary-scrollbarMeasure";
      document.body.appendChild(scrollDiv);

      // Get the scrollbar width
      scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      var scrollBarWidthClass = "scrollbar-zero";

      if (scrollBarWidth == 5) {
        // Firefox style
        scrollBarWidthClass = "scrollbar-5"
      }
      else if (scrollBarWidth == 12) {
        // Edge style
        scrollBarWidthClass = "scrollbar-12"
      }
      else if (scrollBarWidth == 15) {
        // Chrome style
        scrollBarWidthClass = "scrollbar-15"
      }
      else if (scrollBarWidth == 17) {
        // IE11 style
        scrollBarWidthClass = "scrollbar-17"
      }

      // Delete the temporary node.
      document.body.removeChild(scrollDiv);

      $('body', context).addClass(scrollBarWidthClass);
		}

	} // Drupal.behaviors.sparkle_motion



  function setViewportWidth() {
    viewportWidth = $(window).innerWidth();
  }


})(jQuery);
