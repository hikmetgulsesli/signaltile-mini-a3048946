/**
 * SignalTile Mini app shell.
 */
(function () {
  'use strict';

  var DEFAULT_TILES = [
    { id: 'api-gateway', label: 'API Gateway', status: 'ok' },
    { id: 'database', label: 'Database', status: 'ok' },
    { id: 'message-queue', label: 'Message Queue', status: 'warn' },
    { id: 'worker-pool', label: 'Worker Pool', status: 'down' }
  ];

  var state;
  var storage;

  function $(selector) {
    return document.querySelector(selector);
  }

  function init() {
    state = window.SignalTileState;
    storage = window.SignalTileStorage;

    var saved = storage.load({ tiles: DEFAULT_TILES });
    var hadCorruption = saved.__error;

    if (saved.tiles && saved.tiles.length > 0) {
      state.hydrate(saved);
    } else {
      state.init(DEFAULT_TILES);
    }

    state.setStorageStatus(hadCorruption ? 'recovered' : 'clean');
    if (hadCorruption) {
      state.setLastError(saved.__error);
    }

    renderTiles();
    renderStatus();
    bindEvents();

    window.app = {
      getState: state.getState,
      cycleTile: cycleTile,
      exportSnapshot: exportSnapshot,
      navigateTo: navigateTo
    };

    window.setfarmStaticReady = true;
  }

  function renderTiles() {
    var panel = $('#tile-panel');
    var current = state.getState();

    panel.innerHTML = current.tiles.map(function (tile) {
      return (
        '<article class="signal-tile status-' + tile.status + '" data-tile-id="' + tile.id + '">' +
          '<header class="tile-header">' +
            '<span class="status-indicator" aria-hidden="true"></span>' +
            '<h2 class="tile-label">' + escapeHtml(tile.label) + '</h2>' +
          '</header>' +
          '<p class="tile-status">' + escapeHtml(tile.status) + '</p>' +
          '<button type="button" class="btn btn-secondary" data-action-id="cycle-' + tile.id + '" onclick="window.app && window.app.cycleTile(\'' + tile.id + '\')">Cycle</button>' +
        '</article>'
      );
    }).join('');
  }

  function renderStatus() {
    var banner = $('#status-banner');
    var current = state.getState();

    if (current.lastError) {
      banner.textContent = 'Recovery: ' + current.lastError;
      banner.className = 'status-banner status-banner--error';
    } else {
      banner.textContent = '';
      banner.className = 'status-banner';
    }
  }

  function cycleTile(id) {
    if (!state.cycleTile(id)) {
      renderStatus();
      return false;
    }
    persist();
    renderTiles();
    renderStatus();
    return true;
  }

  function navigateTo(surfaceId) {
    state.setActiveSurface(surfaceId);
    state.setActivePanel(surfaceId === 'editor' ? 'editor' : 'tiles');
  }

  function exportSnapshot() {
    var current = state.getState();
    current.exportedAt = Date.now();
    state.setExportedAt(current.exportedAt);
    var output = $('#snapshot-output');
    output.textContent = JSON.stringify(current, null, 2);
    return current;
  }

  function persist() {
    var ok = storage.save(state.getState());
    state.setStorageStatus(ok ? 'clean' : 'save_failed');
    if (!ok) {
      state.setLastError('Unable to save to localStorage.');
    }
  }

  function bindEvents() {
    document.body.addEventListener('click', function (event) {
      var target = event.target;
      var actionId = target && target.getAttribute('data-action-id');
      if (!actionId) {
        return;
      }

      if (actionId.indexOf('cycle-') === 0) {
        event.preventDefault();
        var tileId = actionId.replace('cycle-', '');
        cycleTile(tileId);
        return;
      }

      if (actionId === 'export-summary') {
        event.preventDefault();
        exportSnapshot();
        return;
      }

      if (actionId.indexOf('nav-') === 0) {
        event.preventDefault();
        var surfaceId = actionId.replace('nav-', '');
        navigateTo(surfaceId);
      }
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
