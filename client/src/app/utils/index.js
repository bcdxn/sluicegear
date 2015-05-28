var MD5 = require('MD5'),
    $   = require('jquery');

var Utils = {
  /**
   * Generate the md5 hash of the hammock properties
   * so that we can quickly map a build to a sku.
   * 
   * @param  {Object} customBuild The current custom built hammock
   * @return {String}             The md5 hash of build properties
   */
  getHammockHash: function (customBuild) {
    var attrVals = ['','','','',''];
    
    attrVals[0] = 'hammock';
    attrVals[1] = customBuild.model;
    attrVals[2] = customBuild.primaryColor;
    attrVals[3] = customBuild.secondaryColor;
    
    return MD5(attrVals.join('|').toLowerCase());
  },
  
  /**
   * Generate the md5 hash of the straps so that we can
   * quickly map the straps to a sku.
   * 
   * @param {String} [model]    Either 'standard' or 'auxillary' defaults to 'standard'
   * @param {String} [color]  The color of the straps defaults to 'black'
   * @param {String} [length] The length of the straps defaults to '7 feet'
   */
  getStrapsHash: function (model, color, length) {
    var attrVals = ['','','','',''];
    
    attrVals[0] = 'straps';
    attrVals[1] = model  || 'standard';
    attrVals[2] = color  || 'black';
    attrVals[4] = length || '7 feet';
    
    return MD5(attrVals.join('|').toLowerCase());
  },
  
  /**
   * Add the parallax functionality to the background image of the
   * intro section.
   */
  introSectionParallax: function () {
    var self = this;
    
    // Intro Section Parallax
    $(window).on('scroll', function (evt) {
      var windowHeight     = $(this).height(),
          sectionOffset,
          start            = 0,
          startLeftPercent = -30,
          leftPercent      = startLeftPercent,
          percentDelta     = Math.abs(startLeftPercent),
          scrollDelta      = 600,
          $section         = $('#introSectionParallaxBg');
  
      if ($('#introSection').length > 0) {
        $('#introSection').offset().top;
  
        if (self.isUserMobile()) {
          $section.css('left', '0');
          $section.css('background-position', 'center left');
        } else {
          if (sectionOffset > windowHeight) {
            start = sectionOffset - windowHeight;
          }
  
          if ($(this).scrollTop() > start) {
            leftPercent = startLeftPercent +
              (percentDelta * (($(this).scrollTop() - start) / scrollDelta));
          }
  
          if (leftPercent > 0) {
            leftPercent = 0;
          }
  
          $section.css('left', leftPercent + '%');
        }
      }
    });
  },
  
  /**
   * Add the parallax functionality to the background image of the
   * color section.
   */
  colorSectionParallax: function () {
    var self = this;
    
    // Color Section Parallax
    $(window).on('scroll', function (evt) {
      var windowHeight      = $(this).height(),
          sectionOffset,
          start             = 0,
          startRightPercent = 0,
          endRightPercent   = 30,
          rightPercent      = startRightPercent,
          percentDelta      = Math.abs(endRightPercent - startRightPercent),
          scrollDelta       = 600,
          $section          = $('#portableSectionParallaxBg');
  
      if ($('#introSection').length > 0) {
        sectionOffset = $('#portableSection').offset().top;
  
        if (self.isUserMobile()) {
          $section.css('left', '0');
          $section.css('background-position', 'center left');
        } else {
          if (sectionOffset > windowHeight) {
            start = sectionOffset - windowHeight;
          }
  
          if ($(this).scrollTop() > start) {
            rightPercent = startRightPercent +
              (percentDelta * (($(this).scrollTop() - start) / scrollDelta));
          }
  
          if (rightPercent > 30) {
            rightPercent = 30;
          }
  
          $section.css('right', rightPercent + '%');
        }
      }
    });
  },
  
  /**
   * Check if the user agent is a variant of iOS.
   *
   * @return {Boolean} True if the user agen is iOS; else false
   */
  isUserMobile: function () {
    return /(iPad|iPhone|iPod)/ig.test(navigator.userAgent) || $(window).width < 481;
  },
  
  /**
   * Scroll to the given id with the given speed.
   *
   * @param {String} id   The id to scroll to
   * @param {Number} [ms] The time in milliseconds
   */
  scrollToId: function (id, ms) {
    ms = ms || 1000;
  
    $('html,body').animate({
      scrollTop: $(id).offset().top
    }, ms);
  
    return false;
  },
  
  /**
   * Add scroll animation to the infographic.
   */
  animateInfographic: function () {
    var self = this;
    
    $(window).on('scroll', function() {
      if ($('#infographicBottom').length > 0) {
        if (self.isElementInViewport($('#infographicBottom').get(0), 0) &&
            !($('#infographicThread').hasClass('animated'))) {
  
          setTimeout(function () {
            $('#infographicThread').addClass('animated bounceIn');
            setTimeout(function () {
              $('#infographicClip').addClass('animated bounceIn');
              setTimeout(function() {
                $('#infographicStash').addClass('animated bounceIn');
                setTimeout(function () {
                  $('#infographicSnap').addClass('animated bounceIn');
                }, 800);
              }, 800);
            }, 800);
          }, 100);
        } else if (!self.isElementInViewport($('#infographicTop').get(0), 0)) {
          $('#infographicThread').removeClass('animated bounceIn');
          $('#infographicClip').removeClass('animated bounceIn');
          $('#infographicStash').removeClass('animated bounceIn');
          $('#infographicSnap').removeClass('animated bounceIn');
        }
      }
    });
  },
  
  /**
   * Check if the given element is in the viewport.
   *
   * @param  {Element} el HTML element
   * @return {Boolean}    True if the given element is in viewport
   */
  isElementInViewport: function (el, offset) {
    var rect = el.getBoundingClientRect();
  
    return (rect.top - window.innerHeight + offset) < 0;
  }

};

$.extend({
  getQueryParameters : function(str) {
	  return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }
});


module.exports = Utils;