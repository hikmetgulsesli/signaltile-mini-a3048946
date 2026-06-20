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
    if (window.SignalTileRecords && typeof window.SignalTileRecords.getState === 'function') {
      var state = window.SignalTileRecords.getState();
      if (state && Array.isArray(state.records)) {
        records = clone(state.records);
      }
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
