(() => {
  const WIDGET_SELECTOR = '.asw-menu-btn';
  const NAV_SELECTOR = '.nordic-nav__bar';
  const OFFSET_X = 16;
  const OFFSET_Y = 16;
  const GAP = 8;
  const BUTTON_Z_INDEX = 2500;
  const BUTTON_SIZE = 46;

  let frameId = 0;

  function positionWidget() {
    frameId = 0;

    const button = document.querySelector(WIDGET_SELECTOR);

    if (!(button instanceof HTMLElement)) {
      return;
    }

    const navBar = document.querySelector(NAV_SELECTOR);
    const navBottom = navBar instanceof HTMLElement ? navBar.getBoundingClientRect().bottom : 0;
    const top = navBottom > OFFSET_Y ? navBottom + GAP : OFFSET_Y;

    button.style.position = 'fixed';
    button.style.top = `${Math.round(top)}px`;
    button.style.right = `${OFFSET_X}px`;
    button.style.left = 'auto';
    button.style.bottom = 'auto';
    button.style.zIndex = `${BUTTON_Z_INDEX}`;
    button.style.width = `${BUTTON_SIZE}px`;
    button.style.height = `${BUTTON_SIZE}px`;
    button.style.minWidth = `${BUTTON_SIZE}px`;
    button.style.minHeight = `${BUTTON_SIZE}px`;
  }

  function schedulePosition() {
    if (frameId) {
      return;
    }

    frameId = window.requestAnimationFrame(positionWidget);
  }

  function init() {
    schedulePosition();

    window.addEventListener('scroll', schedulePosition, { passive: true });
    window.addEventListener('resize', schedulePosition);

    new MutationObserver(schedulePosition).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
