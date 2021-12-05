import * as focusTrap from 'focus-trap';

document.querySelectorAll('[data-toggles-class]').forEach((toggler) => {
  const className = toggler.dataset.togglesClass;
  const classToggleTarget = document.getElementById(toggler.dataset.togglesClassFor);

  toggler.addEventListener('click', () => {
    classToggleTarget.classList.toggle(className);
  });
});

const cookiesModal = document.getElementById('cookies-pop-up');
cookiesModal.focus();
const cookiesModalTrap = focusTrap.createFocusTrap(cookiesModal, { allowOutsideClick: true });
cookiesModalTrap.activate();
const cookiesModalCloseButton = cookiesModal.querySelector('.cookies-pop-up__agree-button');
cookiesModalCloseButton.addEventListener('click', () => {
  cookiesModalTrap.deactivate();
});

document.querySelectorAll('[data-focus-hidden="true"]').forEach((element) => {
  element.tabIndex = -1;
});

const pageMain = document.querySelector('.page-main');

const menuButton = document.querySelector('.page-header-top-bar__menu-button');
const pageNavDarken = document.querySelector('.page-nav-darken');

const topBar = menuButton.querySelector('.burger-icon__top');
const middleBar = menuButton.querySelector('.burger-icon__middle');
const bottomBar = menuButton.querySelector('.burger-icon__bottom');

const submenu = document.querySelector('.menu-sub-nav');
const submenuOpenButton = document.querySelector('.nav-list__open-submenu-button');
const submenuCloseButton = document.querySelector('.menu-sub-nav__go-back-button');

const playBackAndForth = (animation) => {
  if (animation === undefined) {
    return () => {};
  }

  let playingFirstTime = true;
  animation.pause();

  return () => {
    if (playingFirstTime) {
      playingFirstTime = false;
    } else {
      animation.reverse();
    }
    animation.play();
  };
};

const animationOptions = {
  direction: 'normal',
  fill: 'forwards',
  duration: 300,
  easing: 'ease-in-out',
};

const topBarAnimation = playBackAndForth(
  topBar.animate(
    [
      {
        transform: 'none',
      },
      {
        transform: 'translateY(30%)',
        offset: 0.3,
      },
      {
        transform: 'translateY(30%)',
        offset: 0.6,
      },
      {
        transform: 'translateY(30%) rotate(45deg)',
      },
    ],
    animationOptions,
  ),
);

const middleBarAnimation = playBackAndForth(
  middleBar.animate(
    [
      {
        transform: 'none',
      },
      {
        transform: 'none',
        offset: 0.3,
      },
      {
        transform: 'none',
        offset: 0.6,
      },
      {
        transform: 'rotate(45deg)',
      },
    ],
    animationOptions,
  ),
);

const bottomBarAnimation = playBackAndForth(
  bottomBar.animate(
    [
      {
        transform: 'none',
      },
      {
        transform: 'translateY(-30%)',
        offset: 0.3,
      },
      {
        transform: 'translateY(-30%)',
        offset: 0.6,
      },
      {
        transform: 'translateY(-30%) rotate(135deg)',
      },
    ],
    animationOptions,
  ),
);

let menuOpened = false;

const navList = document.querySelector('.page-nav');
const menuFocusTrap = focusTrap.createFocusTrap(navList, { allowOutsideClick: true });

const closeMenu = () => {
  menuOpened = false;
  submenu.classList.remove('menu-sub-nav_toggled');
  menuButton.classList.remove('page-header__menu-button_toggled');
  pageNavDarken.classList.remove('page-nav-darken_toggled');

  navList.querySelectorAll('[data-focus-hidden="true"]').forEach((element) => {
    element.tabIndex = -1;
  });
  menuFocusTrap.deactivate();

  document.body.style.overflowY = 'auto';
};

const openMenu = () => {
  menuOpened = true;
  menuButton.classList.add('page-header__menu-button_toggled');
  pageNavDarken.classList.add('page-nav-darken_toggled');

  navList.querySelectorAll('[data-focus-hidden="true"]').forEach((element) => {
    element.tabIndex = 0;
  });
  navList.focus({ preventScroll: true });
  menuFocusTrap.activate();

  document.body.style.overflowY = 'hidden';
};

const scrollBarMediaQuery = window.matchMedia('(min-width: 50rem)');
scrollBarMediaQuery.addEventListener('change', () => {
  if (scrollBarMediaQuery.matches) {
    document.body.style.overflowY = 'auto';
    return;
  }
  if (!menuOpened) {
    document.body.style.overflowY = 'auto';
    return;
  }

  document.body.style.overflowY = 'hidden';
  window.scrollTo({ top: 0 });
});

const toggleMenu = () => {
  if (menuOpened) {
    closeMenu();
  } else {
    openMenu();
  }
};

menuButton.addEventListener('click', () => {
  topBarAnimation();
  middleBarAnimation();
  bottomBarAnimation();

  toggleMenu();
});

pageMain.addEventListener('click', () => {
  if (menuOpened) {
    topBarAnimation();
    middleBarAnimation();
    bottomBarAnimation();

    closeMenu();
  }
});

const menuCloseButton = document.querySelector('.page-nav__close-menu');
menuCloseButton.addEventListener('click', () => {
  if (menuOpened) {
    topBarAnimation();
    middleBarAnimation();
    bottomBarAnimation();

    closeMenu();
  }
});

const submenuFocusTrap = focusTrap.createFocusTrap(submenu, { allowOutsideClick: true });

submenuOpenButton.addEventListener('click', () => {
  submenu.classList.add('menu-sub-nav_toggled');

  setTimeout(() => {
    submenu.querySelectorAll('[data-focus-hidden="true"]').forEach((element) => {
      element.tabIndex = 0;
    });
    submenu.focus({ preventScroll: true });
    submenuFocusTrap.activate();
  }, 200);
});

submenuCloseButton.addEventListener('click', () => {
  submenu.classList.remove('menu-sub-nav_toggled');
  submenu.querySelectorAll('[data-focus-hidden="true"]').forEach((element) => {
    element.tabIndex = -1;
  });
  submenuFocusTrap.deactivate();
});

const largeScreenMedia = window.matchMedia('(min-width: 50rem)');
if (largeScreenMedia.matches) {
  navList.querySelectorAll('[data-focus-hidden="true"]').forEach((element) => {
    element.tabIndex = 0;
  });
}
largeScreenMedia.addEventListener('change', (event) => {
  navList.querySelectorAll('[data-focus-hidden="true"]').forEach((element) => {
    element.tabIndex = event.matches ? 0 : -1;
  });
});

// modals

const learnMoreModalOverlay = document.querySelector('.endless-extras-section__learn-more-overlay');
let currentModal = null;

const modalFocusTraps = new Map();

function openModal(modal, modalFocusTrap) {
  learnMoreModalOverlay.classList.add('endless-extras-section__learn-more-overlay_toggled');
  modal.classList.add('toggled');
  modal.querySelectorAll('[data-focus-hidden]').forEach((element) => {
    element.tabIndex = 0;
  });
  modalFocusTrap.activate();
  currentModal = modal;
}

function closeModal(modal, modalFocusTrap) {
  learnMoreModalOverlay.classList.remove('endless-extras-section__learn-more-overlay_toggled');
  modal.querySelectorAll('[data-focus-hidden]').forEach((element) => {
    element.tabIndex = -1;
  });
  modal.classList.remove('toggled');
  modalFocusTrap.deactivate();
}

[
  ...document.querySelectorAll('.extras-item__learn-more-button'),
  ...document.querySelectorAll('.extras-item_learn-more-image-button'),
].forEach((button) => {
  if (!button.dataset.opensModal) {
    return;
  }
  const modal = document.querySelector(`#${button.dataset.opensModal}`);
  const modalFocusTrap = focusTrap.createFocusTrap(modal, { allowOutsideClick: true });
  modalFocusTraps.set(modal, modalFocusTrap);
  button.addEventListener('click', () => openModal(modal, modalFocusTraps.get(modal)));
});

[
  ...document.querySelectorAll('.learn-more-modal__accept-modal'),
  ...document.querySelectorAll('.learn-more-modal__close-button'),
].forEach((button) => {
  if (!button.dataset.closesModal) {
    return;
  }
  const modal = document.getElementById(button.dataset.closesModal);
  button.addEventListener('click', () => closeModal(modal, modalFocusTraps.get(modal)));
});

learnMoreModalOverlay.addEventListener('click', (event) => {
  if (event.target === learnMoreModalOverlay) {
    closeModal(currentModal, modalFocusTraps.get(currentModal));
  }
});

// carousel

document.querySelectorAll('.learn-more-modal__page-radios').forEach((radiosBlock) => {
  if (!radiosBlock.dataset.controlsCarousel) {
    return;
  }
  const controlsBlock = radiosBlock.parentElement;
  const prevButton = controlsBlock.querySelector('.learn-more-modal__prev-page-button');
  const nextButton = controlsBlock.querySelector('.learn-more-modal__next-page-button');
  const acceptButton = controlsBlock.querySelector('.learn-more-modal__accept-modal');

  const carousel = document.getElementById(radiosBlock.dataset.controlsCarousel);
  const slidesCount = Number.parseInt(carousel.dataset.slidesCount, 10);
  radiosBlock.addEventListener('change', (event) => {
    if (!event.target.dataset?.pageNumber) {
      return;
    }
    const pageNumber = Number.parseInt(event.target.dataset.pageNumber, 10);
    if (pageNumber === 1) {
      prevButton.style.visibility = 'hidden';
    } else {
      prevButton.style.visibility = 'visible';
    }
    if (pageNumber === slidesCount) {
      nextButton.style.visibility = 'hidden';
      acceptButton.style.visibility = 'visible';
    } else {
      nextButton.style.visibility = 'visible';
      acceptButton.style.visibility = 'hidden';
    }
    carousel.style.transform = `translateX(-${((pageNumber - 1) * 100) / slidesCount}%)`;
  });
});

document
  .querySelectorAll('.learn-more-modal__prev-page-button, .learn-more-modal__next-page-button')
  .forEach((shiftPageButton) => {
    if (!shiftPageButton.dataset.selectsFrom) {
      return;
    }
    const shiftsBy = Number.parseInt(shiftPageButton.dataset.shiftsBy, 10);
    const radiosBlock = document.getElementById(shiftPageButton.dataset.selectsFrom);
    const radios = [...radiosBlock.querySelectorAll('input[type="radio"]')];
    shiftPageButton.addEventListener('click', () => {
      const nextPage = radios.findIndex((radio) => radio.checked) + shiftsBy;
      if (nextPage >= 0 && nextPage < radios.length) {
        radios[nextPage].checked = true;
        radios[nextPage].dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
