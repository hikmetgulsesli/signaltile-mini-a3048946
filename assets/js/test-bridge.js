/**
 * Test bridge exposed for deterministic platform verification.
 */
(function () {
  'use strict';

  function getAppState() {
    return window.app && typeof window.app.getState === 'function'
      ? window.app.getState()
      : null;
  }

  window.__SETFARM_TEST_BRIDGE__ = {
    stack: 'signaltile-mini',
    ready: true,
    getState: getAppState
  };
})();
