/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function ($) {
  $('a[data-reveal-id]').live('click', function (event) {
    event.preventDefault();
    var modalLocation = $(this).attr('data-reveal-id');
    $('#' + modalLocation).reveal($(this).data());
  });

  $.fn.reveal = function (options) {
    var defaults = {
      animation: 'fadeAndPop',                // fade, fadeAndPop, none
      animationSpeed: 300,                    // how fast animtions are
      closeOnBackgroundClick: true,           // if you click background will modal close?
      dismissModalClass: 'close-reveal-modal' // the class of a button or element that will close an open modal
    };
    var options = $.extend({}, defaults, options);

    return this.each(function () {
      var modal    = $(this),
        topMeasure = parseInt(modal.css('top')),
        topOffset  = modal.height() + topMeasure,
        locked     = false,
        modalBg    = $('.reveal-modal-bg');

      if (modalBg.length == 0) {
        modalBg = $('<div class="reveal-modal-bg" />').insertAfter(modal);
        modalBg.fadeTo('fast', 0.8);
      }

      function openAnimation() {
        modalBg.unbind('click.modalEvent');
        $('.' + options.dismissModalClass).unbind('click.modalEvent');
        if (!locked) {
          lockModal();
          if (options.animation == "fadeAndPop") {
            modal.css({'top': $(document).scrollTop() - topOffset, 'opacity': 0, 'visibility': 'visible'});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "top": $(document).scrollTop() + topMeasure + 'px',
              "opacity": 1
            }, options.animationSpeed, unlockModal);
          }
          if (options.animation == "fade") {
            modal.css({'opacity': 0, 'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "opacity": 1
            }, options.animationSpeed, unlockModal);
          }
          if (options.animation == "none") {
            modal.css({'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.css({"display": "block"});
            unlockModal();
          }
        }
        modal.unbind('reveal:open', openAnimation);
      }
      modal.bind('reveal:open', openAnimation);

      function closeAnimation() {
        if (!locked) {
          lockModal();
          if (options.animation == "fadeAndPop") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "top":  $(document).scrollTop() - topOffset + 'px',
              "opacity": 0
            }, options.animationSpeed / 2, function () {
              modal.css({'top': topMeasure, 'opacity': 1, 'visibility': 'hidden'});
              unlockModal();
            });
          }
          if (options.animation == "fade") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "opacity" : 0
            }, options.animationSpeed, function () {
              modal.css({'opacity': 1, 'visibility': 'hidden', 'top': topMeasure});
              unlockModal();
            });
          }
          if (options.animation == "none") {
            modal.css({'visibility': 'hidden', 'top': topMeasure});
            modalBg.css({'display': 'none'});
          }
        }
        modal.unbind('reveal:close', closeAnimation);
      }
      modal.bind('reveal:close', closeAnimation);
      modal.trigger('reveal:open');

      var closeButton = $('.' + options.dismissModalClass).bind('click.modalEvent', function () {
        modal.trigger('reveal:close');
      });

      if (options.closeOnBackgroundClick) {
        modalBg.css({"cursor": "pointer"});
        modalBg.bind('click.modalEvent', function () {
          modal.trigger('reveal:close');
        });
      }

      $('body').keyup(function (event) {
        if (event.which === 27) { // 27 is the keycode for the Escape key
          modal.trigger('reveal:close');
        }
      });

      function unlockModal() {
        locked = false;
      }

      function lockModal() {
        locked = true;
      }
    });
  };
})(jQuery);

/*
 * jQuery Orbit Plugin 1.3.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {
  
  var ORBIT = {
    
    defaults: {  
      animation: 'horizontal-push', 		// fade, horizontal-slide, vertical-slide, horizontal-push, vertical-push
      animationSpeed: 600, 				// how fast animtions are
      timer: true, 						// true or false to have the timer
      advanceSpeed: 4000, 				// if timer is enabled, time between transitions 
      pauseOnHover: false, 				// if you hover pauses the slider
      startClockOnMouseOut: false, 		// if clock should start on MouseOut
      startClockOnMouseOutAfter: 1000, 	// how long after MouseOut should the timer start again
      directionalNav: true, 				// manual advancing directional navs
      captions: true, 					// do you want captions?
      captionAnimation: 'fade', 			// fade, slideOpen, none
      captionAnimationSpeed: 600, 		// if so how quickly should they animate in
      bullets: false,						// true or false to activate the bullet navigation
      bulletThumbs: false,				// thumbnails for the bullets
      bulletThumbLocation: '',			// location from this file where thumbs will be
      afterSlideChange: $.noop,		// empty function 
      fluid: true,
      centerBullets: true    // center bullet nav with js, turn this off if you want to position the bullet nav manually
 	  },
 	  
 	  activeSlide: 0,
    numberSlides: 0,
    orbitWidth: null,
    orbitHeight: null,
    locked: null,
    timerRunning: null,
    degrees: 0,
    wrapperHTML: '<div class="orbit-wrapper" />',
    timerHTML: '<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>',
    captionHTML: '<div class="orbit-caption"></div>',
    directionalNavHTML: '<div class="slider-nav"><span class="right">Right</span><span class="left">Left</span></div>',
    bulletHTML: '<ul class="orbit-bullets"></ul>',
    
    init: function (element, options) {
      var $imageSlides,
          imagesLoadedCount = 0,
          self = this;
      
      // Bind functions to correct context
      this.clickTimer = $.proxy(this.clickTimer, this);
      this.addBullet = $.proxy(this.addBullet, this);
      this.resetAndUnlock = $.proxy(this.resetAndUnlock, this);
      this.stopClock = $.proxy(this.stopClock, this);
      this.startTimerAfterMouseLeave = $.proxy(this.startTimerAfterMouseLeave, this);
      this.clearClockMouseLeaveTimer = $.proxy(this.clearClockMouseLeaveTimer, this);
      this.rotateTimer = $.proxy(this.rotateTimer, this);
      
      this.options = $.extend({}, this.defaults, options);
      if (this.options.timer === 'false') this.options.timer = false;
      if (this.options.captions === 'false') this.options.captions = false;
      if (this.options.directionalNav === 'false') this.options.directionalNav = false;
      
      this.$element = $(element);
      this.$wrapper = this.$element.wrap(this.wrapperHTML).parent();
      this.$slides = this.$element.children('img, a, div');
      
      this.$element.bind('orbit.next', function () {
        self.shift('next');
      });
      
      this.$element.bind('orbit.prev', function () {
        self.shift('prev');
      });
      
      this.$element.bind('orbit.goto', function (event, index) {
        self.shift(index);
      });
      
      this.$element.bind('orbit.start', function (event, index) {
        self.startClock();
      });
      
      this.$element.bind('orbit.stop', function (event, index) {
        self.stopClock();
      });
      
      $imageSlides = this.$slides.filter('img');
      
      if ($imageSlides.length === 0) {
        this.loaded();
      } else {
        $imageSlides.bind('imageready', function () {
          imagesLoadedCount += 1;
          if (imagesLoadedCount === $imageSlides.length) {
            self.loaded();
          }
        });
      }
    },
    
    loaded: function () {
      this.$element
        .addClass('orbit')
        .css({width: '1px', height: '1px'});
        
      this.setDimentionsFromLargestSlide();
      this.updateOptionsIfOnlyOneSlide();
      this.setupFirstSlide();
      
      if (this.options.timer) {
        this.setupTimer();
        this.startClock();
      }
      
      if (this.options.captions) {
        this.setupCaptions();
      }
      
      if (this.options.directionalNav) {
        this.setupDirectionalNav();
      }
      
      if (this.options.bullets) {
        this.setupBulletNav();
        this.setActiveBullet();
      }
    },
    
    currentSlide: function () {
      return this.$slides.eq(this.activeSlide);
    },
    
    setDimentionsFromLargestSlide: function () {
      //Collect all slides and set slider size of largest image
      var self = this,
          $fluidPlaceholder;
          
      self.$element.add(self.$wrapper).width(this.$slides.first().width());
      self.$element.add(self.$wrapper).height(this.$slides.first().height());
      self.orbitWidth = this.$slides.first().width();
      self.orbitHeight = this.$slides.first().height();
      $fluidPlaceholder = this.$slides.first().clone();
      
      this.$slides.each(function () {
        var slide = $(this),
            slideWidth = slide.width(),
            slideHeight = slide.height();

        if (slideWidth > self.$element.width()) {
          self.$element.add(self.$wrapper).width(slideWidth);
          self.orbitWidth = self.$element.width();	       			
        }
        if (slideHeight > self.$element.height()) {
          self.$element.add(self.$wrapper).height(slideHeight);
          self.orbitHeight = self.$element.height();
          $fluidPlaceholder = $(this).clone();
	      }
        self.numberSlides += 1;
      });
      
      if (this.options.fluid) {
        if (typeof this.options.fluid === "string") {
          $fluidPlaceholder = $('<img src="http://placehold.it/' + this.options.fluid + '" />')
        }
        
        self.$element.prepend($fluidPlaceholder);
        $fluidPlaceholder.addClass('fluid-placeholder');
        self.$element.add(self.$wrapper).css({width: 'inherit'});
        self.$element.add(self.$wrapper).css({height: 'inherit'});
        
        $(window).bind('resize', function () {
          self.orbitWidth = self.$element.width();
          self.orbitHeight = self.$element.height();
        });
      }
    },
    
    //Animation locking functions
    lock: function () {
      this.locked = true;
    },
    
    unlock: function () { 
      this.locked = false;
    },
    
    updateOptionsIfOnlyOneSlide: function () {
      if(this.$slides.length === 1) {
      	this.options.directionalNav = false;
      	this.options.timer = false;
      	this.options.bullets = false;
      }
    },
    
    setupFirstSlide: function () {
      //Set initial front photo z-index and fades it in
      var self = this;
      this.$slides.first()
      	.css({"z-index" : 3})
      	.fadeIn(function() {
      		//brings in all other slides IF css declares a display: none
      		self.$slides.css({"display":"block"})
      });
    },
    
    startClock: function () {
      var self = this;
      
      if(!this.options.timer) { 
    		return false;
    	} 

    	if (this.$timer.is(':hidden')) {
        this.clock = setInterval(function () {
          this.$element.trigger('orbit.next');
        }, this.options.advanceSpeed);            		
    	} else {
        this.timerRunning = true;
        this.$pause.removeClass('active')
        this.clock = setInterval(this.rotateTimer, this.options.advanceSpeed / 180);
      }
    },
    
    rotateTimer: function () {
      var degreeCSS = "rotate(" + this.degrees + "deg)"
      this.degrees += 2;
      this.$rotator.css({ 
        "-webkit-transform": degreeCSS,
        "-moz-transform": degreeCSS,
        "-o-transform": degreeCSS
      });
      if(this.degrees > 180) {
        this.$rotator.addClass('move');
        this.$mask.addClass('move');
      }
      if(this.degrees > 360) {
        this.$rotator.removeClass('move');
        this.$mask.removeClass('move');
        this.degrees = 0;
        this.$element.trigger('orbit.next');
      }
    },
    
    stopClock: function () {
      if (!this.options.timer) { 
        return false; 
      } else {
        this.timerRunning = false;
        clearInterval(this.clock);
        this.$pause.addClass('active');
      }
    },
    
    setupTimer: function () {
      this.$timer = $(this.timerHTML);
      this.$wrapper.append(this.$timer);

      this.$rotator = this.$timer.find('.rotator');
      this.$mask = this.$timer.find('.mask');
      this.$pause = this.$timer.find('.pause');
      
      this.$timer.click(this.clickTimer);

      if (this.options.startClockOnMouseOut) {
        this.$wrapper.mouseleave(this.startTimerAfterMouseLeave);
        this.$wrapper.mouseenter(this.clearClockMouseLeaveTimer);
      }
      
      if (this.options.pauseOnHover) {
        this.$wrapper.mouseenter(this.stopClock);
      }
    },
    
    startTimerAfterMouseLeave: function () {
      var self = this;

      this.outTimer = setTimeout(function() {
        if(!self.timerRunning){
          self.startClock();
        }
      }, this.options.startClockOnMouseOutAfter)
    },
    
    clearClockMouseLeaveTimer: function () {
      clearTimeout(this.outTimer);
    },
    
    clickTimer: function () {
      if(!this.timerRunning) {
          this.startClock();
      } else { 
          this.stopClock();
      }
    },
    
    setupCaptions: function () {
      this.$caption = $(this.captionHTML);
      this.$wrapper.append(this.$caption);
  	  this.setCaption();
    },
    
    setCaption: function () {
      var captionLocation = this.currentSlide().attr('data-caption'),
          captionHTML;
    		
      if (!this.options.captions) {
    		return false; 
    	} 
    	        		
    	//Set HTML for the caption if it exists
    	if (captionLocation) {
    	  captionHTML = $(captionLocation).html(); //get HTML from the matching HTML entity
    		this.$caption
      		.attr('id', captionLocation) // Add ID caption TODO why is the id being set?
          .html(captionHTML); // Change HTML in Caption 
          //Animations for Caption entrances
        switch (this.options.captionAnimation) {
          case 'none':
            this.$caption.show();
            break;
          case 'fade':
            this.$caption.fadeIn(this.options.captionAnimationSpeed);
            break;
          case 'slideOpen':
            this.$caption.slideDown(this.options.captionAnimationSpeed);
            break;
        }
    	} else {
    		//Animations for Caption exits
    		switch (this.options.captionAnimation) {
          case 'none':
            this.$caption.hide();
            break;
          case 'fade':
            this.$caption.fadeOut(this.options.captionAnimationSpeed);
            break;
          case 'slideOpen':
            this.$caption.slideUp(this.options.captionAnimationSpeed);
            break;
        }
    	}
    },
    
    setupDirectionalNav: function () {
      var self = this;

      this.$wrapper.append(this.directionalNavHTML);
      
      this.$wrapper.find('.left').click(function () { 
        self.stopClock();
        self.$element.trigger('orbit.prev');
      });
      
      this.$wrapper.find('.right').click(function () {
        self.stopClock();
        self.$element.trigger('orbit.next');
      });
    },
    
    setupBulletNav: function () {
      this.$bullets = $(this.bulletHTML);
    	this.$wrapper.append(this.$bullets);
    	this.$slides.each(this.addBullet);
    	this.$element.addClass('with-bullets');
    	if (this.options.centerBullets) this.$bullets.css('margin-left', -this.$bullets.width() / 2);
    },
    
    addBullet: function (index, slide) {
      var position = index + 1,
          $li = $('<li>' + (position) + '</li>'),
          thumbName,
          self = this;

  		if (this.options.bulletThumbs) {
  			thumbName = $(slide).attr('data-thumb');
  			if (thumbName) {
          $li
            .addClass('has-thumb')
            .css({background: "url(" + this.options.bulletThumbLocation + thumbName + ") no-repeat"});;
  			}
  		}
  		this.$bullets.append($li);
  		$li.data('index', index);
  		$li.click(function () {
  			self.stopClock();
  			self.$element.trigger('orbit.goto', [$li.data('index')])
  		});
    },
    
    setActiveBullet: function () {
      if(!this.options.bullets) { return false; } else {
    		this.$bullets.find('li')
    		  .removeClass('active')
    		  .eq(this.activeSlide)
    		  .addClass('active');
    	}
    },
    
    resetAndUnlock: function () {
      this.$slides
      	.eq(this.prevActiveSlide)
      	.css({"z-index" : 1});
      this.unlock();
      this.options.afterSlideChange.call(this, this.$slides.eq(this.prevActiveSlide), this.$slides.eq(this.activeSlide));
    },
    
    shift: function (direction) {
      var slideDirection = direction;
      
      //remember previous activeSlide
      this.prevActiveSlide = this.activeSlide;
      
      //exit function if bullet clicked is same as the current image
      if (this.prevActiveSlide == slideDirection) { return false; }
      
      if (this.$slides.length == "1") { return false; }
      if (!this.locked) {
        this.lock();
	      //deduce the proper activeImage
        if (direction == "next") {
          this.activeSlide++;
          if (this.activeSlide == this.numberSlides) {
              this.activeSlide = 0;
          }
        } else if (direction == "prev") {
          this.activeSlide--
          if (this.activeSlide < 0) {
            this.activeSlide = this.numberSlides - 1;
          }
        } else {
          this.activeSlide = direction;
          if (this.prevActiveSlide < this.activeSlide) { 
            slideDirection = "next";
          } else if (this.prevActiveSlide > this.activeSlide) { 
            slideDirection = "prev"
          }
        }

        //set to correct bullet
        this.setActiveBullet();  
             
        //set previous slide z-index to one below what new activeSlide will be
        this.$slides
          .eq(this.prevActiveSlide)
          .css({"z-index" : 2});    
            
        //fade
        if (this.options.animation == "fade") {
          this.$slides
            .eq(this.activeSlide)
            .css({"opacity" : 0, "z-index" : 3})
            .animate({"opacity" : 1}, this.options.animationSpeed, this.resetAndUnlock);
        }
        
        //horizontal-slide
        if (this.options.animation == "horizontal-slide") {
          if (slideDirection == "next") {
            this.$slides
              .eq(this.activeSlide)
              .css({"left": this.orbitWidth, "z-index" : 3})
              .animate({"left" : 0}, this.options.animationSpeed, this.resetAndUnlock);
          }
          if (slideDirection == "prev") {
            this.$slides
              .eq(this.activeSlide)
              .css({"left": -this.orbitWidth, "z-index" : 3})
              .animate({"left" : 0}, this.options.animationSpeed, this.resetAndUnlock);
          }
        }
            
        //vertical-slide
        if (this.options.animation == "vertical-slide") { 
          if (slideDirection == "prev") {
            this.$slides
              .eq(this.activeSlide)
              .css({"top": this.orbitHeight, "z-index" : 3})
              .animate({"top" : 0}, this.options.animationSpeed, this.resetAndUnlock);
          }
          if (slideDirection == "next") {
            this.$slides
              .eq(this.activeSlide)
              .css({"top": -this.orbitHeight, "z-index" : 3})
              .animate({"top" : 0}, this.options.animationSpeed, this.resetAndUnlock);
          }
        }
        
        //horizontal-push
        if (this.options.animation == "horizontal-push") {
          if (slideDirection == "next") {
            this.$slides
              .eq(this.activeSlide)
              .css({"left": this.orbitWidth, "z-index" : 3})
              .animate({"left" : 0}, this.options.animationSpeed, this.resetAndUnlock);
            this.$slides
              .eq(this.prevActiveSlide)
              .animate({"left" : -this.orbitWidth}, this.options.animationSpeed);
          }
          if (slideDirection == "prev") {
            this.$slides
              .eq(this.activeSlide)
              .css({"left": -this.orbitWidth, "z-index" : 3})
              .animate({"left" : 0}, this.options.animationSpeed, this.resetAndUnlock);
		        this.$slides
              .eq(this.prevActiveSlide)
              .animate({"left" : this.orbitWidth}, this.options.animationSpeed);
          }
        }
        
        //vertical-push
        if (this.options.animation == "vertical-push") {
          if (slideDirection == "next") {
            this.$slides
              .eq(this.activeSlide)
              .css({top: -this.orbitHeight, "z-index" : 3})
              .animate({top : 0}, this.options.animationSpeed, this.resetAndUnlock);
            this.$slides
              .eq(this.prevActiveSlide)
              .animate({top : this.orbitHeight}, this.options.animationSpeed);
          }
          if (slideDirection == "prev") {
            this.$slides
              .eq(this.activeSlide)
              .css({top: this.orbitHeight, "z-index" : 3})
              .animate({top : 0}, this.options.animationSpeed, this.resetAndUnlock);
		        this.$slides
              .eq(this.prevActiveSlide)
              .animate({top : -this.orbitHeight}, this.options.animationSpeed);
          }
        }
        
        this.setCaption();
      }
    }
  };

  $.fn.orbit = function (options) {
    return this.each(function () {
      var orbit = $.extend({}, ORBIT);
      orbit.init(this, options);
    });
  };

})(jQuery);
        
/*!
 * jQuery imageready Plugin
 * http://www.zurb.com/playground/
 *
 * Copyright 2011, ZURB
 * Released under the MIT License
 */
(function ($) {
  
  var options = {};
  
  $.event.special.imageready = {
    
    setup: function (data, namespaces, eventHandle) {
      options = data || options;
    },
		
		add: function (handleObj) {
		  var $this = $(this),
		      src;
		      
	    if ( this.nodeType === 1 && this.tagName.toLowerCase() === 'img' && this.src !== '' ) {
  			if (options.forceLoad) {
  			  src = $this.attr('src');
  			  $this.attr('src', '');
  			  bindToLoad(this, handleObj.handler);
          $this.attr('src', src);
  			} else if ( this.complete || this.readyState === 4 ) {
          handleObj.handler.apply(this, arguments);
  			} else {
  			  bindToLoad(this, handleObj.handler);
  			}
  		}
		},
		
		teardown: function (namespaces) {
		  $(this).unbind('.imageready');
		}
	};
	
	function bindToLoad(element, callback) {
	  var $this = $(element);

    $this.bind('load.imageready', function () {
       callback.apply(element, arguments);
       $this.unbind('load.imageready');
     });
	}

}(jQuery));

/**
 * jQuery.placeholder - Placeholder plugin for input fields
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2008/10/14
 *
 * @author Blair Mitchelmore
 * @version 1.0.1
 *
 **/
new function($) {
    $.fn.placeholder = function(settings) {
        settings = settings || {};
        var key = settings.dataKey || "placeholderValue";
        var attr = settings.attr || "placeholder";
        var className = settings.className || "placeholder";
        var values = settings.values || [];
        var block = settings.blockSubmit || false;
        var blank = settings.blankSubmit || false;
        var submit = settings.onSubmit || false;
        var value = settings.value || "";
        var position = settings.cursor_position || 0;

        
        return this.filter(":input").each(function(index) { 
            $.data(this, key, values[index] || $(this).attr(attr)); 
        }).each(function() {
            if ($.trim($(this).val()) === "")
                $(this).addClass(className).val($.data(this, key));
        }).focus(function() {
            if ($.trim($(this).val()) === $.data(this, key)) 
                $(this).removeClass(className).val(value)
                if ($.fn.setCursorPosition) {
                  $(this).setCursorPosition(position);
                }
        }).blur(function() {
            if ($.trim($(this).val()) === value)
                $(this).addClass(className).val($.data(this, key));
        }).each(function(index, elem) {
            if (block)
                new function(e) {
                    $(e.form).submit(function() {
                        return $.trim($(e).val()) != $.data(e, key)
                    });
                }(elem);
            else if (blank)
                new function(e) {
                    $(e.form).submit(function() {
                        if ($.trim($(e).val()) == $.data(e, key)) 
                            $(e).removeClass(className).val("");
                        return true;
                    });
                }(elem);
            else if (submit)
                new function(e) { $(e.form).submit(submit); }(elem);
        });
    };
}(jQuery);

/*
 * jQuery Custom Forms Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

jQuery(document).ready(function ($) {
  
  function appendCustomMarkup(type) {
    $('form.custom input:' + type).each(function () {
      var $span = $('<span class="custom ' + type + '"></span>');
      if ($(this).next('span.custom.' + type).length === 0) {
        if (this.checked) {
          $span.addClass('checked');
        }
        $(this)
          .hide()
          .after($span);
      }
    });
  }
  appendCustomMarkup('checkbox');
  appendCustomMarkup('radio');
  
  $('form.custom select').each(function () {
    var $this = $(this),
        $customSelect = $this.next('div.custom.dropdown'),
        $options = $this.find('option'),
        maxWidth = 0,
        $li;
    
    if ($customSelect.length === 0) {      
      $customSelect = $('<div class="custom dropdown"><a href="#" class="selector"></a><ul></ul></div>"');
      $options.each(function () {
        $li = $('<li>' + $(this).html() + '</li>');
        $customSelect.find('ul').append($li);
      });
      $customSelect.prepend('<a href="#" class="current">' + $options.first().html() + '</a>');
      
      $this.after($customSelect);
      $this.hide();
    }
    
    $options.each(function (index) {
      if (this.selected) {
        $customSelect.find('li').eq(index).addClass('selected');
        $customSelect.find('.current').html($(this).html());
      }
    });
    
    $customSelect.find('li').each(function () {
      $customSelect.addClass('open');
      if ($(this).outerWidth() > maxWidth) {
        maxWidth = $(this).outerWidth();
      }
      $customSelect.removeClass('open');
    });
    $customSelect.css('width', maxWidth + 18 + 'px');
    $customSelect.find('ul').css('width', maxWidth + 16 + 'px');
  });
});

(function ($) {
  
  function toggleCheckbox($element) {
    var $input = $element.prev(),
        input = $input[0];

    input.checked = ((input.checked) ? false : true);
    $element.toggleClass('checked');
    
    $input.trigger('change');
  }
  
  function toggleRadio($element) {
    var $input = $element.prev(),
        input = $input[0];

    $('input:radio[name=' + $input.attr('name') + ']').each(function () {
      $(this).next().removeClass('checked');
    });
    input.checked = ((input.checked) ? false : true);
    $element.toggleClass('checked');
    
    $input.trigger('change');
  }
  
  $('form.custom span.custom.checkbox').live('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleCheckbox($(this));
  });
  
  $('form.custom span.custom.radio').live('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleRadio($(this));
  });
  
  $('form.custom label').live('click', function (event) {
    var $associatedElement = $('#' + $(this).attr('for')),
        $customCheckbox,
        $customRadio;
    if ($associatedElement.length !== 0) {
      if ($associatedElement.attr('type') === 'checkbox') {
        event.preventDefault();
        $customCheckbox = $(this).find('span.custom.checkbox');
        toggleCheckbox($customCheckbox);
      } else if ($associatedElement.attr('type') === 'radio') {
        event.preventDefault();
        $customRadio = $(this).find('span.custom.radio');
        toggleRadio($customRadio);
      }
    }
  });

  $('form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector').live('click', function (event) {
    var $this = $(this),
        $dropdown = $this.closest('div.custom.dropdown');
    
    event.preventDefault();
    $dropdown.toggleClass('open');
    
    if ($dropdown.hasClass('open')) {
      $(document).bind('click.customdropdown', function (event) {
        $dropdown.removeClass('open');
        $(document).unbind('.customdropdown');
      });
    } else {
      $(document).unbind('.customdropdown');
    }
  });
  
  $('form.custom div.custom.dropdown li').live('click', function (event) {
    var $this = $(this),
        $customDropdown = $this.closest('div.custom.dropdown'),
        $select = $customDropdown.prev(),
        selectedIndex = 0;
        
    event.preventDefault();
    event.stopPropagation();
    
    $this
      .closest('ul')
      .find('li')
      .removeClass('selected');
    $this.addClass('selected');
    
    $customDropdown
      .removeClass('open')
      .find('a.current')
      .html($this.html());
    
    $this.closest('ul').find('li').each(function (index) {
      if ($this[0] == this) {
        selectedIndex = index;
      }
      
    });
    $select[0].selectedIndex = selectedIndex;
    
    $select.trigger('change');
  });
})(jQuery);

/*! http://mths.be/placeholder v1.8.5 by @mathias */
(function(g,a,$){var f='placeholder' in a.createElement('input'),b='placeholder' in a.createElement('textarea');if(f&&b){$.fn.placeholder=function(){return this};$.fn.placeholder.input=$.fn.placeholder.textarea=true}else{$.fn.placeholder=function(){return this.filter((f?'textarea':':input')+'[placeholder]').bind('focus.placeholder',c).bind('blur.placeholder',e).trigger('blur.placeholder').end()};$.fn.placeholder.input=f;$.fn.placeholder.textarea=b;$(function(){$('form').bind('submit.placeholder',function(){var h=$('.placeholder',this).each(c);setTimeout(function(){h.each(e)},10)})});$(g).bind('unload.placeholder',function(){$('.placeholder').val('')})}function d(i){var h={},j=/^jQuery\d+$/;$.each(i.attributes,function(l,k){if(k.specified&&!j.test(k.name)){h[k.name]=k.value}});return h}function c(){var h=$(this);if(h.val()===h.attr('placeholder')&&h.hasClass('placeholder')){if(h.data('placeholder-password')){h.hide().next().show().focus().attr('id',h.removeAttr('id').data('placeholder-id'))}else{h.val('').removeClass('placeholder')}}}function e(){var l,k=$(this),h=k,j=this.id;if(k.val()===''){if(k.is(':password')){if(!k.data('placeholder-textinput')){try{l=k.clone().attr({type:'text'})}catch(i){l=$('<input>').attr($.extend(d(this),{type:'text'}))}l.removeAttr('name').data('placeholder-password',true).data('placeholder-id',j).bind('focus.placeholder',c);k.data('placeholder-textinput',l).data('placeholder-id',j).before(l)}k=k.removeAttr('id').hide().prev().attr('id',j).show()}k.addClass('placeholder').val(k.attr('placeholder'))}else{k.removeClass('placeholder')}}}(this,document,jQuery));

$(document).ready(function() {

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */
	
	var tabs = $('dl.tabs');
		tabsContent = $('ul.tabs-content')
	
	tabs.each(function(i) {
		//Get all tabs
		var tab = $(this).children('dd').children('a');
		tab.click(function(e) {
			
			//Get Location of tab's content
			var contentLocation = $(this).attr("href")
			contentLocation = contentLocation + "Tab";
			
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
			
				e.preventDefault();
			
				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');
				
				//Show Tab Content
				$(contentLocation).parent('.tabs-content').children('li').css({"display":"none"});
				$(contentLocation).css({"display":"block"});
				
			} 
		});
	});
	
	
	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */
	
	$('input, textarea').placeholder();
	
	
	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */
	
	
});

