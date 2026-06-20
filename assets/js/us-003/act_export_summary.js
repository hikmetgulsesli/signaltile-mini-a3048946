/**
 * ACT_EXPORT_SUMMARY handler.
 */
(function () {
  'use strict';

  function clone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (err) {
      return value;
    }
  }

  window.SignalTileActions = window.SignalTileActions || {};

  window.SignalTileActions.exportInsightsSummary = function () {
    var records = [];
    if (window.SignalTileRecords) {
      records = clone(window.SignalTileRecords.getState().records);
    }

    var counts = { ok: 0, warn: 0, down: 0 };
    records.forEach(function (r) {
      if (counts[r.status] != null) {
        counts[r.status] += 1;
      }
    });

    var summary = {
      generatedAt: Date.now(),
      total: records.length,
      counts: counts,
      records: records
    };

    return summary;
  };
})();
