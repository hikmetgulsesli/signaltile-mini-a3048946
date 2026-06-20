/**
 * Shared app shell state store for SignalTile Mini.
 */
(function () {
  'use strict';

  const STATUS_CYCLE = {
    ok: 'warn',
    warn: 'down',
    down: 'ok'
  };

  let state = {
    activeSurface: 'operations',
    selectedEntity: null,
    storageStatus: 'clean',
    lastError: null,
    activePanel: 'tiles',
    tiles: [],
    counts: { ok: 0, warn: 0, down: 0 },
    exportedAt: null
  };

  function updateCounts() {
    const counts = { ok: 0, warn: 0, down: 0 };
    for (const tile of state.tiles) {
      if (counts[tile.status] != null) {
        counts[tile.status] += 1;
      }
    }
    state.counts = counts;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  window.SignalTileState = {
    init: function (tiles) {
      state.tiles = tiles.map(function (tile) {
        return {
          id: tile.id,
          label: tile.label,
          status: tile.status || 'ok',
          updatedAt: Date.now()
        };
      });
      updateCounts();
    },

    getState: function () {
      return clone(state);
    },

    cycleTile: function (id) {
      const tile = state.tiles.find(function (t) {
        return t.id === id;
      });
      if (!tile) {
        state.lastError = 'Unknown tile: ' + id;
        updateCounts();
        return false;
      }
      tile.status = STATUS_CYCLE[tile.status] || 'ok';
      tile.updatedAt = Date.now();
      state.lastError = null;
      updateCounts();
      return true;
    },

    setActiveSurface: function (surfaceId) {
      state.activeSurface = surfaceId;
    },

    setActivePanel: function (panelId) {
      state.activePanel = panelId;
    },

    setSelectedEntity: function (entityId) {
      state.selectedEntity = entityId;
    },

    setStorageStatus: function (status) {
      state.storageStatus = status;
    },

    setLastError: function (message) {
      state.lastError = message;
    },

    clearLastError: function () {
      state.lastError = null;
    },

    setExportedAt: function (timestamp) {
      state.exportedAt = timestamp;
    },

    hydrate: function (savedState) {
      if (!savedState || !Array.isArray(savedState.tiles)) {
        state.lastError = 'Saved state is invalid.';
        updateCounts();
        return false;
      }
      state.activeSurface = savedState.activeSurface || state.activeSurface;
      state.selectedEntity = savedState.selectedEntity || null;
      state.activePanel = savedState.activePanel || state.activePanel;
      state.tiles = savedState.tiles
        .filter(function (tile) {
          return tile && typeof tile === 'object' && tile.id && tile.label;
        })
        .map(function (tile) {
          return {
            id: tile.id,
            label: tile.label,
            status: tile.status || 'ok',
            updatedAt: tile.updatedAt || Date.now()
          };
        });
      state.lastError = null;
      updateCounts();
      return true;
    }
  };
})();
