import {fromJS, List, Map, OrderedMap} from 'immutable';
import {processGridConfiguration, reorderGridAndSidebarColumns} from '../../../shared/services';
import {
  LOAD_STANDARDS_LIST_FULFILLED,
  LOAD_STANDARDS_LIST_PENDING,
  LOAD_STANDARDS_LIST_REJECTED,
  SELECT_ALL_STANDARDS_IN_STANDARDS_LIST,
  TOGGLE_SELECT_STANDARD,
  SORT_STANDARDS_LIST,
  FILTER_STANDARDS_LIST,
  PAGE_STANDARDS_LIST,
  DELETE_STANDARD_FULFILLED,
  TOGGLE_GRID_CONFIGURATION_SIDEBAR,
  TOGGLE_STANDARDS_COLUMN_VISIBILITY,
  REORDER_STANDARDS_COLUMN,
  CLEAR_STANDARDS_LIST_FILTERS,
  CLEAR_STANDARDS_LIST_SORTS,
  GENERATE_BULK_EXPORT_THROUGH_FUNCTION_FULFILLED,
  GENERATE_BULK_EXPORT_THROUGH_FUNCTION_PENDING,
  GENERATE_BULK_EXPORT_THROUGH_FUNCTION_REJECTED,
  POLL_BULK_EXPORT_BACKGROUND_JOB_STATUS_FULFILLED,
  POLL_BULK_EXPORT_BACKGROUND_JOB_STATUS_REJECTED,
  UPDATE_BULK_EXPORT_DOWNLOAD_STATUS_VALUE,
  SET_IS_EXPORT_BACKGROUND_JOB,
  TOGGLE_STANDARDS_COLUMN_LOCK,
  RESET_STANDARDS_GRID_CONFIGURATION_FULFILLED,
  LOAD_STANDARDS_COLUMNS,
  SHOW_HIDDEN_STANDARDS_COLUMNS_FULFILLED,
  RESET_LOCKED_STANDARDS_COLUMNS_FULFILLED,
  CANCEL_COLUMN_REORDER,
  LOAD_STANDARDS_PAGE,
} from '../../actions';
import {
  GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_FULFILLED,
  GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_PENDING,
  GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_REJECTED,
} from '../../../selectListOptions/actions';
import {
  createStandardStates,
} from '../../services';
import {
  STANDARDS as STANDARDS_GRID,
} from '../../../customizableGrid/constants/grids';
import {
  retrieveGridConfigurationFulfilled,
  retrieveGridConfigurationPending,
  retrieveGridConfigurationRejected,
} from '../../../customizableGrid/services/gridActionBuilder';
import {STANDARD_DETAILS_EXPORTER, BULK_DELETE_STANDARDS_REVISIONS} from '../../../shared/constants/backgroundJobs';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions';
import {nonReorderableColumns} from '../../../shared/constants/nonReorderableColumns';
import _ from 'lodash';

const defaultLockedColumnsState = Map({'id': true, 'name': true});
const STANDARDS_UPDATE_CACHED_GRID_CONFIGURATION = 'STANDARDS_UPDATE_CACHED_GRID_CONFIGURATION';

const initialState = new Map({
  loading: false,
  sort: new List(),
  filter: null,
  skip: 0,
  take: 50,
  showGridConfiguration: false,
  standards: new List(),
  standardStates: Map(),
  loadedCachedGridConfig: false,
  loadedFilingFields: false,
  cachedGridConfig: Map(),
  defaultConfiguration: new OrderedMap(),
  bulkExportBackroundJobActive: false,
  bulkExportBackroundJobExportRequestId: false,
  bulkExportDownloadStatusSelector: false,
  isExportBackgroundJob: false,
  activeBackgroundJobs: false,
  lockedColumns: defaultLockedColumnsState,
  hiddenColumns: Map(),
  columnOrder: new List(),
  showHiddenButton: false,
  showLockButton: false,
  showResetButton: false,
  filingFields: new Map(),
  activeBulkDeleteBackgroundJob: false,
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  isStandardsLoaded: false,
  isGridConfigurationProcessed: false,
  saveCachedGridConfiguration: false,
  isCachedGridConfigurationRetrieved: false,
  shouldLoadStandardsColumns: false,
});


export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_STANDARDS_PAGE:
      return state.set('loading', !state.get('isStandardsLoaded'));

    case LOAD_STANDARDS_LIST_PENDING:
      return state.withMutations(map =>
        map.set('loading', true)
          .set('isStandardsLoaded', false))
        .set('saveCachedGridConfiguration', false);

    case LOAD_STANDARDS_LIST_FULFILLED: {
      const standards = fromJS(action.payload.data.map(s => Object.assign(s, {...s.customFilingFields, selected: false})));
      return state.withMutations(map =>
        map.set('loading', false)
          .set('standards', standards)
          .set('standardStates', createStandardStates(standards)))
        .set('columnOrder', initialState.get('columnOrder'))
        .set('lockedColumns', defaultLockedColumnsState)
        .set('hiddenColumns', initialState.get('hiddenColumns'))
        .set('isStandardsLoaded', true)
        .set('saveCachedGridConfiguration', false)
        .set('isGridConfigurationProcessed', false)
        .set('shouldLoadStandardsColumns', true);
    }

    case LOAD_STANDARDS_LIST_REJECTED:
      return state.set('loading', false);

    case SORT_STANDARDS_LIST:
      return state.set('sort', action.payload);

    case FILTER_STANDARDS_LIST:
      return state.withMutations(map =>
        map.set('filter', (action.payload === null ? action.payload : fromJS(action.payload)))
          .set('skip', initialState.get('skip'))
          .update('standards', stds => stds.map(std => std.set('selected', false))));

    case PAGE_STANDARDS_LIST:
      return state.set('skip', action.payload);

    case DELETE_STANDARD_FULFILLED:
      return state.deleteIn(['standards', action.payload.data]);

    case SELECT_ALL_STANDARDS_IN_STANDARDS_LIST: {
      return state.withMutations(map =>
        map.update('standards', standards => standards.map(standard => {
          if (action.payload.ids.includes(standard.get('id'))) {
            return standard.set('selected', action.payload.selected);
          }
          return standard.set('selected', false);
        })));
    }

    case TOGGLE_SELECT_STANDARD: {
      const index = state.get('standards').findIndex(s => s.get('id') === action.payload.standardId);
      if (index === -1) throw new Error('Unknown standard selected');

      return state
        .updateIn(['standards', index, 'selected'], v => !v);
    }

    case TOGGLE_GRID_CONFIGURATION_SIDEBAR:
      return state.update('showGridConfiguration', v => !v);

    case TOGGLE_STANDARDS_COLUMN_VISIBILITY: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();
      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', action.payload.field]);
          map.set('showHiddenButton', state.get('hiddenColumns').size > 1)
            .set('columnOrder', toggleColumnsList)
            .set('showResetButton', map.get('showHiddenButton') || map.get('showLockButton'));
        });
      }
      return state.withMutations(map => {
        const handleFilter = map => {
          //Remove filters on a column if it is toggled to invisible
          if (!action.payload.visibility && map.get('filter') !== null) {
            const idx = map.getIn(['filter', 'filters']).findIndex(value => value.get('field') === action.payload.field);
            if (idx !== -1) {
              map.deleteIn(['filter', 'filters', idx]);
            }
          }
          return map;
        };
        const handleSort = map => {
          //Remove sorts on a column if it is toggled to invisible
          if (!action.payload.visibility && map.get('sort') !== null) {
            const idx = map.get('sort').findIndex(value => value.get('field') === action.payload.field);
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
    case GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_PENDING:
      return state.set('loading', true);

    case GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_REJECTED:
      return state.set('loading', false);

    case GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_FULFILLED: {
      return state.set('filingFields', fromJS(action.payload.data));
    }

    case REORDER_STANDARDS_COLUMN: {
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
        map.set('columnOrder', fromJS(reorderedColumns));
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

    case retrieveGridConfigurationPending(STANDARDS_GRID):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(STANDARDS_GRID):
      return state.set('loading', false);

    case retrieveGridConfigurationFulfilled(STANDARDS_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case RESET_STANDARDS_GRID_CONFIGURATION_FULFILLED: {
      return state.withMutations(map =>
        map.set('columnOrder', initialState.get('columnOrder'))
          .set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('lockedColumns', defaultLockedColumnsState))
        .set('showHiddenButton', false)
        .set('showLockButton', false)
        .set('showResetButton', false);
    }

    case CLEAR_STANDARDS_LIST_FILTERS:
      return state.set('filter', initialState.get('filter')).set('skip', initialState.get('skip'));

    case CLEAR_STANDARDS_LIST_SORTS:
      return state.set('sort', initialState.get('sort'));

    case GENERATE_BULK_EXPORT_THROUGH_FUNCTION_FULFILLED: {
      const {exportRequestId, backgroundedJob} = action.payload.data;
      return state.withMutations(map =>
        map.set('bulkExportBackroundJobExportRequestId', exportRequestId)
          .set('bulkExportBackroundJobActive', !backgroundedJob));
    }

    case GENERATE_BULK_EXPORT_THROUGH_FUNCTION_PENDING:
      return state.set('bulkExportBackroundJobActive', true);

    case GENERATE_BULK_EXPORT_THROUGH_FUNCTION_REJECTED:
      return state.set('bulkExportBackroundJobActive', false);

    case POLL_BULK_EXPORT_BACKGROUND_JOB_STATUS_FULFILLED: {
      const requestStatus = action.payload.status;
      return state.withMutations(map =>
        map.set('bulkExportBackroundJobActive', requestStatus === 202));
    }

    case POLL_BULK_EXPORT_BACKGROUND_JOB_STATUS_REJECTED: {
      return state.withMutations(map =>
        map.set('bulkExportBackroundJobActive', false));
    }
    case UPDATE_BULK_EXPORT_DOWNLOAD_STATUS_VALUE: {
      return state.withMutations(map =>
        map.set('bulkExportDownloadStatusSelector', action.payload));
    }

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;
      if (backgroundJobTypes.includes(STANDARD_DETAILS_EXPORTER)) {
        return state.withMutations(map => {
          map.set('activeBackgroundJobs', activeJobs);
        });
      }
      if (backgroundJobTypes.includes(BULK_DELETE_STANDARDS_REVISIONS)) {
        return state.set('activeBulkDeleteBackgroundJob', activeJobs);
      }
      return state;
    }

    case SET_IS_EXPORT_BACKGROUND_JOB: {
      return state.set('isStandardDetailExportBackgroundJob', action.payload);
    }

    case TOGGLE_STANDARDS_COLUMN_LOCK: {
      const {finalColumns} = action.payload;
      const finalColumnsOrder = (finalColumns) ? finalColumns : new List();
      return state.withMutations(map => {
        if (action.payload.value) {
          map.setIn(['lockedColumns', action.payload.field], action.payload.value);
          map.set('columnOrder', finalColumnsOrder);
        } else {
          map.deleteIn(['lockedColumns', action.payload.field]);
          map.set('columnOrder', finalColumnsOrder);
        }
        if (map.get('lockedColumns').equals(defaultLockedColumnsState)) {
          map.set('showLockButton', false);
        } else {
          map.set('showLockButton', true);
        }
        map.set('showResetButton', map.get('showLockButton') || map.get('showHiddenButton'));
      });
    }

    case SHOW_HIDDEN_STANDARDS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'))
          .set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('showHiddenButton', false)
          .set('showResetButton', map.get('showLockButton'));
      });

    case RESET_LOCKED_STANDARDS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'))
          .set('lockedColumns', defaultLockedColumnsState)
          .set('showLockButton', false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', x]));
        map.set('showHiddenButton', map.get('hiddenColumns')?.size)
          .set('showResetButton', map.get('showHiddenButton'));
      });

    case LOAD_STANDARDS_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.set('columnOrder', columns)
          .set('shouldLoadStandardsColumns', false);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isStandardsLoaded') && !state.get('isGridConfigurationProcessed')) {
        return processGridConfiguration(changedState, initialState);
      }
      return changedState;
    }

    case STANDARDS_UPDATE_CACHED_GRID_CONFIGURATION : {
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
