'use strict';
(function ($) {
  // LOGIN POPUP OPEN
  var templateFrag = $('#login-popup').prop('content');
  var loginWindow = $(templateFrag)
      .find('.login-popup__container')
      .clone();

  $('#login-button').on('click', function () {
    $('.page__body').addClass('body-no-scroll');
    $('.page__body').append(loginWindow);
    var closeButton = $('.login-popup__close-button');
    $('#popup-name').focus();

    // закрытие по клику вне модального окна
    window.addEventListener('click', function (evt) {
      var isPathContainForm = function (x) {
        return (typeof x.className === 'string') ? x.className.includes('login-popup__container') || x.id.includes('login-button') : false;
      };
      if (!evt.composedPath().some(isPathContainForm)) {
        removeModal(evt);
      }
    });

    // недоступность элементов вне модального окна
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

    // закрытие модалки по нажатию на Esc клавиатуры
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

  // var pageHeader = document.querySelector('.page-header');
  // var headerToggle = document.querySelector('.page-header__toggle');

  // pageHeader.classList.remove('page-header--nojs');

  // headerToggle.addEventListener('click', function () {
  //   if (pageHeader.classList.contains('page-header--closed')) {
  //     pageHeader.classList.remove('page-header--closed');
  //     pageHeader.classList.add('page-header--opened');
  //   } else {
  //     pageHeader.classList.add('page-header--closed');
  //     pageHeader.classList.remove('page-header--opened');
  //   }
  // });
})(jQuery);
