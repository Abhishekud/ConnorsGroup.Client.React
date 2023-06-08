import {fromJS, List, Map} from 'immutable';
import {processGridConfigurationWithSelectedId, modelsArrayToMapById, reorderGridAndSidebarColumns} from '../../../shared/services';
import {addValueToVolumeDriverMapping} from '../../services';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions';
import {VOLUME_DRIVER_MAPPINGS_IMPORTER} from '../../../shared/constants/backgroundJobs';
import {
  LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED,
  LOAD_VOLUME_DRIVER_MAPPINGS_LIST_REJECTED,
  SORT_VOLUME_DRIVER_MAPPINGS_LIST,
  CREATE_VOLUME_DRIVER_MAPPING_FULFILLED,
  DELETE_VOLUME_DRIVER_MAPPING_FULFILLED,
  UPDATE_VOLUME_DRIVER_MAPPING_FULFILLED,
  SELECT_VOLUME_DRIVER_MAPPING,
  CLEAR_SELECTED_VOLUME_DRIVER_MAPPING,
  CLOSE_VOLUME_DRIVER_MAPPINGS_LIST_EDIT_SIDEBAR,
  CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  UPDATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  DELETE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  FILTER_VOLUME_DRIVER_MAPPING_LIST,
  REORDER_VOLUME_DRIVER_MAPPING_GRID_COLUMNS,
  TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_VISIBILITY,
  TOGGLE_SELECT_VOLUME_DRIVER_MAPPING,
  TOGGLE_VOLUME_DRIVER_MAPPING_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
  CLEAR_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS,
  CLEAR_VOLUME_DRIVER_MAPPINGS_LIST_SORTS,
  TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_LOCK,
  LOAD_VOLUME_DRIVER_MAPPING_COLUMNS,
  RESET_LOCKED_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED,
  REORDER_VOLUME_DRIVER_MAPPING_COLUMN,
  RESET_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED,
  SHOW_HIDDEN_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED,
  CREATE_VOLUME_DRIVER_MAPPING_SET_PENDING,
  CREATE_VOLUME_DRIVER_MAPPING_SET_REJECTED,
  DELETE_VOLUME_DRIVER_MAPPING_SET_PENDING,
  DELETE_VOLUME_DRIVER_MAPPING_SET_REJECTED,
  UPDATE_VOLUME_DRIVER_MAPPING_SET_PENDING,
  UPDATE_VOLUME_DRIVER_MAPPING_SET_REJECTED,
  CANCEL_COLUMN_REORDER,
  LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_PENDING,
  LOAD_VOLUME_DRIVER_MAPPINGS_LIST_FULFILLED,
} from '../../actions';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected} from '../../../customizableGrid/services/gridActionBuilder';
import {VOLUME_DRIVER_MAPPINGS as VOLUME_DRIVER_MAPPINGS_GRID} from '../../../customizableGrid/constants/grids';
import _ from 'lodash';

const defaultLockedColumnsState = Map({volumeDriverName: true, unitOfMeasureName: true});
const noFromJS = true;
const initialState = new Map({
  loading: false,
  sorts: new List(),
  filters: new Map(),
  hiddenColumns: Map(),
  lockedColumns: defaultLockedColumnsState,
  columnOrder: List(),
  volumeDriverMappings: new Map(),
  volumeDriverMappingSets: new List(),
  selectedVolumeDriverMappingId: null,
  selectedDepartmentId: null,
  showGridConfiguration: false,
  showResetButton: new Map(),
  showHiddenButton: new Map(),
  showLockButton: new Map(),
  saving: false,
  cachedGridConfig: Map(),
  isVolumeDriverMappingsLoaded: false,
  isGridConfigurationProcessed: false,
  saveCachedGridConfiguration: false,
  isCachedGridConfigurationRetrieved: false,
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  activeBackgroundJobs: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_VOLUME_DRIVER_MAPPINGS_LIST_FULFILLED:
      return state.withMutations(map => {
        if (state.get('isGridConfigurationProcessed') && state.get('isVolumeDriverMappingsLoaded')) {
          map.set('loading', false)
            .set('saving', false);
        }
      });

    case LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_PENDING:
      return state.withMutations(map => map.set('isVolumeDriverMappingsLoaded', false)
        .set('saving', true) // To call the LOAD_VOLUME_DRIVER_MAPPING_COLUMNS if we import the volume driver mappings.
        .set('loading', true)
        .set('saveCachedGridConfiguration', false));

    case LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED: {
      const {departmentId, volumeDriverMappingSets} = action.payload.data;
      return state.withMutations(map =>
        map
          .set('selectedDepartmentId', departmentId)
          .set('volumeDriverMappingSets', fromJS(volumeDriverMappingSets))
          .setIn(['columnOrder', departmentId], initialState.get('columnOrder'))
          .setIn(['lockedColumns', departmentId], defaultLockedColumnsState)
          .setIn(['hiddenColumns', departmentId], initialState.get('hiddenColumns'))
          .set('isVolumeDriverMappingsLoaded', true)
          .set('isGridConfigurationProcessed', false));
    }

    case LOAD_VOLUME_DRIVER_MAPPINGS_LIST_REJECTED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('saving', false));

    case TOGGLE_VOLUME_DRIVER_MAPPING_GRID_CONFIGURATION_SIDEBAR_FULFILLED:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case CREATE_VOLUME_DRIVER_MAPPING_FULFILLED:
    case UPDATE_VOLUME_DRIVER_MAPPING_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['volumeDriverMappings', data.id], fromJS(data));
    }

    case DELETE_VOLUME_DRIVER_MAPPING_FULFILLED:
      return state.deleteIn(['volumeDriverMappings', action.payload.data]);

    case SORT_VOLUME_DRIVER_MAPPINGS_LIST: {
      return state.setIn(['sorts', state.get('selectedDepartmentId')], action.payload);
    }

    case FILTER_VOLUME_DRIVER_MAPPING_LIST: {
      return state.setIn(['filters', state.get('selectedDepartmentId')], action.payload);
    }

    case SELECT_VOLUME_DRIVER_MAPPING: {
      const {volumeDriverMapping, volumeDriverSetId, columnName} = action.payload;

      return state.withMutations(map =>
        map.set('selectedVolumeDriverMappingId', volumeDriverMapping.get('id'))
          .set('selectedVolumeDriverMappingSetId', volumeDriverSetId)
          .set('columnName', columnName));
    }

    case CLEAR_SELECTED_VOLUME_DRIVER_MAPPING:
    case CLOSE_VOLUME_DRIVER_MAPPINGS_LIST_EDIT_SIDEBAR:
      return state.set('selectedVolumeDriverMappingId', null);

    case CREATE_VOLUME_DRIVER_MAPPING_SET_PENDING:
      return state.withMutations(map =>
        map.set('saving', true)
          .set('saveCachedGridConfiguration', false)
      );

    case CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const {volumeDriverMappingSet, volumeDriverMappingValues} = action.payload.data;

      return state.withMutations(map => {
        map.update('volumeDriverMappingSets', vdmss => vdmss.push(fromJS(volumeDriverMappingSet)));
        const volumeDriverMappingValuesByVolumeDriverMappingId = modelsArrayToMapById(volumeDriverMappingValues, 'volumeDriverMappingId');
        map.update('volumeDriverMappings', volumeDriverMappings => volumeDriverMappings
          .map(volumeDriverMapping => addValueToVolumeDriverMapping(volumeDriverMapping, volumeDriverMappingValuesByVolumeDriverMappingId)));
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .set('isGridConfigurationProcessed', false)
          .set('saving', false);
      });
    }

    case CREATE_VOLUME_DRIVER_MAPPING_SET_REJECTED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('saveCachedGridConfiguration', false)
      );

    case UPDATE_VOLUME_DRIVER_MAPPING_SET_PENDING:
      return state.withMutations(map =>
        map.set('saving', true)
          .set('saveCachedGridConfiguration', false)
      );

    case UPDATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const volumeDriverMappingSet = action.payload.data;

      return state.withMutations(map => {
        map.update('volumeDriverMappingSets', vdmss => {
          const index = vdmss.findIndex(vdms => vdms.get('id') === volumeDriverMappingSet.id);
          return vdmss.set(index, fromJS(volumeDriverMappingSet));
        });
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .set('isGridConfigurationProcessed', false)
          .set('saving', false);
      });
    }

    case UPDATE_VOLUME_DRIVER_MAPPING_SET_REJECTED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('saveCachedGridConfiguration', true));

    case REORDER_VOLUME_DRIVER_MAPPING_GRID_COLUMNS: {
      const {finalColumns} = action.payload;
      const reorderColumnsList = (finalColumns) ? finalColumns : new List();
      return state.setIn(['columnOrder', state.get('selectedDepartmentId')], reorderColumnsList);
    }

    case TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_VISIBILITY: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();

      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', state.get('selectedDepartmentId'), action.payload.field]);
          map.setIn(['showHiddenButton', state.get('selectedDepartmentId')], state.getIn(['hiddenColumns', state.get('selectedDepartmentId')]).size > 1)
            .setIn(['showResetButton', state.get('selectedDepartmentId')],
              map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]) ||
            map.getIn(['showLockButton', state.get('selectedDepartmentId')]));
          map.setIn(['columnOrder', state.get('selectedDepartmentId')], toggleColumnsList);
        });
      }
      return state.withMutations(map => {
        const handleFilter = map => {
          if (map.getIn(['filters', state.get('selectedDepartmentId')])) {
            const filterIndex = map.getIn(['filters', state.get('selectedDepartmentId'), 'filters']).findIndex(value => value.field === action.payload.field);
            if (filterIndex !== -1) {
              return map.deleteIn(['filters', state.get('selectedDepartmentId'), 'filters', filterIndex]);
            }
          }
          return map;
        };
        const handleSort = map => {
          if (map.getIn(['sorts', state.get('selectedDepartmentId')])) {
            const sortIndex = map.getIn(['sorts', state.get('selectedDepartmentId')]).findIndex(value => value.field === action.payload.field);
            if (sortIndex !== -1) {
              return map.deleteIn(['sorts', state.get('selectedDepartmentId'), sortIndex]);
            }
          }
          return map;
        };
        const handleHidden = map => map.setIn(['hiddenColumns', state.get('selectedDepartmentId'), action.payload.field], action.payload.selectedColumn)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], true)
          .setIn(['columnOrder', state.get('selectedDepartmentId')], toggleColumnsList)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], true);
        handleHidden(handleSort(handleFilter(map)));
      });
    }

    case TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_LOCK: {
      const {finalColumns} = action.payload;
      const finalColumnsOrder = (finalColumns) ? finalColumns : new List();
      return state.withMutations(map => {
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
      });
    }

    case RESET_LOCKED_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', map.get('selectedDepartmentId'), x]));
        map.setIn(['showHiddenButton', state.get('selectedDepartmentId')], map.getIn(['hiddenColumns', map.get('selectedDepartmentId')])?.size)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]));
      });

    case RESET_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'));
        map.setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], false)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
      });

    case SHOW_HIDDEN_VOLUME_DRIVER_MAPPING_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showLockButton', state.get('selectedDepartmentId')]))
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false);
      });

    case DELETE_VOLUME_DRIVER_MAPPING_SET_PENDING: {
      return state.withMutations(map =>
        map.set('saving', true)
          .set('saveCachedGridConfiguration', false)
      );
    }

    case DELETE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const {volumeDriverMappingSetId: vdmsId} = action.payload.data;

      return state.withMutations(map => {
        map.update('volumeDriverMappings', volumeDriverMappings =>
          volumeDriverMappings.map(vdm =>
            vdm.update('values', vdmSetValues => {
              const deletedIndex = vdmSetValues.findIndex(v => v.get('volumeDriverMappingSetId') === vdmsId);
              return deletedIndex >= 0 ? vdmSetValues.delete(deletedIndex) : vdmSetValues;
            })));

        map.update('volumeDriverMappingSets', vdmss => {
          const tempVdmss = vdmss;

          const deletedIndex = tempVdmss.findIndex(vdms => vdms.get('id') === vdmsId);
          return tempVdmss.delete(deletedIndex);
        });
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .set('isGridConfigurationProcessed', false)
          .set('saving', false);
      });
    }

    case DELETE_VOLUME_DRIVER_MAPPING_SET_REJECTED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('saveCachedGridConfiguration', true));

    case TOGGLE_SELECT_VOLUME_DRIVER_MAPPING: {
      const index = state
        .get('volumeDriverMappings')
        .find(s => s.get('id') === action.payload.selectVolumeDriverMappingId);
      const newIndex = index.get('id');
      if (index === -1) throw new Error('Unknown volume Driver Mappings');
      return state.updateIn(['volumeDriverMappings', newIndex, 'selected'], t => !t)
        .withMutations(map => map.setIn(['headerSelectionValue'], !map.get('volumeDriverMappings').some(s => !s.get('selected'))));
    }

    case CLEAR_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS:
      return state.set('filters', initialState.get('filters'));

    case CLEAR_VOLUME_DRIVER_MAPPINGS_LIST_SORTS:
      return state.set('sorts', initialState.get('sorts'));

    case REORDER_VOLUME_DRIVER_MAPPING_COLUMN: {
      const {columnKey, oldIndex, newIndex} = action.payload;
      const columns = state.getIn(['columnOrder', state.get('selectedDepartmentId')]);

      // For avoiding reorder on hidden columns
      const lastOrderIndex = _.maxBy(columns.toJS(), 'orderIndex').orderIndex;

      const destinationColumn = columns.find(c => c.get('orderIndex') === newIndex);
      const sourceColumn = columns.find(c => c.get('orderIndex') === oldIndex);

      if (lastOrderIndex < newIndex ||
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

      return state.withMutations(map => {
        map.setIn(['columnOrder', map.get('selectedDepartmentId')], fromJS(reorderedColumns));
        if (destinationColumn.get('locked')) map.setIn(['lockedColumns', map.get('selectedDepartmentId'), columnKey], true);
        if (sourceColumn.get('locked') && !destinationColumn.get('locked')) map.deleteIn(['lockedColumns', map.get('selectedDepartmentId'), columnKey]);
        map.setIn(['showResetButton', state.get('selectedDepartmentId')], !map.getIn(['lockedColumns', map.get('selectedDepartmentId')]).equals(defaultLockedColumnsState) || map.getIn(['hiddenColumns', map.get('selectedDepartmentId')])?.size)
          .setIn(['showLockButton', map.get('selectedDepartmentId')], !map.getIn(['lockedColumns', map.get('selectedDepartmentId')]).equals(defaultLockedColumnsState))
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

    case LOAD_VOLUME_DRIVER_MAPPING_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], columns);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isVolumeDriverMappingsLoaded') && !state.get('isGridConfigurationProcessed')) {
        const finalState = processGridConfigurationWithSelectedId(changedState, initialState, noFromJS);
        if (!finalState.getIn(['filters', finalState.get('selectedDepartmentId'), 'filters'])?.length && !finalState.getIn(['sorts', finalState.get('selectedDepartmentId')])?.length) {
          finalState.set('loading', false);
        }
        return finalState;
      }
      return changedState;
    }

    case retrieveGridConfigurationPending(VOLUME_DRIVER_MAPPINGS_GRID):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(VOLUME_DRIVER_MAPPINGS_GRID):
      return state.set('loading', false);

    case retrieveGridConfigurationFulfilled(VOLUME_DRIVER_MAPPINGS_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case 'VOLUME_DRIVER_MAPPINGS_UPDATE_CACHED_GRID_CONFIGURATION' : {
      const updatedConfiguration = action.payload;
      if (!_.isEqual(updatedConfiguration, state.get('cachedGridConfig')?.toJS()) && state.get('saveCachedGridConfiguration')) {
        return state.set('cachedGridConfig', fromJS(updatedConfiguration));
      }
      return state;
    }

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(VOLUME_DRIVER_MAPPINGS_IMPORTER)) {
        return state.withMutations(map => {
          map.set('activeBackgroundJobs', activeJobs);
        });
      }
      return state;
    }

    default:
      return state;
  }
}
