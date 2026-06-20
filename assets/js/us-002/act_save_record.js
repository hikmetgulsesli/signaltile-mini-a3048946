/**
 * ACT_SAVE_RECORD handler.
 */
(function () {
  'use strict';

  window.SignalTileActions = window.SignalTileActions || {};

  window.SignalTileActions.saveRecord = function (data) {
    if (!window.SignalTileRecords) return null;
    var id = data && data.id;
    if (!id) {
      var created = window.SignalTileRecords.createRecord(data);
      return { saved: created, created: true };
    }
    var updated = window.SignalTileRecords.updateRecord(id, data);
    return { saved: updated, created: false };
  };
})();
