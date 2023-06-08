import {Map, List, fromJS} from 'immutable';
import {
  IMPORT_VOLUME_DRIVER_VALUES_PENDING,
  IMPORT_VOLUME_DRIVER_VALUES_REJECTED,
  GET_VOLUME_DRIVER_VALUES_PENDING,
  GET_VOLUME_DRIVER_VALUES_REJECTED,
  GET_VOLUME_DRIVER_VALUES_FULFILLED,
  SORT_VOLUME_DRIVER_VALUES_LIST,
  FILTER_VOLUME_DRIVER_MAPPING_VALUES_LIST,
  PAGE_VOLUME_DRIVER_VALUE_LIST,
  CLEAR_VOLUME_DRIVER_VALUES_LIST_FILTERS,
  CLEAR_VOLUME_DRIVER_VALUES_LIST_SORTS,
  TOGGLE_GRID_VOLUME_DRIVER_VALUES_CONFIGURATION_SIDEBAR,
  TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_VISIBILITY_FULFILLED,
  TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_LOCK,
  LOAD_VOLUME_DRIVER_VALUES_COLUMNS,
  LOAD_VOLUME_DRIVER_VALUES_PAGE,
  REORDER_VOLUME_DRIVER_VALUES_COLUMN,
  RESET_LOCKED_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED,
  RESET_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED,
  SHOW_HIDDEN_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED,
  CREATE_VOLUME_DRIVER_VALUES_EXPORT_REQUEST_BACKGROUND_JOB_FULFILLED,
  CANCEL_COLUMN_REORDER,
} from '../../actions';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions/index';
import {VOLUME_DRIVER_VALUES_EXPORTER, VOLUME_DRIVER_VALUE_IMPORTER} from '../../../shared/constants/backgroundJobs';
import {processGridConfigurationWithSelectedId, reorderGridAndSidebarColumns} from '../../../shared/services';
import {nonReorderableColumns} from '../../../shared/constants/nonReorderableColumns';
import _ from 'lodash';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected} from '../../../customizableGrid/services/gridActionBuilder';
import {VOLUME_DRIVER_VALUES as VOLUME_DRIVER_VALUES_GRID} from '../../../customizableGrid/constants/grids';

const defaultLockedColumnsState = Map({'locationName': true, 'locationDescription': true, 'volumeDriverName': true});

const initialState = Map({
  loading: false,
  volumeDriverValues: List(),
  activeBackgroundJobs: false,
  backgroundJobStarted: false,
  sorts: new List(),
  filters: Map(),
  take: 50,
  skip: 0,
  showGridConfiguration: false,
  columnOrder: new List(),
  hiddenColumns: Map(),
  lockedColumns: defaultLockedColumnsState,
  showResetButton: Map(),
  showHiddenButton: Map(),
  showLockButton: Map(),
  selectedVolumeDriverValueSetId: null,
  activeVolumeDriverValuesSetExportRequestBackgroundJob: false,
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  cachedGridConfig: Map(),
  isVolumeDriverValuesLoaded: false,
  isGridConfigurationProcessed: false,
  saveCachedGridConfiguration: false,
  isCachedGridConfigurationRetrieved: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case IMPORT_VOLUME_DRIVER_VALUES_PENDING:
      return state.withMutations(map => {
        map.set('activeBackgroundJobs', true)
          .set('loading', true);
      });

    case LOAD_VOLUME_DRIVER_VALUES_PAGE:
      return state.set('loading', true);

    case GET_VOLUME_DRIVER_VALUES_PENDING: {
      return state.withMutations(map =>
        map.set('loading', true)
          .set('isVolumeDriverValuesLoaded', false)
          .set('saveCachedGridConfiguration', false));
    }

    case GET_VOLUME_DRIVER_VALUES_FULFILLED: {
      const {volumeDriverValues, volumeDriverValueSetId} = action.payload.data;
      return state.withMutations(map =>
        map.set('loading', false)
          .set('backgroundJobStarted', false)
          .set('volumeDriverValues', fromJS(volumeDriverValues))
          .set('selectedVolumeDriverValueSetId', volumeDriverValueSetId)
          .set('skip', initialState.get('skip'))
          .setIn(['columnOrder', volumeDriverValueSetId], initialState.get('columnOrder'))
          .setIn(['lockedColumns', volumeDriverValueSetId], defaultLockedColumnsState)
          .setIn(['hiddenColumns', volumeDriverValueSetId], initialState.get('hiddenColumns'))
          .set('isVolumeDriverValuesLoaded', true)
          .set('isGridConfigurationProcessed', false)
      );
    }

    case GET_VOLUME_DRIVER_VALUES_REJECTED:
    case IMPORT_VOLUME_DRIVER_VALUES_REJECTED:
      return state.set('loading', false);

    case SORT_VOLUME_DRIVER_VALUES_LIST: {
      return state.setIn(['sorts', state.get('selectedVolumeDriverValueSetId')], action.payload);
    }


    case PAGE_VOLUME_DRIVER_VALUE_LIST:
      return state.set('skip', action.payload);

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(VOLUME_DRIVER_VALUE_IMPORTER) ||
      backgroundJobTypes.includes(VOLUME_DRIVER_VALUES_EXPORTER)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeBackgroundJobs', activeJobs);
        });
      }

      return state;
    }

    case TOGGLE_GRID_VOLUME_DRIVER_VALUES_CONFIGURATION_SIDEBAR:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_VISIBILITY_FULFILLED: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();
      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', state.get('selectedVolumeDriverValueSetId'), action.payload.field]);
          map.setIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')], state.getIn(['hiddenColumns', state.get('selectedVolumeDriverValueSetId')]).size > 1)
            .setIn(['showResetButton', state.get('selectedVolumeDriverValueSetId')], map.getIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')]) || map.getIn(['showLockButton', state.get('selectedVolumeDriverValueSetId')]));
          map.setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], toggleColumnsList);
        });
      }
      return state.withMutations(map => {
        const handleFilter = map => {
          if (map.getIn(['filters', state.get('selectedVolumeDriverValueSetId')])) {
            const filterIndex = map.getIn(['filters', state.get('selectedVolumeDriverValueSetId'), 'filters']).findIndex(value => value.get('field') === action.payload.field);
            if (filterIndex !== -1) {
              return map.deleteIn(['filters', state.get('selectedVolumeDriverValueSetId'), 'filters', filterIndex]);
            }
          }
          return map;
        };
        const handleSort = map => {
          if (map.getIn(['sorts', state.get('selectedVolumeDriverValueSetId')])) {
            const sortIndex = map.getIn(['sorts', state.get('selectedVolumeDriverValueSetId')]).findIndex(value => value.get('field') === action.payload.field);
            if (sortIndex !== -1) {
              return map.deleteIn(['sorts', state.get('selectedVolumeDriverValueSetId'), sortIndex]);
            }
          }
          return map;
        };

        const handleHidden = map => map.setIn(['hiddenColumns', state.get('selectedVolumeDriverValueSetId'), action.payload.field], action.payload.selectedColumn)
          .setIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')], true)
          .setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], toggleColumnsList)
          .setIn(['showResetButton', state.get('selectedVolumeDriverValueSetId')], true);
        handleHidden(handleSort(handleFilter(map)));
      });
    }

    case TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_LOCK: {
      const {finalColumns} = action.payload;
      const finalColumnsOrder = (finalColumns) ? finalColumns : new List();
      return state.withMutations(map => {
        if (action.payload.value) {
          map.setIn(['lockedColumns', state.get('selectedVolumeDriverValueSetId'), action.payload.field], action.payload.value);
          map.setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], finalColumnsOrder);
        } else {
          map.deleteIn(['lockedColumns', state.get('selectedVolumeDriverValueSetId'), action.payload.field]);
          map.setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], finalColumnsOrder);
        }
        if (map.getIn(['lockedColumns', state.get('selectedVolumeDriverValueSetId')]).equals(defaultLockedColumnsState)) {
          map.setIn(['showLockButton', state.get('selectedVolumeDriverValueSetId')], false);
        } else {
          map.setIn(['showLockButton', state.get('selectedVolumeDriverValueSetId')], true);
        }
        map.setIn(['showResetButton', state.get('selectedVolumeDriverValueSetId')], map.getIn(['showLockButton', state.get('selectedVolumeDriverValueSetId')]) || map.getIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')]));
      });
    }

    case RESET_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedVolumeDriverValueSetId')], initialState.get('hiddenColumns'));
        map.setIn(['lockedColumns', state.get('selectedVolumeDriverValueSetId')], defaultLockedColumnsState)
          .setIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')], false)
          .setIn(['showResetButton', state.get('selectedVolumeDriverValueSetId')], false)
          .setIn(['showLockButton', state.get('selectedVolumeDriverValueSetId')], false);
      });

    case SHOW_HIDDEN_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedVolumeDriverValueSetId')], initialState.get('hiddenColumns'))
          .setIn(['showResetButton', state.get('selectedVolumeDriverValueSetId')], map.getIn(['showLockButton', state.get('selectedVolumeDriverValueSetId')]))
          .setIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')], false);
      });

    case RESET_LOCKED_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], initialState.get('columnOrder'));
        map.setIn(['lockedColumns', state.get('selectedVolumeDriverValueSetId')], defaultLockedColumnsState)
          .setIn(['showLockButton', state.get('selectedVolumeDriverValueSetId')], false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', map.get('selectedVolumeDriverValueSetId'), x]));
        map.setIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')], map.getIn(['hiddenColumns', map.get('selectedVolumeDriverValueSetId')])?.size)
          .setIn(['showResetButton', state.get('selectedVolumeDriverValueSetId')], map.getIn(['showHiddenButton', state.get('selectedVolumeDriverValueSetId')]));
      });

    case FILTER_VOLUME_DRIVER_MAPPING_VALUES_LIST: {
      return state.setIn(['filters', state.get('selectedVolumeDriverValueSetId')], action.payload)
        .set('skip', initialState.get('skip'));
    }

    case CLEAR_VOLUME_DRIVER_VALUES_LIST_FILTERS:
      return state.set('filters', initialState.get('filters'))
        .set('skip', initialState.get('skip'));

    case CLEAR_VOLUME_DRIVER_VALUES_LIST_SORTS:
      return state.set('sorts', initialState.get('sorts'));

    case REORDER_VOLUME_DRIVER_VALUES_COLUMN: {
      const {columnKey, oldIndex, newIndex} = action.payload;
      const columns = state.getIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')]);

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
        map.setIn(['columnOrder', map.get('selectedVolumeDriverValueSetId')], fromJS(reorderedColumns));
        if (destinationColumn.get('locked')) map.setIn(['lockedColumns', map.get('selectedVolumeDriverValueSetId'), columnKey], true);
        if (sourceColumn.get('locked') && !destinationColumn.get('locked')) map.deleteIn(['lockedColumns', map.get('selectedVolumeDriverValueSetId'), columnKey]);
        map.setIn(['showResetButton', state.get('selectedVolumeDriverValueSetId')], !map.getIn(['lockedColumns', map.get('selectedVolumeDriverValueSetId')]).equals(defaultLockedColumnsState) || map.getIn(['hiddenColumns', map.get('selectedVolumeDriverValueSetId')])?.size)
          .setIn(['showLockButton', map.get('selectedVolumeDriverValueSetId')], !map.getIn(['lockedColumns', map.get('selectedVolumeDriverValueSetId')]).equals(defaultLockedColumnsState))
          .set('showColumnReorderConfirmModal', false);
      });
    }

    case LOAD_VOLUME_DRIVER_VALUES_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedVolumeDriverValueSetId')], columns);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isVolumeDriverValuesLoaded') && !state.get('isGridConfigurationProcessed')) {
        return processGridConfigurationWithSelectedId(changedState, initialState);
      }
      return changedState;
    }

    case CREATE_VOLUME_DRIVER_VALUES_EXPORT_REQUEST_BACKGROUND_JOB_FULFILLED: {
      const {backgroundedJob} = action.payload.data;
      return state.set('activeVolumeDriverValuesSetExportRequestBackgroundJob', backgroundedJob);
    }

    case CANCEL_COLUMN_REORDER: {
      return state.withMutations(map =>
        map.set('showColumnReorderConfirmModal', false)
          .set('reorderedColumnDetail', initialState.get('reorderedColumnDetail'))
          .set('lastReorderedColumnModel', initialState.get('lastReorderedColumnModel'))
      );
    }

    case retrieveGridConfigurationPending(VOLUME_DRIVER_VALUES_GRID):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(VOLUME_DRIVER_VALUES_GRID):
      return state.set('loading', false);

    case retrieveGridConfigurationFulfilled(VOLUME_DRIVER_VALUES_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case 'VOLUME_DRIVER_VALUES_UPDATE_CACHED_GRID_CONFIGURATION' : {
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
