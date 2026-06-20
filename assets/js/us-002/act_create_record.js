/**
 * SignalTile Records shared state and ACT_CREATE_RECORD handler.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'signaltile-mini::records';
  var DEFAULT_RECORDS = [
    { id: 'api-gateway', name: 'API Gateway', description: 'Core API gateway record', status: 'ok', tags: 'prod, api', updatedAt: Date.now() },
    { id: 'database', name: 'Database', description: 'Primary database record', status: 'ok', tags: 'prod, database', updatedAt: Date.now() },
    { id: 'message-queue', name: 'Message Queue', description: 'Async message queue record', status: 'warn', tags: 'prod, queue', updatedAt: Date.now() },
    { id: 'worker-pool', name: 'Worker Pool', description: 'Background worker pool record', status: 'down', tags: 'prod, workers', updatedAt: Date.now() }
  ];

  function clone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (err) {
      return value;
    }
  }

  function generateId() {
    return 'rec-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function loadRecords() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_RECORDS);
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('Invalid records shape');
      return parsed;
    } catch (err) {
      return clone(DEFAULT_RECORDS);
    }
  }

  function saveRecords(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return true;
    } catch (err) {
      return false;
    }
  }

  var recordsState = {
    records: loadRecords(),
    searchQuery: '',
    selectedRecordId: null,
    page: 0,
    pageSize: 3,
    loadError: null
  };

  function getFilteredRecords() {
    var query = (recordsState.searchQuery || '').toLowerCase();
    return recordsState.records.filter(function (r) {
      return !query ||
        (r.name || '').toLowerCase().indexOf(query) !== -1 ||
        (r.description || '').toLowerCase().indexOf(query) !== -1 ||
        (r.tags || '').toLowerCase().indexOf(query) !== -1;
    });
  }

  function getPagedRecords() {
    var filtered = getFilteredRecords();
    var start = recordsState.page * recordsState.pageSize;
    return filtered.slice(start, start + recordsState.pageSize);
  }

  function getTotalPages() {
    return Math.max(1, Math.ceil(getFilteredRecords().length / recordsState.pageSize));
  }

  function createRecord(data) {
    var record = {
      id: generateId(),
      name: (data && data.name) || 'New Record',
      description: (data && data.description) || '',
      status: (data && data.status) || 'ok',
      tags: (data && data.tags) || '',
      updatedAt: Date.now()
    };
    recordsState.records.unshift(record);
    recordsState.selectedRecordId = record.id;
    saveRecords(recordsState.records);
    return clone(record);
  }

  function updateRecord(id, data) {
    var record = recordsState.records.find(function (r) { return r.id === id; });
    if (!record) return null;
    if (data.name !== undefined) record.name = data.name;
    if (data.description !== undefined) record.description = data.description;
    if (data.status !== undefined) record.status = data.status;
    if (data.tags !== undefined) record.tags = data.tags;
    record.updatedAt = Date.now();
    saveRecords(recordsState.records);
    return clone(record);
  }

  function cycleRecordStatus(id) {
    var STATUS_CYCLE = { ok: 'warn', warn: 'down', down: 'ok' };
    var record = recordsState.records.find(function (r) { return r.id === id; });
    if (!record) return null;
    record.status = STATUS_CYCLE[record.status] || 'ok';
    record.updatedAt = Date.now();
    saveRecords(recordsState.records);
    return clone(record);
  }

  function selectRecord(id) {
    recordsState.selectedRecordId = id || null;
    return recordsState.selectedRecordId ? getSelectedRecord() : null;
  }

  function getSelectedRecord() {
    return recordsState.records.find(function (r) { return r.id === recordsState.selectedRecordId; }) || null;
  }

  function setSearchQuery(query) {
    recordsState.searchQuery = (query || '').toLowerCase();
    recordsState.page = 0;
  }

  function setPage(page) {
    recordsState.page = Math.max(0, Math.min(page, getTotalPages() - 1));
  }

  function retryLoad() {
    recordsState.records = loadRecords();
    recordsState.loadError = null;
    return recordsState.records.length;
  }

  function clearRecords() {
    recordsState.records = clone(DEFAULT_RECORDS);
    saveRecords(recordsState.records);
  }

  window.SignalTileRecords = {
    getState: function () { return clone(recordsState); },
    getFilteredRecords: function () { return clone(getFilteredRecords()); },
    getPagedRecords: function () { return clone(getPagedRecords()); },
    getTotalPages: getTotalPages,
    getSelectedRecord: function () { return clone(getSelectedRecord()); },
    createRecord: createRecord,
    updateRecord: updateRecord,
    cycleRecordStatus: cycleRecordStatus,
    selectRecord: selectRecord,
    setSearchQuery: setSearchQuery,
    setPage: setPage,
    retryLoad: retryLoad,
    clearRecords: clearRecords
  };

  window.SignalTileActions = window.SignalTileActions || {};
  window.SignalTileActions.createRecord = function (data) {
    var record = createRecord(data);
    return record;
  };
})();
