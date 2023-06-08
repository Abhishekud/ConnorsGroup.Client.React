import {processGridConfiguration, modelsArrayToMapById, reorderGridAndSidebarColumns, resetGridConfiguration} from '../../../shared/services';
import {Map, List, fromJS} from 'immutable';
import {
  LOAD_LOCATION_DEPARTMENTS_LIST_FULFILLED,
  UPDATE_LOCATIONS_DEPARTMENT_PENDING,
  UPDATE_LOCATIONS_DEPARTMENT_FULFILLED,
  UPDATE_LOCATIONS_DEPARTMENT_REJECTED,
  UPDATE_LOCATIONS_DEPARTMENT_BULK_PENDING,
  UPDATE_LOCATIONS_DEPARTMENT_BULK_REJECTED,
  UPDATE_LOCATIONS_DEPARTMENT_BULK_FULFILLED,
  TOGGLE_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
  TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_LOCK,
  REORDER_LOCATION_DEPARTMENT_COLUMNS,
  SHOW_HIDDEN_LOCATIONS_GRID_CONFIGURATION,
  LOAD_LOCATION_DEPARTMENTS_COLUMNS,
  REORDER_LOCATION_DEPARTMENTS_COLUMN,
  TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_VISIBILITY_FULFILLED,
  RESET_LOCKED_LOCATION_DEPARTMENTS_FULFILLED,
  RESET_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_FULFILLED,
  SHOW_HIDDEN_LOCATION_DEPARTMENTS_FULFILLED,
  CANCEL_COLUMN_REORDER,
  FILTER_LOCATION_DEPARTMENTS_LIST,
  SORT_LOCATION_DEPARTMENTS_LIST,
  CLEAR_ALL_LOCATION_DEPARTMENTS_LIST_FILTERS,
  CLEAR_LOCATION_DEPARTMENTS_LIST_SORT,
  LOAD_LOCATION_DEPARTMENTS_LIST_PENDING,
  CLEAR_COLUMN_ORDER_AND_HIDDEN_COLUMNS,
} from '../../actions';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected, clearGridConfigurationFulfilled, persistGridConfigurationFulfilled} from '../../../customizableGrid/services/gridActionBuilder';
import {LOCATIONS as LOCATIONS_GRID} from '../../../customizableGrid/constants/grids';
import {nonReorderableColumns} from '../../../shared/constants/nonReorderableColumns';
import _ from 'lodash';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions';
import {LOCATION_IMPORTER} from '../../../shared/constants/backgroundJobs';

const defaultLockedColumnsState = Map({'name': true, 'description': true});
const noFromJS = true;
const initialState = Map({
  saving: false,
  departments: Map(),
  showGridConfiguration: false,
  hiddenColumns: Map(),
  lockedColumns: defaultLockedColumnsState,
  columnOrder: new List(),
  showResetButton: false,
  reorderedColumnDetail: Map(),
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(),
  cachedGridConfig: Map(),
  isLocationsLoaded: false,
  isGridConfigurationProcessed: false,
  sort: null,
  filter: null,
  hasFilterSortApplied: false,
  isCachedGridConfigurationRetrieved: false,
  shouldClientResetGridConfiguration: false,
  originalColumns: new List(),
  activeImportLocationsBackgroundJob: false,
  backgroundJobStarted: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case CLEAR_COLUMN_ORDER_AND_HIDDEN_COLUMNS:
      return state.withMutations(map => {
        map.set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('columnOrder', initialState.get('columnOrder'));
      });

    case LOAD_LOCATION_DEPARTMENTS_LIST_PENDING:
      return state.set('isLocationsLoaded', false);

    case LOAD_LOCATION_DEPARTMENTS_LIST_FULFILLED: {
      const {departments} = action.payload.data;
      return state.withMutations(map => {
        map.set('departments', modelsArrayToMapById(departments)) // this will be required
          .set('lockedColumns', state.get('lockedColumns') ?? defaultLockedColumnsState)
          .set('isLocationsLoaded', true)
          .set('isGridConfigurationProcessed', false)
          .set('hasFilterSortApplied', false)
          .set('backgroundJobStarted', false);
      });
    }

    case UPDATE_LOCATIONS_DEPARTMENT_BULK_PENDING:
    case UPDATE_LOCATIONS_DEPARTMENT_PENDING:
      return state.set('saving', true);

    case UPDATE_LOCATIONS_DEPARTMENT_BULK_REJECTED:
    case UPDATE_LOCATIONS_DEPARTMENT_REJECTED:
      return state.set('saving', false);

    case UPDATE_LOCATIONS_DEPARTMENT_BULK_FULFILLED:
    case UPDATE_LOCATIONS_DEPARTMENT_FULFILLED: {
      return state.withMutations(map =>
        map.set('saving', false)
      );
    }

    case TOGGLE_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED: //// Keep this one
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_VISIBILITY_FULFILLED: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();
      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', action.payload.field]);
          map.set('showHiddenButton', state.getIn(['hiddenColumns']).size > 1)
            .set('showResetButton', map.get('showHiddenButton') || map.get('showLockButton'));
          map.setIn(['columnOrder'], toggleColumnsList.sortBy(col => col.get('orderIndex')));
        });
      }
      return state.withMutations(map => {
        const handleFilter = map => {
          //Remove filters on a column if it is toggled to invisible
          if (!action.payload.visibility && map.get('filter') !== null) {
            const idx = map.getIn(['filter', 'filters']).findIndex(value => value.field === action.payload.field);
            if (idx !== -1) {
              map.deleteIn(['filter', 'filters', idx]);
            }
          }
          return map;
        };
        const handleSort = map => {
          //Remove sorts on a column if it is toggled to invisible
          if (!action.payload.visibility && map.get('sort') && map.get('sort') !== null) {
            const idx = map.get('sort').findIndex(value => value.field === action.payload.field);
            if (idx !== -1) {
              map.deleteIn(['sort', idx]);
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

    case FILTER_LOCATION_DEPARTMENTS_LIST: {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', 0));
    }

    case SORT_LOCATION_DEPARTMENTS_LIST: {
      return state.set('sort', action.payload); }

    case CLEAR_ALL_LOCATION_DEPARTMENTS_LIST_FILTERS:
      return state.set('filter', initialState.get('filter')).set('skip', initialState.get('skip'));

    case CLEAR_LOCATION_DEPARTMENTS_LIST_SORT:
      return state.set('sort', initialState.get('sort'));

    case TOGGLE_LOCATION_DEPARTMENTS_GRID_COLUMN_LOCK: {
      const {finalColumns} = action.payload;
      return state.withMutations(map => {
        const returnColumnsOrder = (finalColumns) ? finalColumns : new List();
        if (action.payload.value) {
          map.setIn(['lockedColumns', action.payload.field], action.payload.value);
          map.setIn(['columnOrder'], returnColumnsOrder);
        } else {
          map.deleteIn(['lockedColumns', action.payload.field]);
          map.setIn(['columnOrder'], returnColumnsOrder);
        }
        if (map.get('lockedColumns').equals(defaultLockedColumnsState)) {
          map.set('showLockButton', false);
        } else {
          map.set('showLockButton', true);
        }
        map.set('showResetButton', map.get('showLockButton') || map.get('showHiddenButton'));
      });
    }

    case RESET_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_FULFILLED:
    {
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('hiddenColumns', initialState.get('hiddenColumns'));
        map.set('lockedColumns', defaultLockedColumnsState)
          .set('isGridConfigurationProcessed', true)
          .set('showHiddenButton', false)
          .set('showResetButton', false)
          .set('showLockButton', false);
      });
    }

    case RESET_LOCKED_LOCATION_DEPARTMENTS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('lockedColumns', defaultLockedColumnsState)
          .set('showLockButton', false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', x]));
        map.set('showHiddenButton', map.get('hiddenColumns')?.size)
          .set('showResetButton', map.get('showHiddenButton'))
          .set('isGridConfigurationProcessed', true);
      });

    case SHOW_HIDDEN_LOCATION_DEPARTMENTS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('showResetButton', map.get('showLockButton'))
          .set('showHiddenButton', false)
          .set('isGridConfigurationProcessed', true);
      });

    case SHOW_HIDDEN_LOCATIONS_GRID_CONFIGURATION:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('showHiddenButton', false);
      });
    case REORDER_LOCATION_DEPARTMENT_COLUMNS: {
      const {finalColumns} = action.payload;
      const reorderColumnsList = (finalColumns) ? finalColumns : new List();
      return state.set('columnOrder', reorderColumnsList);
    }

    case REORDER_LOCATION_DEPARTMENTS_COLUMN: {
      const {columnKey, oldIndex, newIndex} = action.payload;
      const columns = state.get('columnOrder');

      // For avoiding reorder on hidden columns
      const lastOrderIndex = _.maxBy(columns.toJS(), 'orderIndex').orderIndex;

      const destinationColumn = columns.find(c => c.get('orderIndex') === newIndex);
      const sourceColumn = columns.find(c => c.get('orderIndex') === oldIndex);

      if (lastOrderIndex < newIndex || nonReorderableColumns.includes(sourceColumn.get('field')) ||
      nonReorderableColumns.includes(destinationColumn.get('field')) || (!columns.first().get('lockable') &&
        destinationColumn.get('locked') && !sourceColumn.get('locked'))) {
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
        map.set('columnOrder', fromJS(reorderedColumns).sortBy(col => col.get('orderIndex')));
        if (destinationColumn.get('locked')) map.setIn(['lockedColumns', columnKey], true);
        if (sourceColumn.get('locked') && !destinationColumn.get('locked')) map.deleteIn(['lockedColumns', columnKey]);
        map.set('showResetButton', !map.get('lockedColumns').equals(defaultLockedColumnsState) || map.get('hiddenColumns')?.size)
          .set('showLockButton', !map.get('lockedColumns').equals(defaultLockedColumnsState))
          .set('showColumnReorderConfirmModal', false);
      });
    }

    case CANCEL_COLUMN_REORDER: {
      return state.withMutations(map =>
        map.set('showColumnReorderConfirmModal', false)
          .set('reorderedColumnDetail', initialState.get('reorderedColumnDetail'))
          .set('lastReorderedColumnModel', initialState.get('lastReorderedColumnModel'))
      );
    }

    case retrieveGridConfigurationPending(LOCATIONS_GRID):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(LOCATIONS_GRID):
      return state.set('loading', false);

    case retrieveGridConfigurationFulfilled(LOCATIONS_GRID): {
      const configuration = JSON.parse(action.payload.data.configuration);
      let updatedState = state;
      if (configuration?.ShouldClientResetGridConfiguration) {
        updatedState = resetGridConfiguration(updatedState, defaultLockedColumnsState);
      }
      return updatedState.withMutations(map =>
        map.set('cachedGridConfig', fromJS(configuration))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case persistGridConfigurationFulfilled(LOCATIONS_GRID): {
      const configuration = JSON.parse(action.payload.data.configuration);

      if (configuration?.ShouldClientResetGridConfiguration) {
        return state.set('shouldClientResetGridConfiguration', true);
      }
      return state;
    }

    case clearGridConfigurationFulfilled(LOCATIONS_GRID):
    {
      return resetGridConfiguration(state, defaultLockedColumnsState);
    }

    case LOAD_LOCATION_DEPARTMENTS_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.set('columnOrder', columns)
          .set('originalColumns', columns);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isLocationsLoaded') && !state.get('isGridConfigurationProcessed')) {
        return processGridConfiguration(changedState, initialState, noFromJS);
      }
      return changedState;
    }

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;
      if (backgroundJobTypes.includes(LOCATION_IMPORTER)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeImportLocationsBackgroundJob', activeJobs);
        });
      }
      return state;
    }

    default:
      return state;
  }
}
