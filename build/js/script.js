'use strict';
(function ($) {
  $('.page-header').removeClass('no-js');
  $('.page-header').addClass('page-header--closed');
  $('.page-header').removeClass('page-header--opened');
  $('.page-header__navigation').css('height', '100%');

  // MOBILE MENU OPEN-CLOSE
  $('.page-header__menu-toggle').on('click', function () {
    if (document.body.clientWidth < 1024) {
      $('body').toggleClass('body-no-scroll');
      var headerHeight = $('.page-header').height() === $(window).height() ? 126 : $(window).height();
      $('.page-header').css('height', headerHeight);

      // pageHeaderNavList.style.height = pageHeaderNavList.style.height === '100%' ? '' : '100%';
    }
    if ($('.page-header').hasClass('page-header--closed')) {
      $('.page-header').removeClass('page-header--closed').addClass('page-header--opened');
    } else {
      $('.page-header').removeClass('page-header--opened').addClass('page-header--closed');
    }
  });

  // LOGIN POPUP OPEN-CLOSE
  var templateFrag = $('#login-popup').prop('content');
  var loginWindow = $(templateFrag)
      .find('.login-popup__container')
      .clone();

  $('#login-button').on('click', function () {
    $('.page__body').addClass('body-no-scroll');
    $('.page__body').append(loginWindow);
    var closeButton = $('.login-popup__close-button');
    $('#popup-name').focus();

    // TURN OF ANOTHER INTERACTIVE ELEMENTS
    var modalNodes = $('.login-popup__container').find(':focusable');
    var focusableNodes = $(':focusable');
    for (var i = 0; i < focusableNodes.length; i++) {
      var node = focusableNodes[i];
      if (!modalNodes.is(node)) {
        node._prevTabindex = node.tabIndex;
        node.tabIndex = -1;
        node.style.pointerEvents = 'none';
        node.style.outline = 'none';
      }
    }

    // CLOSE BY OVERLAY CLICK
    window.addEventListener('click', function (evt) {
      var isPathContainForm = function (x) {
        return (typeof x.className === 'string') ? x.className.includes('login-popup__container') || x.id.includes('login-button') : false;
      };
      if (!evt.composedPath().some(isPathContainForm)) {
        removeModal(evt);
      }
    });

    // CLOSE BY ESC CLICK
    var onEscRemoveModal = function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        removeModal(evt);
      }
    };
    var removeModal = function (evt) {
      evt.preventDefault();
      loginWindow.remove();
      $('.page__body').removeClass('body-no-scroll');

      // RESTORE TABINDEX & POINTER-EVENTS TO AUTO
      for (i = 0; i < focusableNodes.length; i++) {
        node = focusableNodes[i];
        node.tabIndex = node._prevTabindex;
        node._prevTabindex = null;
        node.style.pointerEvents = 'auto';
        node.style.outline = null;
      }

      // REMOVE LISTENERS
      $(document).off('keydown', onEscRemoveModal);
      closeButton.off('click', removeModal);
    };
    $(document).on('keydown', onEscRemoveModal);
    closeButton.on('click', removeModal);
  });

  $('.shop__page-number-item')

})(jQuery);
