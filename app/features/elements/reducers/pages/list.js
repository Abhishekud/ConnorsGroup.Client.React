import {Map, List, fromJS} from 'immutable';
import {modelsArrayToMapById, processGridConfiguration, reorderGridAndSidebarColumns} from '../../../shared/services';
import {
  DELETE_ELEMENT,
  LOAD_ELEMENTS_LIST_PENDING,
  LOAD_ELEMENTS_LIST_FULFILLED,
  LOAD_ELEMENTS_LIST_REJECTED,
  SELECT_ELEMENT,
  SELECT_ALL_ELEMENTS,
  SORT_ELEMENTS_LIST,
  FILTER_ELEMENTS_LIST,
  TOGGLE_SELECT_ELEMENT,
  PAGE_ELEMENTS_LIST,
  REORDER_ELEMENTS_COLUMN,
  TOGGLE_ELEMENTS_COLUMN_VISIBILITY,
  TOGGLE_ELEMENTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
  CLEAR_ELEMENTS_LIST_FILTERS,
  CLEAR_ELEMENTS_LIST_SORTS,
  TOGGLE_ELEMENTS_COLUMN_LOCK,
  LOAD_ELEMENTS_COLUMNS,
  RESET_LOCKED_ELEMENTS_COLUMNS_FULFILLED,
  SHOW_HIDDEN_ELEMENTS_COLUMNS_FULFILLED,
  RESET_ELEMENTS_COLUMNS_FULFILLED,
  CANCEL_COLUMN_REORDER,
} from '../../actions';
import {nonReorderableColumns} from '../../../shared/constants/nonReorderableColumns';
import _ from 'lodash';
import {retrieveGridConfigurationFulfilled} from '../../../customizableGrid/services/gridActionBuilder';
import {ELEMENTS as ELEMENTS_GRID} from '../../../customizableGrid/constants/grids';

const defaultLockedColumnsState = Map({'id': true, 'elementTypeAbbreviated': true, 'name': true});
const ELEMENTS_UPDATE_CACHED_GRID_CONFIGURATION = 'ELEMENTS_UPDATE_CACHED_GRID_CONFIGURATION';

const initialState = Map({
  loading: false,
  elements: Map(),
  sort: new List(),
  hiddenColumns: Map(),
  columnOrder: new List(),
  showGridConfiguration: false,
  filter: null,
  headerSelectionValue: false,
  take: 50,
  skip: 0,
  lockedColumns: defaultLockedColumnsState,
  showResetButton: false,
  showLockButton: false,
  showHiddenButton: false,
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  cachedGridConfig: Map(),
  isElementsLoaded: false,
  isGridConfigurationProcessed: false,
  isCachedGridConfigurationRetrieved: false,
  saveCachedGridConfiguration: false,
  shouldLoadElementsColumns: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ELEMENTS_LIST_PENDING:
      return state.withMutations(map =>
        map.set('loading', true)
          .set('isElementsLoaded', false))
        .set('saveCachedGridConfiguration', false);

    case LOAD_ELEMENTS_LIST_FULFILLED: {
      const newElement = action.payload.data.map(obj => ({...obj, selected: false}));
      return state.withMutations(map =>
        map.set('loading', false)
          .set('headerSelectionValue', false)
          .set('elements', modelsArrayToMapById(newElement)))
        .set('columnOrder', initialState.get('columnOrder'))
        .set('lockedColumns', defaultLockedColumnsState)
        .set('hiddenColumns', initialState.get('hiddenColumns'))
        .set('isElementsLoaded', true)
        .set('isGridConfigurationProcessed', false)
        .set('saveCachedGridConfiguration', false)
        .set('shouldLoadElementsColumns', true);
    }

    case LOAD_ELEMENTS_LIST_REJECTED:
      return state.set('loading', false);

    case TOGGLE_ELEMENTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case SORT_ELEMENTS_LIST:
      return state.set('sort', action.payload);

    case FILTER_ELEMENTS_LIST:
    {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', 0)
          .update('elements', elements => elements.map(elements => elements.set('selected', false)))
          .set('headerSelectionValue', false)
      );
    }

    case SELECT_ELEMENT: {
      const {id} = action.payload;
      const index = state.get('standards').findIndex(s => s.get('id') === id);
      if (index === -1) throw new Error('Unknown standard selected');

      return state
        .updateIn(['elements', id, 'selected'], v => !v);
    }

    case TOGGLE_SELECT_ELEMENT: {
      const index = state
        .get('elements')
        .find(s => s.get('id') === action.payload.elementId);
      const newIndex = index.get('id');
      if (index === -1) throw new Error('Unknown standard selected');

      return state.updateIn(['elements', newIndex, 'selected'], t => !t)
        .withMutations(map => map.setIn(['headerSelectionValue'], !map.get('elements').some(s => !s.get('selected'))));
    }

    case SELECT_ALL_ELEMENTS: {
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], action.payload.selected);
        map.update('elements', elements => elements.map(elements => {
          if (action.payload.ids.includes(elements.get('id'))) {
            return elements.set('selected', action.payload.selected);
          }
          return elements.set('selected', false);
        }));
      });
    }

    case PAGE_ELEMENTS_LIST:
      return state.set('skip', action.payload);

    case DELETE_ELEMENT: {
      const {id, selected} = action.payload;
      return state.deleteIn(['elements', id], selected);
    }

    case TOGGLE_ELEMENTS_COLUMN_VISIBILITY: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();
      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', action.payload.field]);
          map.set('showHiddenButton', state.get('hiddenColumns').size > 1)
            .set('showResetButton', map.get('showHiddenButton') || map.get('showLockButton'));
          map.set('columnOrder', toggleColumnsList);
        });
      }

      return state.withMutations(map => {
        const handleFilter = map => {
          if (map.get('filter')) {
            const filterIndex = map.getIn(['filter', 'filters']).findIndex(value => value.get('field') === action.payload.field);
            if (filterIndex !== -1) {
              return map.deleteIn(['filter', 'filters', filterIndex]);
            }
          }
          return map;
        };
        const handleSort = map => {
          if (map.get('sort')) {
            const sortIndex = map.getIn(['sort']).findIndex(value => value.get('field') === action.payload.field);
            if (sortIndex !== -1) {
              return map.deleteIn(['sort', sortIndex]);
            }
          }
          return map;
        };
        const handleHidden = map => map.setIn(['hiddenColumns', action.payload.field], action.payload.selectedColumn)
          .set('showHiddenButton', true)
          .set('columnOrder', toggleColumnsList)
          .set('showResetButton', true);
        handleHidden(handleSort(handleFilter(map)));
      });
    }

    case TOGGLE_ELEMENTS_COLUMN_LOCK: {
      const {finalColumns} = action.payload;
      const finalColumnsOrder = (finalColumns) ? finalColumns : new List();
      return state.withMutations(map => {
        if (action.payload.value) {
          map.setIn(['lockedColumns', action.payload.field], action.payload.value);
        } else {
          map.deleteIn(['lockedColumns', action.payload.field]);
        }
        map.set('columnOrder', finalColumnsOrder);
        if (map.get('lockedColumns').equals(defaultLockedColumnsState)) {
          map.set('showLockButton', false);
        } else {
          map.set('showLockButton', true);
        }
        map.set('showResetButton', map.get('showLockButton') || map.get('showHiddenButton'));
      });
    }

    case RESET_ELEMENTS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('hiddenColumns', initialState.get('hiddenColumns'));
        map.set('lockedColumns', defaultLockedColumnsState)
          .set('showHiddenButton', false)
          .set('showResetButton', false)
          .set('showLockButton', false);
      });

    case RESET_LOCKED_ELEMENTS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('lockedColumns', defaultLockedColumnsState)
          .set('showLockButton', false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', x]));
        map.set('showHiddenButton', map.get('hiddenColumns')?.size)
          .set('showResetButton', map.get('showHiddenButton'));
      });

    case SHOW_HIDDEN_ELEMENTS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('showResetButton', map.get('showLockButton'))
          .set('showHiddenButton', false);
      });

    case CLEAR_ELEMENTS_LIST_FILTERS:
      return state.set('filter', initialState.get('filter')).set('skip', initialState.get('skip'));

    case CLEAR_ELEMENTS_LIST_SORTS:
      return state.set('sort', initialState.get('sort'));

    case REORDER_ELEMENTS_COLUMN: {
      const {columnKey, oldIndex, newIndex} = action.payload;
      const columns = state.get('columnOrder');

      // For avoiding reorder on hidden columns
      const lastOrderIndex = _.maxBy(columns.toJS(), 'orderIndex').orderIndex;

      const sourceColumn = columns.find(c => c.get('orderIndex') === oldIndex);
      const destinationColumn = columns.find(c => c.get('orderIndex') === newIndex);

      if (lastOrderIndex < newIndex ||
        nonReorderableColumns.includes(sourceColumn.get('field')) ||
        nonReorderableColumns.includes(destinationColumn.get('field')) ||
        (!columns.first().get('lockable') && destinationColumn.get('locked') && !sourceColumn.get('locked'))) {
        return state;
      }

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

      return state.withMutations(map => {
        map.set('columnOrder', fromJS(reorderedColumns));
        if (destinationColumn.get('locked')) map.setIn(['lockedColumns', columnKey], true);
        if (sourceColumn.get('locked') && !destinationColumn.get('locked')) map.deleteIn(['lockedColumns', columnKey]);
        map.set('showResetButton', !map.get('lockedColumns').equals(defaultLockedColumnsState) || map.get('hiddenColumns')?.size)
          .set('showLockButton', !map.get('lockedColumns').equals(defaultLockedColumnsState))
          .set('showColumnReorderConfirmModal', false);
      });
    }

    case LOAD_ELEMENTS_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.set('columnOrder', columns)
          .set('shouldLoadElementsColumns', false);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isElementsLoaded') && !state.get('isGridConfigurationProcessed')) {
        return processGridConfiguration(changedState, initialState);
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

    case retrieveGridConfigurationFulfilled(ELEMENTS_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case ELEMENTS_UPDATE_CACHED_GRID_CONFIGURATION : {
      const updatedConfiguration = action.payload;
      if (!_.isEqual(updatedConfiguration, state.get('cachedGridConfig')?.toJS()) && state.get('saveCachedGridConfiguration')) {
        return state.set('cachedGridConfig', fromJS(updatedConfiguration));
      }
      return state;
    }

    default:
      return state;
  }
}
