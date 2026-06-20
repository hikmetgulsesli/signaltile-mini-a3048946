/**
 * ACT_EXPORT_SUMMARY handler.
 */
(function () {
  'use strict';

  var VALID_STATUSES = { ok: true, warn: true, down: true };

  function clone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (err) {
      return value;
    }
  }

  function getCurrentFilter() {
    var insightsState = window.SignalTileInsightsState || {};
    var filter = insightsState.filter || 'all';
    return VALID_STATUSES[filter] ? filter : 'all';
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

    var filter = getCurrentFilter();
    var visibleRecords = records;
    if (filter !== 'all') {
      visibleRecords = records.filter(function (r) {
        return r && r.status === filter;
      });
    }

    var counts = { ok: 0, warn: 0, down: 0 };
    visibleRecords.forEach(function (r) {
      if (r && counts[r.status] != null) {
        counts[r.status] += 1;
      }
    });

    var summary = {
      generatedAt: Date.now(),
      status: 'exported',
      filter: filter,
      total: visibleRecords.length,
      counts: counts,
      records: visibleRecords
    };

    return summary;
  };
})();
