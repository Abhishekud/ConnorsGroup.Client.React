import {fromJS, List, Map} from 'immutable';
import {
  LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_PENDING,
  LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_FULFILLED,
  LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_REJECTED,
  PAGE_LOCATIONS_STANDARDS_EXPORT_LIST,
  TOGGLE_LOCATIONS_STANDARDS_EXPORT_GRID_CONFIGURATION_SIDEBAR,
  TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_VISIBILITY_FULFILLED,
  REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN,
  FILTER_LOCATIONS_STANDARDS_EXPORT_LIST_FULFILLED,
  SET_LOCATIONS_STANDARDS_DATA_SOURCE,
  LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_PENDING,
  LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_FULFILLED,
  LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_REJECTED,
  TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_LOCK,
  LOAD_LOCATION_STANDARDS_EXPORT_COLUMNS,
  RESET_LOCKED_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED,
  RESET_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED,
  SHOW_HIDDEN_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED,
  CLEAR_LOCATIONS_STANDARDS_EXPORT_LIST_FILTERS_FULFILLED,
  CANCEL_COLUMN_REORDER,
  LOAD_LOCATIONS_STANDARDS_EXPORT_PAGE,
  TOGGLE_SAVE_CACHED_GRID_CONFIG_FULFILLED,
  SET_IS_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST,
} from '../../actions';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions';
import {
  FixedVariableCell,
  NumericFilterCell,
  FixedVariableFilterCell,
  DateCell,
} from '../../../customizableGrid/components';
import {modelsArrayToOrderedMapById, processGridConfigurationWithSelectedId, reorderGridAndSidebarColumns} from '../../../shared/services';
import {DRAFT} from '../../constants/DataSources';
import _ from 'lodash';
import {nonReorderableColumns} from '../../../shared/constants/nonReorderableColumns';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected} from '../../../customizableGrid/services/gridActionBuilder';
import {LOCATIONS_STANDARDS_EXPORT as LOCATIONS_STANDARDS_EXPORT_GRID} from '../../../customizableGrid/constants/grids';

const initialState = Map({
  loading: false,
  loadingCount: false,
  locationsStandardsExportData: List(),
  totalRows: 0,
  filters: new Map(),
  skip: 0,
  take: 50,
  columns: modelsArrayToOrderedMapById([
    {field: 'locationName', title: 'Location', width: 200},
    {field: 'locationDescription', title: 'Location Description', width: 200},
    {field: 'departmentName', title: 'Department', width: 200},
    {field: 'jobClassName', title: 'Job Class', width: 200},
    {field: 'laborCategoryName', title: 'Labor Category', width: 200},
    {field: 'classificationName', title: 'Classification', width: 200},
    {field: 'characteristicSetName', title: 'Characteristic Set', width: 200},
    {field: 'volumeDriverMappingSetName', title: 'Mapping', width: 200},
    {field: 'fixed', title: 'Fixed/Variable', cell: FixedVariableCell, filterCell: FixedVariableFilterCell, width: 200},
    {field: 'attributeName', title: 'Attribute', width: 200},
    {field: 'volumeDriverName', title: 'Volume Driver', width: 200},
    {field: 'volumeDriverMappingSetValue', title: 'UOM-Volume Calculation', width: 200, filter: 'numeric'},
    {field: 'unitOfMeasureName', title: 'Unit of Measure', width: 200},
    {field: 'standardId', title: 'Standard ID', width: 200, filter: 'numeric', filterCell: NumericFilterCell},
    {field: 'standardName', title: 'Standard Name', width: 200},
    {field: 'standardMinutes', title: 'Standard Time', width: 200, filterable: false},
    {field: 'standardRate', title: 'Rate', width: 200, filterable: false},
    {field: 'volumeDriverStandardMinutes', title: 'Volume Driver Standard Time', width: 200, filterable: false},
    {field: 'volumeDriverSampleValue', title: 'Volume Driver Sample Value', width: 200, filterable: false},
    {field: 'volumeDriverSampleValueStandardMinutes', title: 'Volume Driver Sample Value Standard Time', width: 200, filterable: false},
    {field: 'standardEffectiveStartDate', width: 200, title: 'Effective Start Date', filterable: false, cell: DateCell},
    {field: 'standardEffectiveEndDate', width: 200, title: 'Effective End Date', filterable: false, cell: DateCell},
  ], 'field'),
  columnOrder: new Map(),
  backgroundJobStarted: false,
  activeBackgroundJobs: false,
  showGridConfiguration: false,
  dataSource: DRAFT,
  lockedColumns: new Map(),
  showResetButton: Map(),
  showHiddenButton: Map(),
  showLockButton: Map(),
  hiddenColumns: Map(),
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  cachedGridConfig: Map(),
  isLocationsStandardsExportLoaded: false,
  isGridConfigurationProcessed: false,
  isCachedGridConfigurationRetrieved: false,
  saveCachedGridConfiguration: false,
  retrieveGridConfigurationRejected: false,
  shouldLoadLocationsStandardsColumns: false,
  isExportStandardsAndVolumeDriversByLocationsRequest: false,
  backgroundJobStatus: List(),
});

const LOCATIONS_STANDARDS_EXPORT_UPDATE_CACHED_GRID_CONFIGURATION = 'LOCATIONS_STANDARDS_EXPORT_UPDATE_CACHED_GRID_CONFIGURATION';
export function buildState(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_SAVE_CACHED_GRID_CONFIG_FULFILLED:
      return state.withMutations(map =>
        map.set('saveCachedGridConfiguration', false)
          .set('isLocationsStandardsExportLoaded', false));

    case LOAD_LOCATIONS_STANDARDS_EXPORT_PAGE:
      return state.withMutations(map => {
        map.set('loading', true)
          .set('saveCachedGridConfiguration', false);
      });

    case LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_PENDING:
      return state.withMutations(map =>
        map.set('saveCachedGridConfiguration', false)
          .set('isLocationsStandardsExportLoaded', false));


    case LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_FULFILLED: {
      const {locationStandards} = action.payload.data;
      return state.withMutations(map =>
        map.set('backgroundJobStarted', false)
          .set('locationsStandardsExportData', fromJS(locationStandards).map(x => x.flatten()))
          .set('skip', initialState.get('skip'))
          .setIn(['columnOrder', state.get('dataSource')], initialState.get('columnOrder'))
          .setIn(['lockedColumns', state.get('dataSource')], initialState.get('lockedColumns'))
          .setIn(['hiddenColumns', state.get('dataSource')], initialState.get('hiddenColumns'))
          .set('isLocationsStandardsExportLoaded', true)
          .set('isGridConfigurationProcessed', false)
          .set('saveCachedGridConfiguration', false)
          .set('shouldLoadLocationsStandardsColumns', true)
      );
    }

    case LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_REJECTED:
      return state.set('loading', false);

    case LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_PENDING:
      return state.set('loadingCount', true);

    case LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_FULFILLED: {
      return state.withMutations(map =>
        map.set('loadingCount', false)
          .set('totalRows', action.payload.data)
      );
    }

    case LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_REJECTED:
      return state.set('loadingCount', false);

    case FILTER_LOCATIONS_STANDARDS_EXPORT_LIST_FULFILLED: {
      return state.setIn(['filters', state.get('dataSource')], action.payload ?? null).set('skip', initialState.get('skip'));
    }

    case PAGE_LOCATIONS_STANDARDS_EXPORT_LIST:
      return state.set('skip', action.payload);

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobStatus} = action.payload.data;

      return state.withMutations(map => {
        if (activeJobs) {
          map.set('backgroundJobStarted', true);
        }
        map.set('activeBackgroundJobs', activeJobs)
          .set('backgroundJobStatus', backgroundJobStatus);
      });
    }

    case TOGGLE_LOCATIONS_STANDARDS_EXPORT_GRID_CONFIGURATION_SIDEBAR:
      return state.update('showGridConfiguration', v => !v);

    case TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_VISIBILITY_FULFILLED: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();
      const dataSource = state.get('dataSource');
      let idx = null;
      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', dataSource, action.payload.field])
            .setIn(['showHiddenButton', dataSource], state.getIn(['hiddenColumns', dataSource]).size > 1)
            .setIn(['showResetButton', dataSource], map.getIn(['showHiddenButton', dataSource]) || map.getIn(['showLockButton', dataSource]))
            .setIn(['columnOrder', dataSource], toggleColumnsList);
        });
      }

      if (state.getIn(['filters', dataSource])) {
        idx = state.getIn(['filters', dataSource, 'filters']).findIndex(value => value.get('field') === action.payload.field);
      }
      return state.withMutations(s => {
        if (idx !== -1 && idx !== null) {
          s.deleteIn(['filters', dataSource, 'filters', idx]);
        }
        s.setIn(['hiddenColumns', dataSource, action.payload.field], action.payload.selectedColumn)
          .setIn(['showHiddenButton', dataSource], true)
          .setIn(['columnOrder', dataSource], toggleColumnsList)
          .setIn(['showResetButton', dataSource], s.getIn(['showHiddenButton', dataSource]));
      });
    }

    case TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_LOCK: {
      const {finalColumns} = action.payload;
      const finalColumnsOrder = (finalColumns) ? finalColumns : new List();
      const dataSource = state.get('dataSource');
      return state.withMutations(map => {
        if (action.payload.value) {
          map.setIn(['lockedColumns', dataSource, action.payload.field], action.payload.value);
          map.setIn(['columnOrder', dataSource], finalColumnsOrder);
        } else {
          map.deleteIn(['lockedColumns', dataSource, action.payload.field]);
          map.setIn(['columnOrder', dataSource], finalColumnsOrder);
        }
        if (map.getIn(['lockedColumns', dataSource]).equals(initialState.get('lockedColumns'))) {
          map.setIn(['showLockButton', dataSource], false);
        } else {
          map.setIn(['showLockButton', dataSource], true);
        }
        map.setIn(['showResetButton', dataSource], map.getIn(['showLockButton', dataSource]));
      });
    }

    case RESET_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED: {
      const dataSource = state.get('dataSource');
      return state.withMutations(map => {
        map.setIn(['columnOrder', dataSource], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', dataSource], initialState.get('hiddenColumns'));
        map.setIn(['lockedColumns', dataSource], initialState.get('lockedColumns'))
          .setIn(['showHiddenButton', dataSource], false)
          .setIn(['showResetButton', dataSource], false)
          .setIn(['showLockButton', dataSource], false)
          .set('isGridConfigurationProcessed', true);
      });
    }
    case RESET_LOCKED_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED: {
      const dataSource = state.get('dataSource');
      return state.withMutations(map => {
        map.setIn(['columnOrder', dataSource], initialState.get('columnOrder'));
        map.setIn(['lockedColumns', dataSource], initialState.get('lockedColumns'))
          .setIn(['showLockButton', dataSource], false);
        initialState.get('lockedColumns').keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', map.get('dataSource'), x]));
        map.setIn(['showHiddenButton', dataSource], map.getIn(['hiddenColumns', map.get('dataSource')])?.size)
          .setIn(['showResetButton', dataSource], map.getIn(['showHiddenButton', dataSource]))
          .set('isGridConfigurationProcessed', true);
      });
    }

    case SHOW_HIDDEN_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED: {
      const dataSource = state.get('dataSource');
      return state.withMutations(map => {
        map.setIn(['columnOrder', dataSource], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', dataSource], initialState.get('hiddenColumns'))
          .setIn(['showResetButton', dataSource], map.getIn(['showLockButton', dataSource]))
          .setIn(['showHiddenButton', dataSource], false)
          .set('isGridConfigurationProcessed', true);
      });
    }

    case REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN: {
      const {columnKey, oldIndex, newIndex} = action.payload;
      const dataSource = state.get('dataSource');
      const columns = state.getIn(['columnOrder', dataSource]);

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
        map.setIn(['columnOrder', map.get('dataSource')], fromJS(reorderedColumns));
        if (destinationColumn.get('locked')) map.setIn(['lockedColumns', map.get('dataSource'), columnKey], true);
        if (sourceColumn.get('locked') && !destinationColumn.get('locked')) map.deleteIn(['lockedColumns', map.get('dataSource'), columnKey]);
        map.setIn(['showResetButton', dataSource], !map.getIn(['lockedColumns', map.get('dataSource')]).equals(initialState.get('lockedColumns')) || map.getIn(['hiddenColumns', map.get('dataSource')])?.size)
          .setIn(['showLockButton', map.get('dataSource')], !map.getIn(['lockedColumns', map.get('dataSource')]).equals(initialState.get('lockedColumns')))
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

    case SET_LOCATIONS_STANDARDS_DATA_SOURCE:
      return state.withMutations(map => {
        map.set('dataSource', action.payload.dataSource)
          .set('saveCachedGridConfiguration', false)
          .set('isLocationsStandardsExportLoaded', false);
      });

    case CLEAR_LOCATIONS_STANDARDS_EXPORT_LIST_FILTERS_FULFILLED:
      return state.set('filters', initialState.get('filters')).set('skip', initialState.get('skip'));

    case LOAD_LOCATION_STANDARDS_EXPORT_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.setIn(['columnOrder', state.get('dataSource')], columns)
          .set('shouldLoadLocationsStandardsColumns', false);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isLocationsStandardsExportLoaded') && !state.get('isGridConfigurationProcessed')) {
        const finalState = processGridConfigurationWithSelectedId(changedState, initialState);
        const showLoading = !(_.isEqual(state.getIn(['filters', state.get('dataSource')]) ?? null, finalState.getIn(['filters', finalState.get('dataSource')]) ?? null));
        return finalState.set('loading', showLoading);
      }
      return changedState;
    }

    case retrieveGridConfigurationPending(LOCATIONS_STANDARDS_EXPORT_GRID):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(LOCATIONS_STANDARDS_EXPORT_GRID):
      return state.withMutations(map =>
        map.set('loading', false)
          .set('retrieveGridConfigurationRejected', true));

    case retrieveGridConfigurationFulfilled(LOCATIONS_STANDARDS_EXPORT_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case LOCATIONS_STANDARDS_EXPORT_UPDATE_CACHED_GRID_CONFIGURATION : {
      const updatedConfiguration = action.payload;
      if (!_.isEqual(updatedConfiguration, state.get('cachedGridConfig')?.toJS()) && state.get('saveCachedGridConfiguration')) {
        return state.set('cachedGridConfig', fromJS(updatedConfiguration));
      }
      return state;
    }

    case SET_IS_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST:
      return state.set('isExportStandardsAndVolumeDriversByLocationsRequest', action.payload);

    default:
      return state;
  }
}

export default buildState;
