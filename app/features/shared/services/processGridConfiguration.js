import {fromJS, Map} from 'immutable';
import {processCachedGridColumns} from '../services';

function filterVisibleColumns(columns, hiddenColumns) {
  if (!hiddenColumns) return columns;

  // To filter visible columns
  return columns.filter(col => !hiddenColumns[col.get('field')]);
}

function applyColumnsCell(originalColumns, retrievedColumns) {
  const columns = retrievedColumns.map(col => {
    const field = originalColumns.find(c => c.get('field') === col.field);
    if (!field) return col;
    if (field?.has('cell')) {
      col.cell = field.get('cell');
    }
    if (field?.has('filterCell')) {
      col.filterCell = field.get('filterCell');
    }
    return col;
  });
  return columns;
}

/**
 * applyCellForHiddenColumns
 * Applies cell to the hidden columns, which were removed while saving the hidden columns in users grid configuration.
 * @param {*} originalColumns
 * @param {*} hiddenColumns
 * @returns hiddenColumns - updated hiddenColumns
 */
function applyCellForHiddenColumns(originalColumns, hiddenColumns) {
  if (!hiddenColumns) return {};

  for (const item in hiddenColumns) {
    if (item) {
      const field = originalColumns.find(c => c.get('field') === hiddenColumns[item][0].field);
      if (!field) break;
      if (field?.has('cell')) {
        hiddenColumns[item][0].cell = field.get('cell');
      }
      if (field?.has('filterCell')) {
        hiddenColumns[item][0].filterCell = field.get('filterCell');
      }
    }
  }
  return hiddenColumns;
}

function processCachedFilters(filter, columns) {
  for (const f of filter.filters) {
    const filterType = columns.find(col => col.get('field') === f.field)?.get('filter');
    if (f.field && filterType?.toLowerCase() === 'date') {
      f.value = new Date(f.value);
    }
  }
  return filter;
}

export default function processGridConfiguration(state, initialState, noFromJS = false) {
  const cachedGridConfig = state.get('cachedGridConfig')?.toJS();
  const updatedState = state.withMutations(map =>
    map.set('saveCachedGridConfiguration', true)
      .set('isGridConfigurationProcessed', true));

  if (typeof (cachedGridConfig) !== 'object') return updatedState;

  const {sort, lockedColumns, hiddenColumns} = cachedGridConfig;
  let {columns, filter} = cachedGridConfig;

  if (!columns?.length) return updatedState;

  columns = applyColumnsCell(updatedState.get('columnOrder'), columns);
  if (filter) filter = processCachedFilters(filter, updatedState.get('columnOrder'));

  return updatedState.withMutations(map => {

    const {finalColumns, finalLockedColumns, finalHiddenColumns, finalFilter, finalSort} =
      processCachedGridColumns(map.get('columnOrder'), fromJS(columns), lockedColumns, hiddenColumns, filter, sort);

    const showHiddenButton = finalHiddenColumns ? Boolean(Object.keys(finalHiddenColumns).length) : initialState.get('showHiddenButton');
    const showLockButton = finalLockedColumns ? !initialState.get('lockedColumns').equals(Map(finalLockedColumns)) : initialState.get('showLockButton');
    const updatedHiddenColumns = applyCellForHiddenColumns(map.get('columnOrder'), finalHiddenColumns);

    // applicable for location module only
    if (updatedState.has('isLocationsLoaded')) {
      const hasFilter = finalFilter?.filters?.length;
      let hasSort;
      if (finalSort) {
        hasSort = Object.keys(finalSort).length;
      }
      map.set('hasFilterSortApplied', (hasFilter || hasSort));
    }

    map.set('filter', noFromJS ? finalFilter : fromJS(finalFilter))
      .set('sort', noFromJS ? finalSort : fromJS(finalSort))
      .set('columnOrder', filterVisibleColumns(finalColumns, hiddenColumns))
      .set('hiddenColumns', fromJS(updatedHiddenColumns) ?? initialState.get('hiddenColumns'))
      .set('lockedColumns', fromJS(finalLockedColumns) ?? initialState.get('lockedColumns'))
      .set('showHiddenButton', showHiddenButton)
      .set('showLockButton', showLockButton)
      .set('showResetButton', (showHiddenButton || showLockButton) ?? initialState.get('showResetButton'));
  });
}
