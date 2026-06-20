/**
 * Persistence adapter for SignalTile Mini.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'signaltile-mini::state';

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  window.SignalTileStorage = {
    load: function (defaultState) {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return clone(defaultState);
        }
        var parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.tiles)) {
          throw new Error('Corrupted storage shape');
        }
        return parsed;
      } catch (err) {
        var recovered = clone(defaultState);
        recovered.__error = 'Corrupted storage; reset to defaults';
        return recovered;
      }
    },

    save: function (state) {
      try {
        var payload = clone(state);
        delete payload.__error;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        return true;
      } catch (err) {
        return false;
      }
    },

    clear: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
      } catch (err) {
        return false;
      }
    }
  };
})();
