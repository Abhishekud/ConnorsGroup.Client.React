import {fromJS, List, Map} from 'immutable';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../../shared/actions/index';
import {CALCULATE_LABOR} from '../../../../shared/constants/backgroundJobs';
import {
  LOAD_LABOR_STANDARDS_LIST_PENDING,
  LOAD_LABOR_STANDARDS_LIST_FULFILLED,
  LOAD_LABOR_STANDARDS_LIST_REJECTED,
} from '../../actions/loadLaborStandardsList';
import {
  SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST_PENDING,
  SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST_REJECTED,
  SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST_FULFILLED,
} from '../../actions/submitLaborStandardsIntegrationRequest';
import {TOGGLE_LABOR_STANDARD_BULK_EDIT_SIDEBAR} from '../../actions/toggleLaborStandardsListBulkEditSidebar';
import {LOAD_ENDPOINTS_LIST_FOR_SELECT_FULFILLED} from '../../../integrationEndpoint/actions';
import {
  CLEAR_EDIT_KRONOS_LABOR_STANDARD_SIDEBAR,
  SUBMIT_WIM_EMAIL_EXPORT_REQUEST_PENDING,
  SUBMIT_WIM_EMAIL_EXPORT_REQUEST_FULFILLED,
  SUBMIT_WIM_EMAIL_EXPORT_REQUEST_REJECTED,
  SUBMIT_WIM_TUMBLEWEED_EXPORT_REQUEST_PENDING,
  SUBMIT_WIM_TUMBLEWEED_EXPORT_REQUEST_FULFILLED,
  SUBMIT_WIM_TUMBLEWEED_EXPORT_REQUEST_REJECTED,
  LOAD_LABOR_STANDARDS_COLUMNS,
  TOGGLE_GRID_CONFIGURATION_SIDEBAR,
  REORDER_LABOR_STANDARDS_COLUMN,
  TOGGLE_LABOR_STANDARDS_COLUMN_LOCK,
  RESET_LABOR_STANDARDS_COLUMNS_FULFILLED,
  SHOW_LABOR_STANDARDS_HIDDEN_COLUMNS_FULFILLED,
  RESET_LABOR_STANDARDS_LOCKED_COLUMNS_FULFILLED,
  TOGGLE_LABOR_STANDARDS_COLUMN_VISIBILITY_FULFILLED,
  CANCEL_COLUMN_REORDER,
  SORT_LABOR_STANDARDS_LIST_FULFILLED,
  FILTER_LABOR_STANDARDS_LIST_FULFILLED,
  CLEAR_LABOR_STANDARDS_LIST_FILTERS_FULFILLED,
  CLEAR_LABOR_STANDARDS_LIST_SORTS_FULFILLED,
} from '../../actions';
import {processGridConfiguration, reorderGridAndSidebarColumns} from '../../../../shared/services';
import {nonReorderableColumns} from '../../../../shared/constants/nonReorderableColumns';
import _ from 'lodash';
import {LABOR_STANDARDS as LABOR_STANDARDS_GRID} from '../../../../customizableGrid/constants/grids';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected} from '../../../../customizableGrid/services/gridActionBuilder';

const defaultLockedColumnsState = Map({'laborStandardName': true, 'standardId': true, 'standardName': true});
const LABOR_STANDARDS_UPDATE_CACHED_GRID_CONFIGURATION = 'LABOR_STANDARDS_UPDATE_CACHED_GRID_CONFIGURATION';
const noFromJS = true;

const initialState = fromJS({
  wasCalculatingLabor: false, // was calculating before the last load of the labor standards.
  isCalculatingLabor: false, // is currently calculating the labor standards.
  kronosEndpoints: [],
  isSubmittingIntegrationRequest: false,
  bulkEditSidebarShown: false,
  loading: false,
  selectedLaborStandard: {},
  columnOrder: new List(),
  hiddenColumns: Map(),
  lockedColumns: defaultLockedColumnsState,
  showGridConfiguration: false,
  showLockButton: false,
  showHiddenButton: false,
  showResetButton: false,
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  filter: null,
  sort: null,
  cachedGridConfig: Map(),
  isLaborStandardsLoaded: false,
  isGridConfigurationProcessed: false,
  isCachedGridConfigurationRetrieved: false,
  saveCachedGridConfiguration: false,
  hasFilterSort: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_LABOR_STANDARDS_LIST_PENDING:
      return state.withMutations(map => {
        if (state.get('isGridConfigurationProcessed')) map.set('hasFilterSort', false);
        map.set('wasCalculatingLabor', false)
          .set('isLaborStandardsLoaded', false)
          .set('saveCachedGridConfiguration', false);
      });

    case LOAD_LABOR_STANDARDS_LIST_FULFILLED:{
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'))
          .set('lockedColumns', defaultLockedColumnsState)
          .set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('isLaborStandardsLoaded', true)
          .set('isGridConfigurationProcessed', false);
      });
    }

    case LOAD_LABOR_STANDARDS_LIST_REJECTED:
      return state.set('loading', false);

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;
      if (backgroundJobTypes.includes(CALCULATE_LABOR)) {
        return state.set('isCalculatingLabor', activeJobs).update('wasCalculatingLabor', prev => prev || activeJobs);
      }
      return state;
    }

    case LOAD_ENDPOINTS_LIST_FOR_SELECT_FULFILLED:
      return state.set('kronosEndpoints', fromJS(action.payload.data));

    case SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST_PENDING:
    case SUBMIT_WIM_EMAIL_EXPORT_REQUEST_PENDING:
    case SUBMIT_WIM_TUMBLEWEED_EXPORT_REQUEST_PENDING:
      return state.set('isSubmittingIntegrationRequest', true);

    case SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST_FULFILLED:
    case SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST_REJECTED:
    case SUBMIT_WIM_EMAIL_EXPORT_REQUEST_FULFILLED:
    case SUBMIT_WIM_EMAIL_EXPORT_REQUEST_REJECTED:
    case SUBMIT_WIM_TUMBLEWEED_EXPORT_REQUEST_FULFILLED:
    case SUBMIT_WIM_TUMBLEWEED_EXPORT_REQUEST_REJECTED:
      return state.set('isSubmittingIntegrationRequest', false);

    case TOGGLE_LABOR_STANDARD_BULK_EDIT_SIDEBAR:
      return state.update('bulkEditSidebarShown', x => !x);

    case CLEAR_EDIT_KRONOS_LABOR_STANDARD_SIDEBAR:
      return state.set('selectedLaborStandard', new Map());

    case TOGGLE_GRID_CONFIGURATION_SIDEBAR:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case TOGGLE_LABOR_STANDARDS_COLUMN_VISIBILITY_FULFILLED: {
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
          //Remove filters on a column if it is toggled to invisible
          if (!action.payload.visibility && map.get('filter')) {
            const idx = map.getIn(['filter', 'filters']).findIndex(value => value.field === action.payload.field);
            if (idx !== -1) {
              map.deleteIn(['filter', 'filters', idx]);
            }
          }
          return map;
        };
        const handleSort = map => {
          //Remove sorts on a column if it is toggled to invisible
          if (!action.payload.visibility && map.get('sort')) {
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

    case TOGGLE_LABOR_STANDARDS_COLUMN_LOCK: {
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

    case RESET_LABOR_STANDARDS_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'))
          .set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('lockedColumns', defaultLockedColumnsState)
          .set('showHiddenButton', false)
          .set('showResetButton', false)
          .set('showLockButton', false);
      });


    case SHOW_LABOR_STANDARDS_HIDDEN_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('hiddenColumns', initialState.get('hiddenColumns'))
          .set('showResetButton', map.get('showLockButton'))
          .set('showHiddenButton', false);
      });

    case RESET_LABOR_STANDARDS_LOCKED_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.set('columnOrder', initialState.get('columnOrder'));
        map.set('lockedColumns', defaultLockedColumnsState)
          .set('showLockButton', false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', x]));
        map.set('showHiddenButton', map.get('hiddenColumns')?.size)
          .set('showResetButton', map.get('showHiddenButton'));
      });

    case REORDER_LABOR_STANDARDS_COLUMN: {
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

    case LOAD_LABOR_STANDARDS_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => map.set('columnOrder', columns));

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isLaborStandardsLoaded') && !state.get('isGridConfigurationProcessed')) {
        const updatedState = processGridConfiguration(changedState, initialState, noFromJS);
        const showLoad = !(_.isEqual(changedState.get('filter'), updatedState.get('filter')) && _.isEqual(changedState.get('sort'), updatedState.get('sort')));
        return updatedState.set('loading', showLoad).set('hasFilterSort', showLoad);
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

    case FILTER_LABOR_STANDARDS_LIST_FULFILLED: {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', 0));
    }

    case SORT_LABOR_STANDARDS_LIST_FULFILLED: {
      return state.set('sort', action.payload); }

    case CLEAR_LABOR_STANDARDS_LIST_FILTERS_FULFILLED:
      return state.withMutations(map =>
        map.set('filter', initialState.get('filter'))
          .set('skip', initialState.get('skip')));

    case CLEAR_LABOR_STANDARDS_LIST_SORTS_FULFILLED:
      return state.set('sort', initialState.get('sort'));

    case retrieveGridConfigurationPending(LABOR_STANDARDS_GRID): {
      return state.set('loading', true);
    }

    case retrieveGridConfigurationFulfilled(LABOR_STANDARDS_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case retrieveGridConfigurationRejected(LABOR_STANDARDS_GRID): {
      return state.withMutations(map =>
        map.set('loading', false));
    }

    case LABOR_STANDARDS_UPDATE_CACHED_GRID_CONFIGURATION : {
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
