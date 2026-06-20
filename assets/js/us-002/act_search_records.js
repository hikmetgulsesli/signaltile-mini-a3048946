/**
 * ACT_SEARCH_RECORDS handler.
 */
(function () {
  'use strict';

  window.SignalTileActions = window.SignalTileActions || {};

  window.SignalTileActions.searchRecords = function (query) {
    if (!window.SignalTileRecords) return [];
    window.SignalTileRecords.setSearchQuery(query);
    return window.SignalTileRecords.getPagedRecords();
  };
})();
