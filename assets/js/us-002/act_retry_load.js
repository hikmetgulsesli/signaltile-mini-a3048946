/**
 * ACT_RETRY_LOAD handler.
 */
(function () {
  'use strict';

  window.SignalTileActions = window.SignalTileActions || {};

  window.SignalTileActions.retryLoad = function () {
    if (!window.SignalTileRecords) return 0;
    return window.SignalTileRecords.retryLoad();
  };
})();
