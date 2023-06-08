import {fromJS, List, Map} from 'immutable';
import {modelsArrayToMapById, reorderGridAndSidebarColumns, processGridConfigurationWithSelectedId} from '../../../shared/services';
import {addValueToCharacteristic} from '../../services';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions';
import {CHARACTERISTICS_EXPORTER, BULK_UPDATE_CHARACTERISTICS, CHARACTERISTICS_IMPORTER} from '../../../shared/constants/backgroundJobs';
import {MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS} from '../../constants/columnConfiguration';
import {
  LOAD_CHARACTERISTICS_PAGE,
  LOAD_CHARACTERISTICS_LIST_REJECTED,
  LOAD_CHARACTERISTIC_SETS_LIST_PENDING,
  LOAD_CHARACTERISTIC_SETS_LIST_FULFILLED,
  LOAD_CHARACTERISTIC_SETS_LIST_REJECTED,
  CREATE_CHARACTERISTIC_FULFILLED,
  DELETE_CHARACTERISTIC_FULFILLED,
  UPDATE_CHARACTERISTIC_FULFILLED,
  SELECT_CHARACTERISTIC,
  CLEAR_SELECTED_CHARACTERISTIC,
  CLOSE_CHARACTERISTICS_LIST_EDIT_SIDEBAR,
  CREATE_CHARACTERISTIC_SET_FULFILLED,
  UPDATE_CHARACTERISTIC_SET_FULFILLED,
  DELETE_CHARACTERISTIC_SET_FULFILLED,
  RENAME_CHARACTERISTIC_FULFILLED,
  SELECT_BULK_CHARACTERISTIC,
  TOGGLE_CHARACTERISTIC_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
  TOGGLE_CHARACTERISTIC_CONFIGURE_COLUMN_VISIBILITY_FULFILLED,
  PAGE_CHARACTERISTICS_LIST,
  BULK_UPDATE_CHARACTERISTICS_FULFILLED,
  TOGGLE_CHARACTERISTICS_COLUMN_LOCK,
  TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_FULFILLED,
  LOAD_CHARACTERISTICS_COLUMNS,
  REORDER_CHARACTERISTICS_COLUMN,
  RESET_LOCKED_CHARACTERISTICS_COLUMNS_FULFILLED,
  SHOW_HIDDEN_CHARACTERISTICS_COLUMNS_FULFILLED,
  RESET_CHARACTERISTICS_COLUMNS_FULFILLED,
  CREATE_CHARACTERISTIC_SET_PENDING,
  DELETE_CHARACTERISTIC_SET_PENDING,
  UPDATE_CHARACTERISTIC_SET_PENDING,
  CREATE_CHARACTERISTIC_SET_REJECTED,
  UPDATE_CHARACTERISTIC_SET_REJECTED,
  DELETE_CHARACTERISTIC_SET_REJECTED,
  LOAD_CHARACTERISTICS_LIST_FULFILLED,
  CANCEL_COLUMN_REORDER,
  CLEAR_CHARACTERISTICS_LIST_SORTS_FULFILLED,
  CLEAR_CHARACTERISTICS_LIST_FILTERS_FULFILLED,
  SORT_CHARACTERISTICS_LIST_FULFILLED,
  FILTER_CHARACTERISTICS_LIST_FULFILLED,
  TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_PENDING,
  TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_REJECTED,
  TOGGLE_CHARACTERISTIC_CONFIGURE_COLUMN_VISIBILITY_PENDING,
  TOGGLE_CHARACTERISTIC_CONFIGURE_COLUMN_VISIBILITY_REJECTED,
  LOAD_CHARACTERISTICS_LIST_PENDING,
  SET_ALL_CHARACTERISTICS_SELECTED,
} from '../../actions';
import {nonReorderableColumns} from '../../../shared/constants/nonReorderableColumns';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected} from '../../../customizableGrid/services/gridActionBuilder';
import {CHARACTERISTICS as CHARACTERISTICS} from '../../../customizableGrid/constants/grids';
import _ from 'lodash';

const defaultLockedColumnsState = Map({'name': true, 'definition': true});
const CHARACTERISTICS_UPDATE_CACHED_GRID_CONFIGURATION = 'CHARACTERISTICS_UPDATE_CACHED_GRID_CONFIGURATION';
const noFromJS = true;

const initialState = fromJS({
  loading: false,
  characteristics: new Map(),
  characteristicSets: List(),
  selectedCharacteristicId: null,
  selectedBulkEditCharacteristicId: null,
  selectedCharacteristicSetId: null,
  selectedBulkEditCharacteristicSetId: null,
  selectedDepartmentId: null,
  showGridConfiguration: false,
  columnOrder: new List(),
  headerSelectionValue: false,
  hiddenColumns: new Map(),
  skip: 0,
  activeBackgroundJobs: false,
  activeBulkEditBackgroundJob: false,
  lockedColumns: defaultLockedColumnsState,
  showResetButton: Map(),
  showHiddenButton: Map(),
  showLockButton: Map(),
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  cachedGridConfig: Map(),
  isCharacteristicsLoaded: false,
  isGridConfigurationProcessed: false,
  saveCachedGridConfiguration: false,
  isCachedGridConfigurationRetrieved: false,
  filters: new Map(),
  sorts: new List(),
  hasFilterSort: false,
  visibleAndLockedCharacteristicSets: Map(),
  shouldReloadCharacteristicList: false,
  hiddenCharacteristicSetIds: List(),
  shouldUseVisibleAndLockedCharacteristicSets: Map(),
  isCharacteristicSetDeleted: false,
});

function getIndexOfCharacteristicSet(characteristicSets, field) {
  let characteristicSetField;
  characteristicSets.forEach(c => {
    if (c.get('id').toString() === field) {
      characteristicSetField = c.get('id');
    }
  });
  return characteristicSets.findIndex(c => c.get('id') === characteristicSetField);
}

function removeFilterAndSortsOnColumnHide(state, field) {
  return state.withMutations(map => {
    const handleFilter = map => {
      if (map.getIn(['filters', state.get('selectedDepartmentId')])) {
        const filterIndex = map.getIn(['filters', state.get('selectedDepartmentId'), 'filters']).findIndex(value => value.field === field);
        if (filterIndex !== -1) {
          return map.deleteIn(['filters', state.get('selectedDepartmentId'), 'filters', filterIndex]);
        }
      }
      return map;
    };
    const handleSort = map => {
      if (map.getIn(['sorts', state.get('selectedDepartmentId')])) {
        const sortIndex = map.getIn(['sorts', state.get('selectedDepartmentId')]).findIndex(value => value.field === field);
        if (sortIndex !== -1) {
          return map.deleteIn(['sorts', state.get('selectedDepartmentId'), sortIndex]);
        }
      }
      return map;
    };
    handleSort(handleFilter(map));
  });
}

function updateColumnOrder(columnOrder, characteristicSets) {
  const fieldToRemove = characteristicSets.filter(col => !col.get('visibleColumn')).map(col => col.get('id').toString());
  return columnOrder.filter(col => !fieldToRemove?.includes(col.get('field')));
}

function getVisibleAndLockedCharacteristicSets(characteristicSets) {
  return characteristicSets.filter(col => col.get('visibleColumn') || col.get('disabled'));
}

function processAllowedCharacteristicSets(state, cachedColumnGridConfig) {
  const selectedDepartmentId = state.get('selectedDepartmentId');
  let cachedVisibleAndLockedCharacteristicSets = cachedColumnGridConfig?.get('visibleAndLockedCharacteristicSets') ?? Map();
  const visibleAndLockedCharacteristicSets = state.getIn(['visibleAndLockedCharacteristicSets', selectedDepartmentId]);
  cachedVisibleAndLockedCharacteristicSets = state.getIn(['shouldUseVisibleAndLockedCharacteristicSets', selectedDepartmentId]) ? fromJS(visibleAndLockedCharacteristicSets) : cachedVisibleAndLockedCharacteristicSets;

  // If stored characteristic set get deleted then, It will help to get maxVisibleColumnSize correctly.
  const availableSetIds = state.getIn(['characteristicSets', selectedDepartmentId]).map(x => x.get('id'));
  cachedVisibleAndLockedCharacteristicSets = cachedVisibleAndLockedCharacteristicSets.filter(x => availableSetIds.includes(x.get('id')));

  let cachedHiddenCharacteristicSetIds = cachedColumnGridConfig?.get('hiddenCharacteristicSetIds') ?? List();
  const hiddenCharacteristicSetIds = state.getIn(['hiddenCharacteristicSetIds', selectedDepartmentId]);
  cachedHiddenCharacteristicSetIds = hiddenCharacteristicSetIds?.size ? fromJS(hiddenCharacteristicSetIds) : cachedHiddenCharacteristicSetIds;

  let maxVisibleColumnSize = (MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS - cachedVisibleAndLockedCharacteristicSets?.size ?? 0);

  if (!cachedVisibleAndLockedCharacteristicSets || !cachedVisibleAndLockedCharacteristicSets?.size) {
    return state.withMutations(map => {
      map.updateIn(['characteristicSets', selectedDepartmentId], cs => cs.map(cc => {

        if (cachedHiddenCharacteristicSetIds.includes(cc.get('id'))) return cc.set('visibleColumn', false);

        if (maxVisibleColumnSize) {
          maxVisibleColumnSize--;
          return cc.set('visibleColumn', true);
        }

        return cc.set('visibleColumn', false);
      }));
      const updatedColumnOrder = updateColumnOrder(map.getIn(['columnOrder', selectedDepartmentId]), map.getIn(['characteristicSets', selectedDepartmentId]));
      map.setIn(['columnOrder', selectedDepartmentId], updatedColumnOrder);
      const updatedVisibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', selectedDepartmentId]));
      map.setIn(['visibleAndLockedCharacteristicSets', selectedDepartmentId], updatedVisibleAndLockedCharacteristicSets)
        .setIn(['shouldUseVisibleAndLockedCharacteristicSets', selectedDepartmentId], true);
    });
  }

  return state.withMutations(map => {

    map.updateIn(['characteristicSets', selectedDepartmentId], cs => cs.map(cc => {
      const column = cachedVisibleAndLockedCharacteristicSets?.find(col => col.get('id') === cc.get('id'));

      if (column) return cc.set('visibleColumn', column.get('visibleColumn')).set('disabled', column.get('disabled'));

      if (!map.get('isCharacteristicSetDeleted') && !cachedHiddenCharacteristicSetIds.includes(cc.get('id')) && maxVisibleColumnSize) {
        maxVisibleColumnSize--;
        return cc.set('visibleColumn', true);
      }

      return cc.set('visibleColumn', false);
    }));

    const updatedColumnOrder = updateColumnOrder(map.getIn(['columnOrder', selectedDepartmentId]), map.getIn(['characteristicSets', selectedDepartmentId]));
    const updatedVisibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', selectedDepartmentId]));
    map.setIn(['visibleAndLockedCharacteristicSets', selectedDepartmentId], updatedVisibleAndLockedCharacteristicSets);
    map.setIn(['columnOrder', selectedDepartmentId], updatedColumnOrder)
      .set('isCharacteristicSetDeleted', false)
      .setIn(['shouldUseVisibleAndLockedCharacteristicSets', selectedDepartmentId], true);
  });
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHARACTERISTICS_PAGE:
    case LOAD_CHARACTERISTIC_SETS_LIST_PENDING:
      return state.withMutations(map =>
        map.set('loading', true)
          .set('isCharacteristicsLoaded', false)
          .set('saveCachedGridConfiguration', false));


    case LOAD_CHARACTERISTIC_SETS_LIST_FULFILLED: {
      const {departmentId, characteristicsSet} = action.payload.data;
      const updatedCharacteristicSets = characteristicsSet.map(characteristicSet => {
        characteristicSet.visibleColumn = true;
        return characteristicSet;
      });

      return state.withMutations(map =>
        map.set('selectedDepartmentId', departmentId)
          .setIn(['characteristicSets', departmentId], fromJS(updatedCharacteristicSets))
          .setIn(['columnOrder', departmentId], initialState.get('columnOrder'))
          .setIn(['lockedColumns', departmentId], defaultLockedColumnsState)
          .setIn(['hiddenColumns', departmentId], initialState.get('hiddenColumns'))
          .set('isCharacteristicsLoaded', true)
          .set('isGridConfigurationProcessed', false))
        .setIn(['shouldUseVisibleAndLockedCharacteristicSets', departmentId], false);
    }

    case LOAD_CHARACTERISTICS_LIST_PENDING:
      return state.withMutations(map => {
        if (map.get('shouldReloadCharacteristicList')) map.set('shouldReloadCharacteristicList', false);
        map.set('saving', true);
      });

    case LOAD_CHARACTERISTICS_LIST_FULFILLED:
      return state.withMutations(map => {
        if (state.get('hasFilterSort')) {
          map.set('loading', true)
            .set('hasFilterSort', false)
            .set('shouldReloadCharacteristicList', true);
        } else {
          map.set('loading', false);
        }
        map.set('saving', false);
      });

    case LOAD_CHARACTERISTICS_LIST_REJECTED:
    case LOAD_CHARACTERISTIC_SETS_LIST_REJECTED: {
      return state.withMutations(map =>
        map.set('loading', false)
          .set('saving', false)
      );
    }

    case TOGGLE_CHARACTERISTIC_GRID_CONFIGURATION_SIDEBAR_FULFILLED:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case CREATE_CHARACTERISTIC_FULFILLED:
    case UPDATE_CHARACTERISTIC_FULFILLED: {
      const {data} = action.payload;
      return state.withMutations(map =>
        map.setIn(['characteristics', data.id], fromJS(data)));
    }

    case PAGE_CHARACTERISTICS_LIST:
      return state.set('skip', action.payload);


    case DELETE_CHARACTERISTIC_FULFILLED:
      return state.withMutations(map => {
        map.deleteIn(['characteristics', action.payload.data]);
      });

    case SELECT_CHARACTERISTIC: {
      const {characteristic, characteristicSetId} = action.payload;
      return state.withMutations(map =>
        map
          .set('selectedCharacteristicId', characteristic.get('id'))
          .set('selectedCharacteristicSetId', characteristicSetId)
      );
    }

    case SELECT_BULK_CHARACTERISTIC: {
      const {characteristicSetId, characteristic} = action.payload;
      return state.withMutations(map =>
        map
          .set('selectedBulkEditCharacteristicId', characteristicSetId)
          .set('selectedBulkEditCharacteristicSetId', characteristicSetId)
          .set('characteristic', characteristic)
      );
    }

    case RENAME_CHARACTERISTIC_FULFILLED: {
      const {id, name} = JSON.parse(action.payload.config.data);
      return state.setIn(['characteristics', id, 'name'], name);
    }

    case TOGGLE_CHARACTERISTIC_CONFIGURE_COLUMN_VISIBILITY_PENDING:
      return state.set('loading', true);

    case TOGGLE_CHARACTERISTIC_CONFIGURE_COLUMN_VISIBILITY_FULFILLED: {
      const {field, visibility} = action.payload;
      const characteristicSetsHiddenColumns = state.getIn(['hiddenColumns', state.get('selectedDepartmentId')]);

      let updatedState = state;
      if (!visibility) {
        const fieldName = updatedState.getIn(['characteristicSets', updatedState.get('selectedDepartmentId')]).find(col => col.get('name') === field)?.get('id');
        updatedState = removeFilterAndSortsOnColumnHide(updatedState, fieldName.toString());
      }

      return updatedState.withMutations(map => {
        const index = map.getIn(['characteristicSets', map.get('selectedDepartmentId')]).findIndex(c => c.get('name') === field);
        let showHiddenButton = state.getIn(['showLockButton', state.get('selectedDepartmentId')]);

        if (characteristicSetsHiddenColumns?.size) {
          characteristicSetsHiddenColumns.forEach(column => {
            const col = column.find(c => c.get('title'));
            if (col.get('title') === field) {
              if (!visibility) {
                map.deleteIn(['hiddenColumns', map.get('selectedDepartmentId'), col.get('field')]);
                showHiddenButton = characteristicSetsHiddenColumns.size === 1 ? false : showHiddenButton;
              }
            }
          });
        }
        map.setIn(['characteristicSets', state.get('selectedDepartmentId'), index, 'visibleColumn'], visibility)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], showHiddenButton)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], showHiddenButton || state.getIn(['showLockButton', state.get('selectedDepartmentId')]))
          .setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .set('isGridConfigurationProcessed', false)
          .set('saveCachedGridConfiguration', false);
        const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
        map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
        map.setIn(['hiddenCharacteristicSetIds', state.get('selectedDepartmentId')], map.getIn(['characteristicSets', state.get('selectedDepartmentId')])?.filter(col => !col.get('visibleColumn')).map(col => col.get('id')));
      });
    }

    case TOGGLE_CHARACTERISTIC_CONFIGURE_COLUMN_VISIBILITY_REJECTED:
      return state.set('loading', false);

    case TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_PENDING:
      return state.set('loading', true);

    case TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_FULFILLED: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();
      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', state.get('selectedDepartmentId'), action.payload.field]);
          map.setIn(['showHiddenButton', state.get('selectedDepartmentId')], state.getIn(['hiddenColumns', state.get('selectedDepartmentId')]).size > 1)
            .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]) || map.getIn(['showLockButton', state.get('selectedDepartmentId')]))
            .setIn(['columnOrder', state.get('selectedDepartmentId')], toggleColumnsList);
        });
      }
      const updatedState = removeFilterAndSortsOnColumnHide(state, action.payload.field);

      return updatedState.withMutations(map =>
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId'), action.payload.field], action.payload.selectedColumn)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], true)
          .setIn(['columnOrder', state.get('selectedDepartmentId')], toggleColumnsList)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')])));
    }

    case TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_REJECTED:
      return state.set('loading', false);

    case TOGGLE_CHARACTERISTICS_COLUMN_LOCK: {
      const {finalColumns, value} = action.payload;
      const finalColumnsOrder = (finalColumns) ? finalColumns : new List();
      const index = getIndexOfCharacteristicSet(state.getIn(['characteristicSets', state.get('selectedDepartmentId')]), action.payload.field);

      return state.withMutations(map => {
        if (index !== -1) map.setIn(['characteristicSets', state.get('selectedDepartmentId'), index, 'disabled'], value);
        if (action.payload.value) {
          map.setIn(['lockedColumns', state.get('selectedDepartmentId'), action.payload.field], action.payload.value);
          map.setIn(['columnOrder', state.get('selectedDepartmentId')], finalColumnsOrder);
        } else {
          map.deleteIn(['lockedColumns', state.get('selectedDepartmentId'), action.payload.field]);
          map.setIn(['columnOrder', state.get('selectedDepartmentId')], finalColumnsOrder);
        }
        if (map.getIn(['lockedColumns', state.get('selectedDepartmentId')]).equals(defaultLockedColumnsState)) {
          map.setIn(['showLockButton', state.get('selectedDepartmentId')], false);
        } else {
          map.setIn(['showLockButton', state.get('selectedDepartmentId')], true);
        }
        map.setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showLockButton', state.get('selectedDepartmentId')]) || map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]));
        const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', map.get('selectedDepartmentId')]));
        map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
      });
    }

    case REORDER_CHARACTERISTICS_COLUMN: {
      const {columnKey, oldIndex, newIndex} = action.payload;
      const columns = state.getIn(['columnOrder', state.get('selectedDepartmentId')]);

      // For avoiding reorder on hidden columns
      const lastOrderIndex = _.maxBy(columns.toJS(), 'orderIndex').orderIndex;

      const destinationColumn = columns.find(c => c.get('orderIndex') === newIndex);
      const sourceColumn = columns.find(c => c.get('orderIndex') === oldIndex);

      if (lastOrderIndex < newIndex ||
        nonReorderableColumns.includes(sourceColumn.get('field')) ||
        nonReorderableColumns.includes(destinationColumn.get('field')) ||
      (!columns.first().get('lockable') &&
      destinationColumn.get('locked') && !sourceColumn.get('locked'))) return state;

      if (!state.get('showColumnReorderConfirmModal') &&
      ((destinationColumn.get('locked') && !sourceColumn.get('locked')) ||
      sourceColumn.get('locked') && !destinationColumn.get('locked'))) {
        return state.withMutations(map => {
          map.set('showColumnReorderConfirmModal', true)
            .set('reorderedColumnDetail', sourceColumn)
            .set('lastReorderedColumnModel', {columnKey, oldIndex, newIndex});
        });
      }

      const reorderedColumns = reorderGridAndSidebarColumns(columnKey, oldIndex, newIndex, columns.toJS());
      const index = getIndexOfCharacteristicSet(state.getIn(['characteristicSets', state.get('selectedDepartmentId')]), columnKey);

      return state.withMutations(map => {
        if (index !== -1 && !sourceColumn.get('locked') && destinationColumn.get('locked')) {
          map.setIn(['characteristicSets', state.get('selectedDepartmentId'), index, 'disabled'], true);
          const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
          map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
        }
        if (index !== -1 && sourceColumn.get('locked') && !destinationColumn.get('locked')) {
          map.setIn(['characteristicSets', state.get('selectedDepartmentId'), index, 'disabled'], false);
          const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
          map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
        }
        map.setIn(['columnOrder', map.get('selectedDepartmentId')], fromJS(reorderedColumns));
        if (destinationColumn.get('locked')) map.setIn(['lockedColumns', map.get('selectedDepartmentId'), columnKey], true);
        if (sourceColumn.get('locked') && !destinationColumn.get('locked')) map.deleteIn(['lockedColumns', map.get('selectedDepartmentId'), columnKey]);
        map.setIn(['showResetButton', state.get('selectedDepartmentId')], !map.getIn(['lockedColumns', map.get('selectedDepartmentId')]).equals(defaultLockedColumnsState) || map.getIn(['hiddenColumns', map.get('selectedDepartmentId')])?.size)
          .setIn(['showLockButton', map.get('selectedDepartmentId')], !map.getIn(['lockedColumns', map.get('selectedDepartmentId')]).equals(defaultLockedColumnsState))
          .set('showColumnReorderConfirmModal', false);
      });
    }

    case SHOW_HIDDEN_CHARACTERISTICS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showLockButton', state.get('selectedDepartmentId')]))
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false);
      });

    case RESET_LOCKED_CHARACTERISTICS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', map.get('selectedDepartmentId'), x]));
        map.setIn(['showHiddenButton', state.get('selectedDepartmentId')], map.getIn(['hiddenColumns', map.get('selectedDepartmentId')])?.size)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]));
        const characteristicSets = map.getIn(['characteristicSets', state.get('selectedDepartmentId')]);
        map.setIn(['characteristicSets', state.get('selectedDepartmentId')], characteristicSets.map(characteristicSet => characteristicSet.set('disabled', false)));
        const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
        map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
      });

    case RESET_CHARACTERISTICS_COLUMNS_FULFILLED: {
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'));
        map.setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], false)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
        const characteristicSets = map.getIn(['characteristicSets', state.get('selectedDepartmentId')]);
        map.setIn(['characteristicSets', state.get('selectedDepartmentId')], characteristicSets.map(characteristicSet => characteristicSet.set('disabled', false)));
        const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
        map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
      });
    }

    case CLEAR_SELECTED_CHARACTERISTIC:
    case CLOSE_CHARACTERISTICS_LIST_EDIT_SIDEBAR:
      return state.withMutations(map =>
        map
          .set('selectedCharacteristicId', null)
          .set('selectedCharacteristicSetId', null)
      );

    case CREATE_CHARACTERISTIC_SET_PENDING:
    case UPDATE_CHARACTERISTIC_SET_PENDING:
    case DELETE_CHARACTERISTIC_SET_PENDING: {
      return state.withMutations(map =>
        map.set('saving', true)
          .set('saveCachedGridConfiguration', false)
      );
    }

    case CREATE_CHARACTERISTIC_SET_REJECTED:
    case UPDATE_CHARACTERISTIC_SET_REJECTED:
    case DELETE_CHARACTERISTIC_SET_REJECTED: {
      return state.withMutations(map =>
        map.set('saving', false)
          .set('saveCachedGridConfiguration', true)
      );
    }

    case CREATE_CHARACTERISTIC_SET_FULFILLED: {
      const {characteristicSet, characteristicValues} = action.payload.data;

      const visibleSetColumnsCount = state.getIn(['characteristicSets', state.get('selectedDepartmentId')]).filter(e => e.get('visibleColumn')).size;

      return state.withMutations(map => {
        if (characteristicSet.default) {
          map.updateIn(['characteristicSets', map.get('selectedDepartmentId')], cs =>
            cs.map(cc => cc.set('default', false))
          );
        }

        if (visibleSetColumnsCount < MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS) {
          characteristicSet.visibleColumn = true;
        }

        if (visibleSetColumnsCount >= MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS && characteristicSet.default) {
          const col = map.getIn(['columnOrder', map.get('selectedDepartmentId')]).filter(e => !e.get('locked')).last().get('title');
          const lastVisibleColumn = map.getIn(['characteristicSets', map.get('selectedDepartmentId')]).filter(e => e.get('visibleColumn') && e.get('name') === col).last();

          map.updateIn(['characteristicSets', state.get('selectedDepartmentId')], cs => {
            const index = cs.findIndex(cc => cc.get('id') === lastVisibleColumn.get('id'));
            let column = cs.get(index);
            column = column.set('visibleColumn', false);
            return cs.set(index, column);
          });
        }

        map.updateIn(['characteristicSets', state.get('selectedDepartmentId')], cs => {
          characteristicSet.visibleColumn = visibleSetColumnsCount >= MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS && characteristicSet.default ? true : Boolean(visibleSetColumnsCount < MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS);
          return cs.push(fromJS(characteristicSet));
        }
        );
        const characteristicValuesByCharacteristicId = modelsArrayToMapById(
          characteristicValues,
          'characteristicId'
        );
        map.update('characteristics', characteristics =>
          characteristics.map(characteristic =>
            addValueToCharacteristic(
              characteristic,
              characteristicValuesByCharacteristicId
            )
          )
        );
        const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
        map.setIn(['hiddenCharacteristicSetIds', state.get('selectedDepartmentId')], map.getIn(['characteristicSets', state.get('selectedDepartmentId')])?.filter(col => !col.get('visibleColumn')).map(col => col.get('id')));
        map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
        map.set('saving', false)
          .set('isGridConfigurationProcessed', false)
          .setIn(['columnOrder', map.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'));
      });
    }

    case UPDATE_CHARACTERISTIC_SET_FULFILLED: {
      const characteristicSet = action.payload.data;

      const visibleColumnsSize = state.getIn(['characteristicSets', state.get('selectedDepartmentId')]).filter(e => e.get('id') === characteristicSet.id && e.get('visibleColumn')).size;
      const visibleSetColumnsCount = state.getIn(['characteristicSets', state.get('selectedDepartmentId')]).filter(e => e.get('visibleColumn')).size;

      return state.withMutations(map => {
        if (characteristicSet.default) {
          map.updateIn(['characteristicSets', state.get('selectedDepartmentId')], cs =>
            cs.map(cc => cc.set('default', false))
          );
        }

        if (!visibleColumnsSize) {
          if (visibleSetColumnsCount >= MAX_ALLOWED_CHARACTERISTIC_SETS_COLUMNS && characteristicSet.default) {
            const col = map.getIn(['columnOrder', map.get('selectedDepartmentId')]).filter(e => !e.get('locked')).last().get('title');
            const lastVisibleColumn = map.getIn(['characteristicSets', map.get('selectedDepartmentId')]).filter(e => e.get('visibleColumn') && e.get('name') === col).last();
            map.updateIn(['characteristicSets', state.get('selectedDepartmentId')], cs => {
              const index = cs.findIndex(cc => cc.get('id') === lastVisibleColumn.get('id'));
              let column = cs.get(index);
              column = column.set('visibleColumn', false);
              return cs.set(index, column);
            });
          }
        }

        map.updateIn(['characteristicSets', state.get('selectedDepartmentId')], cs => {
          const index = cs.findIndex(
            cc => cc.get('id') === characteristicSet.id
          );
          const beforeUpdateCharacteristicSet = cs.get(index);
          characteristicSet.visibleColumn = characteristicSet.default ? true : beforeUpdateCharacteristicSet.get('visibleColumn');
          return cs.set(index, fromJS(characteristicSet));
        });

        const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
        map.setIn(['visibleAndLockedCharacteristicSets', state.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
        map.set('saving', false)
          .set('isGridConfigurationProcessed', false)
          .setIn(['columnOrder', map.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'));
      });
    }

    case DELETE_CHARACTERISTIC_SET_FULFILLED: {
      const {
        characteristicSetId,
        newDefaultCharacteristicSetId,
      } = action.payload.data;

      return state.withMutations(map => {
        map.update('characteristics', characteristics =>
          characteristics.map(characteristic =>
            characteristic.update(
              'characteristicSetValues',
              characteristicSetValues => {
                const deletedIndex = characteristicSetValues.findIndex(
                  v => v.get('characteristicSetId') === characteristicSetId
                );
                return deletedIndex >= 0
                  ? characteristicSetValues.delete(deletedIndex)
                  : characteristicSetValues;
              }
            )
          )
        );

        map.updateIn(['characteristicSets', state.get('selectedDepartmentId')], characteristicSets => {
          let tempCharacteristicSets = characteristicSets;

          if (newDefaultCharacteristicSetId) {
            const newDefaultIndex = tempCharacteristicSets.findIndex(
              tcs => tcs.get('id') === newDefaultCharacteristicSetId
            );
            tempCharacteristicSets = tempCharacteristicSets.setIn(
              [newDefaultIndex, 'default'],
              true
            );
          }

          const deletedIndex = tempCharacteristicSets.findIndex(
            tcs => tcs.get('id') === characteristicSetId
          );
          return tempCharacteristicSets.delete(deletedIndex);
        });
        const visibleAndLockedCharacteristicSets = getVisibleAndLockedCharacteristicSets(map.getIn(['characteristicSets', state.get('selectedDepartmentId')]));
        map.set('saving', false)
          .set('isGridConfigurationProcessed', false)
          .set('isCharacteristicSetDeleted', true)
          .setIn(['columnOrder', map.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .setIn(['visibleAndLockedCharacteristicSets', map.get('selectedDepartmentId')], visibleAndLockedCharacteristicSets);
      });
    }


    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(CHARACTERISTICS_EXPORTER) || backgroundJobTypes.includes(BULK_UPDATE_CHARACTERISTICS) ||
      backgroundJobTypes.includes(CHARACTERISTICS_IMPORTER)) {
        return state.withMutations(map => {
          map.set('activeBackgroundJobs', activeJobs);
        });
      }

      return state;
    }

    case BULK_UPDATE_CHARACTERISTICS_FULFILLED: {
      const {backgrounded} = action.payload.data;

      return state.withMutations(map => {
        map.set('activeBulkEditBackgroundJob', backgrounded);
      });
    }

    case LOAD_CHARACTERISTICS_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], columns);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isCharacteristicsLoaded') && !state.get('isGridConfigurationProcessed')) {
        const selectedDepartmentCachedGridConfig = state.get('cachedGridConfig')?.get('department')?.find(col => col.get('id') === state.get('selectedDepartmentId'));
        let updatedState = processAllowedCharacteristicSets(changedState, selectedDepartmentCachedGridConfig);
        updatedState = processGridConfigurationWithSelectedId(updatedState, initialState, noFromJS);

        const hasFilterSort = !(_.isEqual(state.getIn(['filters', state.get('selectedDepartmentId')]) ?? null, updatedState.getIn(['filters', state.get('selectedDepartmentId')]) ?? null) &&
         _.isEqual(state.getIn(['sorts', state.get('selectedDepartmentId')]) ?? null, updatedState.getIn(['sorts', state.get('selectedDepartmentId')]) ?? null));

        return updatedState.withMutations(map => {
          map.set('hasFilterSort', hasFilterSort);
        });
      }
      return changedState;
    }

    case CANCEL_COLUMN_REORDER: {
      return state.withMutations(map =>
        map.set('showColumnReorderConfirmModal', false)
          .set('reorderedColumnDetail', initialState.get('reorderedColumnDetail'))
          .set('lastReorderedColumnModel', initialState.get('lastReorderedColumnModel'))
      );
    }

    case retrieveGridConfigurationPending(CHARACTERISTICS):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(CHARACTERISTICS):
      return state.set('loading', false);

    case retrieveGridConfigurationFulfilled(CHARACTERISTICS): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case CHARACTERISTICS_UPDATE_CACHED_GRID_CONFIGURATION : {
      const updatedConfiguration = action.payload;
      if (!_.isEqual(updatedConfiguration, state.get('cachedGridConfig')?.toJS()) && state.get('saveCachedGridConfiguration')) {
        return state.set('cachedGridConfig', fromJS(updatedConfiguration));
      }
      return state;
    }

    case FILTER_CHARACTERISTICS_LIST_FULFILLED: {
      return state.withMutations(map =>
        map.setIn(['filters', state.get('selectedDepartmentId')], action.payload)
          .set('skip', initialState.get('skip')));
    }

    case SORT_CHARACTERISTICS_LIST_FULFILLED: {
      return state.setIn(['sorts', state.get('selectedDepartmentId')], action.payload);
    }

    case CLEAR_CHARACTERISTICS_LIST_FILTERS_FULFILLED:
      return state.withMutations(map =>
        map.setIn(['filters', state.get('selectedDepartmentId')], null)
          .set('skip', initialState.get('skip')));

    case CLEAR_CHARACTERISTICS_LIST_SORTS_FULFILLED:
      return state.setIn(['sorts', state.get('selectedDepartmentId')], null);

    case SET_ALL_CHARACTERISTICS_SELECTED:
      return state.set('headerSelectionValue', action.payload.selected);

    default:
      return state;
  }
}
