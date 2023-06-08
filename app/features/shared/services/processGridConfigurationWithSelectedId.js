import {fromJS, Map} from 'immutable';
import {processCachedGridColumns} from '.';

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

function getSetIdentifier(initialState) {
  if (initialState.has('isLocationsStandardsExportLoaded')) {
    return 'dataSource';
  } else if (initialState.has('isVolumeDriverValuesLoaded')) {
    return 'volumeDriverValueSet';
  }
  return 'department';
}

function getSelectedId(state) {
  let selectedId;
  if (state.get('isLocationsStandardsExportLoaded')) {
    selectedId = state.get('dataSource');
  } else if (state.get('selectedVolumeDriverValueSetId')) {
    selectedId = state.get('selectedVolumeDriverValueSetId');
  } else {
    selectedId = state.get('selectedDepartmentId');
  }
  return selectedId;
}

export default function processGridConfigurationWithSelectedId(state, initialState, noFromJS = false) {
  const cachedGridConfig = state.get('cachedGridConfig')?.toJS();
  const selectedId = getSelectedId(state);

  const updatedState = state.withMutations(map =>
    map.set('saveCachedGridConfiguration', true)
      .set('isGridConfigurationProcessed', true));

  const setIdentifier = getSetIdentifier(initialState);

  if (typeof (cachedGridConfig) !== 'object' || !Array.isArray(cachedGridConfig[setIdentifier])) return updatedState;

  let retrievedColumns = cachedGridConfig[setIdentifier]?.find(x => x.id === selectedId);
  if (state.get('isLocationsStandardsExportLoaded')) {
    retrievedColumns = cachedGridConfig[setIdentifier]?.find(x => x.dataSource === selectedId);
  }

  if (!retrievedColumns) return updatedState;

  const {sort, lockedColumns, hiddenColumns, filter} = retrievedColumns;
  let {columns} = retrievedColumns;

  if (!columns?.length) return updatedState;

  columns = initialState.has('isAttributesLoaded') ? columns : applyColumnsCell(updatedState.getIn(['columnOrder', selectedId]), columns);

  return updatedState.withMutations(map => {
    const {finalColumns, finalLockedColumns, finalHiddenColumns, finalFilter, finalSort} =
            processCachedGridColumns(map.getIn(['columnOrder', selectedId]), fromJS(columns), lockedColumns, hiddenColumns, filter, sort);

    const showHiddenButton = finalHiddenColumns ? Boolean(Object.keys(finalHiddenColumns).length) : initialState.get('showHiddenButton');
    const showLockButton = finalLockedColumns ? !initialState.get('lockedColumns').equals(Map(finalLockedColumns)) : initialState.get('showLockButton');

    const updatedHiddenColumns = applyCellForHiddenColumns(map.getIn(['columnOrder', selectedId]), finalHiddenColumns);

    map.setIn(['filters', selectedId], noFromJS ? finalFilter : fromJS(finalFilter))
      .setIn(['sorts', selectedId], noFromJS ? finalSort : fromJS(finalSort))
      .setIn(['columnOrder', selectedId], filterVisibleColumns(finalColumns, hiddenColumns))
      .setIn(['hiddenColumns', selectedId], fromJS(updatedHiddenColumns) ?? initialState.get('hiddenColumns'))
      .setIn(['lockedColumns', selectedId], fromJS(finalLockedColumns) ?? initialState.get('lockedColumns'))
      .setIn(['showHiddenButton', selectedId], showHiddenButton)
      .setIn(['showLockButton', selectedId], showLockButton)
      .setIn(['showResetButton', selectedId], (showHiddenButton || showLockButton) ?? initialState.get('showResetButton'));
  });
}
