$(document).ready(function() {
  $('.searchform__select').selectmenu({
    create: function(e, ui) {
      $('.ui-selectmenu-button .ui-selectmenu-text').each(function() {
        if (!$(this).children('.ui-asterisk').length > 0) {
          $(this).append('<span class="ui-asterisk">*</span>');
        }
      });

      $('.ui-selectmenu-button').css({'width': '100%'});
    },

    open: function(e, ui) {
      var selectWidth = $('.ui-selectmenu-button .ui-selectmenu-text').css('width');
      // selectWidth = +selectWidth.substr(0, selectWidth.length-2);
      // selectWidth -= 40;
      $('.ui-selectmenu-open ul').css({'width': selectWidth});

      e.currentTarget.childNodes[1].style['borderRadius'] = '16px 0 0 0';
      e.currentTarget.childNodes[1].className += ' styledBorderRadius';
    },

    close: function(e, ui) {
      $('.styledBorderRadius').css({'border-radius': '16px 0 0 16px'}).removeClass('styledBorderRadius');
    }
  });

  $(window).resize(function() {
    if ($(window).width() < 768 && $(window).width() > 480) {
      $('.ui-selectmenu-button').css({'width': '60%'});
      console.log('cool')
    } else {
      $('.ui-selectmenu-button').css({'width': '100%'});
    }
  });
});