/**
 * ACT_CANCEL_EDIT handler.
 */
(function () {
  'use strict';

  window.SignalTileActions = window.SignalTileActions || {};

  window.SignalTileActions.cancelEdit = function () {
    if (window.SignalTileRecords) {
      window.SignalTileRecords.selectRecord(null);
    }
    return { cancelled: true };
  };
})();
