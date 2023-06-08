import {modelsArrayToMapById, processGridConfigurationWithSelectedId, reorderGridAndSidebarColumns} from '../../../shared/services';
import {Map, List, fromJS} from 'immutable';
import {
  LOAD_LOCATION_MAPPING_PAGE,
  LOAD_LOCATION_MAPPING_LIST_PENDING,
  LOAD_LOCATION_MAPPING_LIST_FULFILLED,
  LOAD_LOCATION_MAPPING_LIST_REJECTED,
  SORT_LOCATION_MAPPING_LIST,
  SELECT_LOCATION,
  CLEAR_SELECTED_LOCATION,
  CLOSE_LOCATIONS_LIST_EDIT_SIDEBAR,
  UPDATE_LOCATION_MAPPING_PENDING,
  UPDATE_LOCATION_MAPPING_FULFILLED,
  UPDATE_LOCATION_MAPPING_REJECTED,
  TOGGLE_DEPARTMENT_FOR_LOCATION_PENDING,
  TOGGLE_DEPARTMENT_FOR_LOCATION_FULFILLED,
  TOGGLE_DEPARTMENT_FOR_LOCATION_REJECTED,
  TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_PENDING,
  TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_FULFILLED,
  TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_REJECTED,
  TOGGLE_LOCATION_MAPPING_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
  FILTER_LOCATION_MAPPING_LIST,
  PAGE_LOCATION_MAPPING_LIST,
  TOGGLE_SELECT_LOCATION_MAPPING,
  SELECT_ALL_LOCATIONMAPPING_IN_LOCATION_MAPPING_LIST,
  CLEAR_LOCATION_MAPPING_FILTERS,
  CLEAR_LOCATION_MAPPING_SORTS,
  TOGGLE_LOCATION_MAPPING_COLUMN_LOCK,
  LOAD_LOCATION_MAPPING_COLUMNS,
  SHOW_HIDDEN_LOCATION_MAPPING_COLUMNS_FULFILLED,
  RESET_LOCATION_MAPPING_COLUMNS_FULFILLED,
  RESET_LOCKED_LOCATION_MAPPING_COLUMNS_FULFILLED,
  TOGGLE_LOCATION_MAPPING_COLUMN_VISIBILITY_FULFILLED,
  CANCEL_COLUMN_REORDER,
  REORDER_LOCATION_MAPPING_COLUMN,
} from '../../actions';
import {nonReorderableColumns} from '../../../shared/constants/nonReorderableColumns';
import _ from 'lodash';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected} from '../../../customizableGrid/services/gridActionBuilder';
import {LOCATION_MAPPING as LOCATION_MAPPING_GRID} from '../../../customizableGrid/constants/grids';

const defaultLockedColumnsState = Map({'name': true, 'description': true});

const initialState = Map({
  loading: false,
  saving: false,
  locations: Map(),
  departments: Map(),
  locationsDepartments: Map(),
  sorts: new List(),
  selectedLocationId: null,
  selectedDepartmentId: null,
  selectedDepartmentName: '',
  hiddenColumns: Map(),
  lockedColumns: defaultLockedColumnsState,
  columnOrder: new List(),
  showGridConfiguration: false,
  filters: new Map(),
  tablePaging: Map({skip: 0, take: 50}),
  headerSelectionValue: false,
  showResetButton: new Map(),
  showLockButton: new Map(),
  showHiddenButton: new Map(),
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
  cachedGridConfig: Map(),
  isLocationMappingLoaded: false,
  isGridConfigurationProcessed: false,
  saveCachedGridConfiguration: false,
  isCachedGridConfigurationRetrieved: false,
});


export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LOCATION_MAPPING_PAGE:
    case LOAD_LOCATION_MAPPING_LIST_PENDING:
      return state.withMutations(map =>
        map.set('loading', true)
          .set('locations', Map())
          .set('isLocationMappingLoaded', false)
          .set('saveCachedGridConfiguration', false)
      );

    case LOAD_LOCATION_MAPPING_LIST_FULFILLED: {
      const {locations, departmentId, departmentName} = action.payload.data;

      const newLocations = locations.map(obj => ({...obj, selected: false}));
      return state.withMutations(map =>
        map.set('loading', false)
          .set('locations', modelsArrayToMapById(newLocations))
          .set('selectedLocationId', null)
          .set('selectedDepartmentId', departmentId)
          .set('selectedDepartmentName', departmentName)
          .set('headerSelectionValue', false)
          .setIn(['tablePaging', 'skip'], 0))
        .setIn(['columnOrder', departmentId], initialState.get('columnOrder'))
        .setIn(['lockedColumns', departmentId], defaultLockedColumnsState)
        .setIn(['hiddenColumns', departmentId], initialState.get('hiddenColumns'))
        .set('isLocationMappingLoaded', true)
        .set('isGridConfigurationProcessed', false);
    }

    case LOAD_LOCATION_MAPPING_LIST_REJECTED:
      return state.set('loading', false);

    case SORT_LOCATION_MAPPING_LIST:
      return state.setIn(['sorts', state.get('selectedDepartmentId')], action.payload);

    case SELECT_LOCATION:
      return state.set('selectedLocationId', action.payload.get('id'));

    case CLEAR_SELECTED_LOCATION:
    {
      return state.withMutations(map =>
        map
          .set('selectedLocationId', null)
          .set('headerSelectionValue', false)
      );
    }

    case CLOSE_LOCATIONS_LIST_EDIT_SIDEBAR: {
      return state.withMutations(map =>
        map.set('selectedLocationId', null));
    }
    case UPDATE_LOCATION_MAPPING_PENDING:
    case TOGGLE_DEPARTMENT_FOR_LOCATION_PENDING:
      return state.set('saving', true);
    case TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_PENDING:
      return state.set('saving', true).set('loading', true);

    case UPDATE_LOCATION_MAPPING_REJECTED:
    case TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_REJECTED:
    case TOGGLE_DEPARTMENT_FOR_LOCATION_REJECTED:
      return state.set('saving', false).set('loading', false);

    case TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_FULFILLED: {
      const payloadLocations = action.payload.data.locations;

      return state.withMutations(map => {
        for (const location of payloadLocations) {
          const {locationId, remove} = location;
          map.setIn(['locations', locationId, 'checked'], !remove);
        }
      }).set('saving', false).set('loading', false).setIn(['tablePaging', 'skip'], 0);
    }

    case TOGGLE_DEPARTMENT_FOR_LOCATION_FULFILLED: {
      const payloadLocations = action.payload.data.locations;

      return state.withMutations(map => {
        for (const location of payloadLocations) {
          const {locationId, remove} = location;
          map.setIn(['locations', locationId, 'checked'], !remove);
        }
      }).set('saving', false).set('loading', false);
    }

    case TOGGLE_LOCATION_MAPPING_COLUMN_LOCK: {
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

    case RESET_LOCATION_MAPPING_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'));
        map.setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], false)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
      });

    case RESET_LOCKED_LOCATION_MAPPING_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', map.get('selectedDepartmentId'), x]));
        map.setIn(['showHiddenButton', state.get('selectedDepartmentId')], map.getIn(['hiddenColumns', map.get('selectedDepartmentId')])?.size)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]));
      });

    case UPDATE_LOCATION_MAPPING_FULFILLED: {
      const {locationDepartmentListEntry} = action.payload.data;

      return state.withMutations(map =>
        map.set('saving', false)
          .setIn(['locations', locationDepartmentListEntry.id], fromJS(locationDepartmentListEntry))
      );
    }

    case SHOW_HIDDEN_LOCATION_MAPPING_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showLockButton', state.get('selectedDepartmentId')]))
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false);
      });

    case REORDER_LOCATION_MAPPING_COLUMN: {
      const {columnKey, oldIndex, newIndex} = action.payload;
      const columns = state.getIn(['columnOrder', state.get('selectedDepartmentId')]);

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
        map.setIn(['columnOrder', map.get('selectedDepartmentId')], fromJS(reorderedColumns));
        if (destinationColumn.get('locked')) map.setIn(['lockedColumns', map.get('selectedDepartmentId'), columnKey], true);
        if (sourceColumn.get('locked') && !destinationColumn.get('locked')) map.deleteIn(['lockedColumns', map.get('selectedDepartmentId'), columnKey]);
        map.setIn(['showResetButton', state.get('selectedDepartmentId')], !map.getIn(['lockedColumns', map.get('selectedDepartmentId')]).equals(defaultLockedColumnsState) || map.getIn(['hiddenColumns', map.get('selectedDepartmentId')])?.size)
          .setIn(['showLockButton', map.get('selectedDepartmentId')], !map.getIn(['lockedColumns', map.get('selectedDepartmentId')]).equals(defaultLockedColumnsState))
          .set('showColumnReorderConfirmModal', false);
      });
    }


    case TOGGLE_LOCATION_MAPPING_GRID_CONFIGURATION_SIDEBAR_FULFILLED:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case TOGGLE_LOCATION_MAPPING_COLUMN_VISIBILITY_FULFILLED: {
      const {finalColumns} = action.payload;
      const toggleColumnsList = (finalColumns) ? finalColumns : new List();
      if (action.payload.visibility) {
        return state.withMutations(map => {
          map.deleteIn(['hiddenColumns', state.get('selectedDepartmentId'), action.payload.field]);
          map.setIn(['showHiddenButton', state.get('selectedDepartmentId')], state.getIn(['hiddenColumns', state.get('selectedDepartmentId')]).size > 1)
            .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]) || map.getIn(['showLockButton', state.get('selectedDepartmentId')]));
          map.setIn(['columnOrder', state.get('selectedDepartmentId')], toggleColumnsList);
        });
      }
      return state.withMutations(map => {
        const handleFilter = map => {
          if (map.getIn(['filters', state.get('selectedDepartmentId')])) {
            const filterIndex = map.getIn(['filters', state.get('selectedDepartmentId'), 'filters']).findIndex(value => value.get('field') === action.payload.field);
            if (filterIndex !== -1) {
              return map.deleteIn(['filters', state.get('selectedDepartmentId'), 'filters', filterIndex]);
            }
          }
          return map;
        };
        const handleSort = map => {
          if (map.getIn(['sorts', state.get('selectedDepartmentId')])) {
            const sortIndex = map.getIn(['sorts', state.get('selectedDepartmentId')]).findIndex(value => value.get('field') === action.payload.field);
            if (sortIndex !== -1) {
              return map.deleteIn(['sorts', state.get('selectedDepartmentId'), sortIndex]);
            }
          }
          return map;
        };
        const handleHidden = map => map.setIn(['hiddenColumns', state.get('selectedDepartmentId'), action.payload.field], action.payload.selectedColumn)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], true)
          .setIn(['columnOrder', state.get('selectedDepartmentId')], toggleColumnsList)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]));
        handleHidden(handleSort(handleFilter(map)));
      });
    }

    case LOAD_LOCATION_MAPPING_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], columns);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isLocationMappingLoaded') && !state.get('isGridConfigurationProcessed')) {
        return processGridConfigurationWithSelectedId(changedState, initialState);
      }
      return changedState;
    }

    case FILTER_LOCATION_MAPPING_LIST:
      return state.withMutations(map =>
        map.setIn(['filters', state.get('selectedDepartmentId')], (action.payload === null ? action.payload : fromJS(action.payload)))
          .update('locations', lst => lst.map(locationList => locationList.set('selected', false)))
      ).set('headerSelectionValue', false);

    case PAGE_LOCATION_MAPPING_LIST:
      return state.setIn(['tablePaging', 'skip'], action.payload);

    case TOGGLE_SELECT_LOCATION_MAPPING: {
      const index = state.get('locations').find(s => s.get('id') === action.payload.locationId);
      const newIndex = index.get('id');
      if (index === -1) throw new Error('Unknown location selected');
      return state.updateIn(['locations', newIndex, 'selected'], t => !t)
        .withMutations(map => map.setIn(['headerSelectionValue'], !map.get('locations').some(s => !s.get('selected'))));
    }

    case SELECT_ALL_LOCATIONMAPPING_IN_LOCATION_MAPPING_LIST: {
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], action.payload.selected);
        map.update('locations', locations => locations.map(locations => {
          if (action.payload.ids.includes(locations.get('id'))) {
            return locations.set('selected', action.payload.selected);
          }
          return locations.set('selected', false);
        }));
      });
    }

    case CLEAR_LOCATION_MAPPING_FILTERS:
      return state.withMutations(map =>
        map.set('filters', initialState.get('filters'))
          .update('locations', lst => lst.map(location => location.set('selected', false)))
      ).set('headerSelectionValue', false).setIn(['tablePaging', 'skip'], 0);

    case CLEAR_LOCATION_MAPPING_SORTS:
      return state.set('sorts', initialState.get('sorts'));

    case CANCEL_COLUMN_REORDER: {
      return state.withMutations(map =>
        map.set('showColumnReorderConfirmModal', false)
          .set('reorderedColumnDetail', initialState.get('reorderedColumnDetail'))
          .set('lastReorderedColumnModel', initialState.get('lastReorderedColumnModel'))
      );
    }

    case retrieveGridConfigurationPending(LOCATION_MAPPING_GRID):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(LOCATION_MAPPING_GRID):
      return state.set('loading', false);

    case retrieveGridConfigurationFulfilled(LOCATION_MAPPING_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case 'LOCATION_MAPPING_UPDATE_CACHED_GRID_CONFIGURATION' : {
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
