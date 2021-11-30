'use strict';
(function ($) {
  $('.page-header').removeClass('no-js');
  $('.page-header').addClass('page-header--closed');
  $('.page-header').removeClass('page-header--opened');
  $('.page-header__navigation').css('height', '100%');

  // MOBILE MENU OPEN-CLOSE
  $('.page-header__menu-toggle').on('click', function () {
    if ($(window).width() < 1024) {
      $('body').toggleClass('body-no-scroll');
      var headerHeight = $('.page-header').height() === $(window).height() ? 126 : $(window).height();
      $('.page-header').css('height', headerHeight);
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

    // CLOSE POPUP
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
    $(document).on('keydown', onEscRemoveModal);
    closeButton.on('click', removeModal);
  });

  // SLIDER
  // NUMBER OF ITEMS IN SHOP
  var itemsNumber = $('.shop__product-item').length;
  var screenItems = ( $(window).width() > 1023 ) ? 4 : 2;
  var numberOfPages =Math.ceil(itemsNumber / screenItems);
  // ADD FIRST PAGE ITEMS ON SCREEN
  $('.shop__product-item').slice(0, screenItems).addClass('shop__product-item--current');
  // ADD PAGINATION
  if (numberOfPages > 0) {
    if ($(window).width() > 767) {
      $('.shop__page-number-list').append('<li class="shop__page-number-item shop__page-number-item--current" tabindex="0">1</li>');
      for (var i = 2; i < numberOfPages + 1; i++) {
        $('.shop__page-number-list').append(`<li class="shop__page-number-item" tabindex="0">${i}</li>`);
      }
    } else {
      $('.shop__page-number-list').append(`<span class="shop__mobile-pages-pagination">1 of ${numberOfPages}</span>`);
    }
  }
  var currentPage = 1;

  var getPagNumber = function (element) {
    return Number(element.innerText);
  };

  var changeCurrentPage = function (pageNumber, itemsOnScreen) {
    $('.shop__product-item--current').removeClass('shop__product-item--current');
    var startItemNumber = itemsOnScreen * (pageNumber - 1);
    var finishItemNumber = itemsOnScreen * pageNumber;
    $('.shop__product-item').slice(startItemNumber, finishItemNumber).addClass('shop__product-item--current');
    currentPage = pageNumber;
    if ($(window).width() > 767) {
      $('.shop__page-number-item--current').removeClass('shop__page-number-item--current');
      $('.shop__page-number-item').slice(pageNumber-1, pageNumber).addClass('shop__page-number-item--current');
    } else {
      $('.shop__page-number-list').empty();
      $('.shop__page-number-list').append(`<span class="shop__mobile-pages-pagination">${currentPage} of ${numberOfPages}</span>`);
    }
  }

  $('.shop__arrow--left').on('click', function () {
    if (currentPage > 1) {
      changeCurrentPage(currentPage-1, screenItems);
    }
  });
  $('.shop__arrow--right').on('click', function () {
    if (currentPage < numberOfPages) {
      changeCurrentPage(currentPage+1, screenItems);
    }
  });
  $('.shop__page-number-item').on('click', function (evt) {
    var pageNumber = getPagNumber(evt.target);
    if (pageNumber !== currentPage) {
      changeCurrentPage(pageNumber, screenItems);
    }
  });

})(jQuery);
