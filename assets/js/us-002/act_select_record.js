/**
 * ACT_SELECT_RECORD handler.
 */
(function () {
  'use strict';

  window.SignalTileActions = window.SignalTileActions || {};

  window.SignalTileActions.selectRecord = function (id) {
    if (!window.SignalTileRecords) return null;
    return window.SignalTileRecords.selectRecord(id);
  };
})();
