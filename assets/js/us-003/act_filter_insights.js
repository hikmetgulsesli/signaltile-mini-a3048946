/**
 * ACT_FILTER_INSIGHTS handler.
 */
(function () {
  'use strict';

  var FILTERS = ['all', 'ok', 'warn', 'down'];

  window.SignalTileInsightsState = window.SignalTileInsightsState || { filter: 'all' };

  window.SignalTileActions = window.SignalTileActions || {};

  window.SignalTileActions.filterInsights = function (criteria) {
    var state = window.SignalTileInsightsState;
    var current = state.filter || 'all';

    if (criteria !== undefined) {
      if (FILTERS.indexOf(criteria) !== -1) {
        state.filter = criteria;
      }
    } else {
      var nextIndex = (FILTERS.indexOf(current) + 1) % FILTERS.length;
      state.filter = FILTERS[nextIndex];
    }

    if (typeof window.SignalTileInsightsRender === 'function') {
      window.SignalTileInsightsRender();
    }

    return { filter: state.filter };
  };
})();
