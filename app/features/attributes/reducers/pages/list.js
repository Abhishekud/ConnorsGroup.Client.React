import {modelsArrayToMapById, reorderGridAndSidebarColumns, processGridConfigurationWithSelectedId} from '../../../shared/services';
import {Map, List, fromJS} from 'immutable';
import {createLocationsAttributesMap} from '../../services';
import {
  LOAD_ATTRIBUTES_PAGE,
  LOAD_LOCATION_ATTRIBUTES_LIST_PENDING,
  LOAD_LOCATION_ATTRIBUTES_LIST_FULFILLED,
  LOAD_LOCATION_ATTRIBUTES_LIST_REJECTED,
  UPDATE_LOCATIONS_ATTRIBUTE_PENDING,
  UPDATE_LOCATIONS_ATTRIBUTE_FULFILLED,
  UPDATE_LOCATIONS_ATTRIBUTE_REJECTED,
  SORT_ATTRIBUTES_LIST,
  PAGE_ATTRIBUTES_LIST,
  FILTER_ATTRIBUTES_LIST,
  CREATE_ATTRIBUTE_FULFILLED,
  DELETE_ATTRIBUTE_FULFILLED,
  UPDATE_ATTRIBUTE_FULFILLED,
  TOGGLE_GRID_CONFIGURATION_SIDEBAR,
  TOGGLE_ATTRIBUTES_COLUMN_VISIBILITY_FULFILLED,
  CLEAR_ATTRIBUTES_LIST_FILTERS,
  CLEAR_ATTRIBUTES_LIST_SORTS,
  TOGGLE_ATTRIBUTES_COLUMN_LOCK,
  RESET_ATTRIBUTES_COLUMNS_FULFILLED, //RESET_ATTRIBUTES_GRID_CONFIGURATION,
  SHOW_HIDDEN_ATTRIBUTES_FULFILLED,
  LOAD_ATTRIBUTES_COLUMNS,
  REORDER_ATTRIBUTES_COLUMN,
  RESET_LOCKED_ATTRIBUTES_COLUMNS_FULFILLED,
  UPDATE_ATTRIBUTE_PENDING,
  CREATE_ATTRIBUTE_PENDING,
  DELETE_ATTRIBUTE_PENDING,
  DELETE_ATTRIBUTE_REJECTED,
  UPDATE_ATTRIBUTE_REJECTED,
  CREATE_ATTRIBUTE_REJECTED,
  CANCEL_COLUMN_REORDER,
} from '../../actions';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions/index';
import {LOCATION_ATTRIBUTE_IMPORTER} from '../../../shared/constants/backgroundJobs';
import {retrieveGridConfigurationFulfilled, retrieveGridConfigurationPending, retrieveGridConfigurationRejected} from '../../../customizableGrid/services/gridActionBuilder';
import {ATTRIBUTES as ATTRIBUTES_GRID} from '../../../customizableGrid/constants/grids';
import _ from 'lodash';

const defaultLockedColumnsState = Map({'name': true, 'description': true});

const initialState = Map({
  loading: false,
  saving: false,
  locations: Map(),
  attributes: Map(),
  locationsAttributes: Map(),
  sorts: new List(),
  filters: new Map(),
  selectedDepartmentId: null,
  showGridConfiguration: false,
  columnOrder: new List(),
  hiddenColumns: Map(),
  lockedColumns: defaultLockedColumnsState,
  tablePaging: Map({skip: 0, take: 50}),
  hideClearFiltersButton: true,
  activeBackgroundJobs: false,
  backgroundJobStarted: false,
  showResetButton: Map(),
  showHiddenButton: Map(),
  showLockButton: Map(),
  cachedGridConfig: Map(),
  isAttributesLoaded: false,
  isGridConfigurationProcessed: false,
  saveCachedGridConfiguration: false,
  isCachedGridConfigurationRetrieved: false,
  reorderedColumnDetail: Map(), // Contain column
  showColumnReorderConfirmModal: false,
  lastReorderedColumnModel: Map(), // Contains columnKey, oldIndex and newIndex
});


export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_ATTRIBUTES_PAGE:
    case LOAD_LOCATION_ATTRIBUTES_LIST_PENDING:
      return state.withMutations(map =>
        map.set('loading', true)
          .set('isAttributesLoaded', false)
          .set('saving', true) // To call the LOAD_ATTRIBUTES_COLUMNS if we import the attributes.
          .set('saveCachedGridConfiguration', false));

    case LOAD_LOCATION_ATTRIBUTES_LIST_FULFILLED: {
      const {departmentId, locations, attributes, locationsAttributes} = action.payload.data;
      return state.withMutations(map =>
        map.set('loading', false)
          .set('saving', false)
          .set('selectedDepartmentId', departmentId)
          .set('locations', modelsArrayToMapById(locations))
          .set('attributes', modelsArrayToMapById(attributes))
          .set('locationsAttributes', createLocationsAttributesMap(locationsAttributes))
          .set('hideClearFiltersButton', !map.getIn(['filters', departmentId]))
          .set('backgroundJobStarted', false)
          .setIn(['tablePaging', 'skip'], 0))
        .setIn(['columnOrder', departmentId], initialState.get('columnOrder'))
        .setIn(['lockedColumns', departmentId], defaultLockedColumnsState)
        .setIn(['hiddenColumns', departmentId], initialState.get('hiddenColumns'))
        .set('isAttributesLoaded', true)
        .set('isGridConfigurationProcessed', false);
    }

    case LOAD_LOCATION_ATTRIBUTES_LIST_REJECTED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('saving', false));

    case CREATE_ATTRIBUTE_PENDING: {
      return state.withMutations(map =>
        map.set('saving', true)
          .set('saveCachedGridConfiguration', false)
      );
    }

    case CREATE_ATTRIBUTE_FULFILLED: {
      const {id, name, departmentId} = action.payload.data;
      return state.withMutations(map =>
        map.setIn(['attributes', id], Map({id, name, departmentId}))
          .set('saving', false)
          .setIn(['columnOrder', map.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .set('isGridConfigurationProcessed', false)
      );
    }

    case CREATE_ATTRIBUTE_REJECTED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('saveCachedGridConfiguration', true));

    case UPDATE_ATTRIBUTE_PENDING: {
      return state.withMutations(map =>
        map.set('saving', true)
          .set('saveCachedGridConfiguration', false)
      );
    }

    case UPDATE_ATTRIBUTE_FULFILLED: {
      const {id, name} = action.payload.data;

      return state.withMutations(map =>
        map.setIn(['attributes', id, 'name'], name)
          .set('saving', false)
          .setIn(['columnOrder', map.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .set('isGridConfigurationProcessed', false)
      );
    }

    case UPDATE_ATTRIBUTE_REJECTED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('saveCachedGridConfiguration', true));

    case DELETE_ATTRIBUTE_PENDING: {
      return state.withMutations(map =>
        map.set('saving', true)
          .set('saveCachedGridConfiguration', false)
      );
    }

    case DELETE_ATTRIBUTE_FULFILLED: {
      const {data} = action.payload;

      return state.withMutations(map => {
        map.deleteIn(['attributes', data])
          .setIn(['columnOrder', map.get('selectedDepartmentId')], initialState.get('columnOrder'))
          .setIn(['hiddenColumns', map.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .set('saving', false)
          .set('isGridConfigurationProcessed', false);
        map.update('locationsAttributes', locationsAttributes =>
          locationsAttributes.map(locationAttributes =>
            locationAttributes.filterNot(id => id === data)));
      });
    }

    case DELETE_ATTRIBUTE_REJECTED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('saveCachedGridConfiguration', true));

    case UPDATE_LOCATIONS_ATTRIBUTE_PENDING:
      return state.set('saving', true);

    case UPDATE_LOCATIONS_ATTRIBUTE_REJECTED:
      return state.set('saving', false);

    case UPDATE_LOCATIONS_ATTRIBUTE_FULFILLED: {
      const {locations, attributeId} = action.payload.data;

      return state.withMutations(map =>
        map.set('saving', false)
          .update('locationsAttributes', locationsAttributes =>
            locationsAttributes.withMutations(map => {
              for (const location of locations) {
                const {locationId, remove} = location;
                map.update(locationId, attributeIds =>
                  (remove ? attributeIds.subtract([attributeId]) : attributeIds.add(attributeId)));
              }
            })
          )
      );
    }

    case SORT_ATTRIBUTES_LIST:
      return state.setIn(['sorts', state.get('selectedDepartmentId')], action.payload);

    case FILTER_ATTRIBUTES_LIST:
      return state.withMutations(map =>
        map.setIn(['filters', state.get('selectedDepartmentId')], (action.payload === null ? action.payload : fromJS(action.payload)))
      ).setIn(['tablePaging', 'skip'], 0);

    case PAGE_ATTRIBUTES_LIST:
      return state.setIn(['tablePaging', 'skip'], action.payload);

    case TOGGLE_GRID_CONFIGURATION_SIDEBAR:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));

    case TOGGLE_ATTRIBUTES_COLUMN_VISIBILITY_FULFILLED: {
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
        const handleHidden = map => map.setIn(['hiddenColumns', state.get('selectedDepartmentId'), action.payload.field], action.payload.column)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], true)
          .setIn(['columnOrder', state.get('selectedDepartmentId')], toggleColumnsList)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], true);
        handleHidden(handleSort(handleFilter(map)));
      });
    }

    case TOGGLE_ATTRIBUTES_COLUMN_LOCK: {
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

    case RESET_ATTRIBUTES_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'));
        map.setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], false)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
      });

    case SHOW_HIDDEN_ATTRIBUTES_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['hiddenColumns', state.get('selectedDepartmentId')], initialState.get('hiddenColumns'))
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showLockButton', state.get('selectedDepartmentId')]))
          .setIn(['showHiddenButton', state.get('selectedDepartmentId')], false);
      });

    case RESET_LOCKED_ATTRIBUTES_COLUMNS_FULFILLED:
      return state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], initialState.get('columnOrder'));
        map.setIn(['lockedColumns', state.get('selectedDepartmentId')], defaultLockedColumnsState)
          .setIn(['showLockButton', state.get('selectedDepartmentId')], false);
        defaultLockedColumnsState.keySeq().toArray().map(x => map.deleteIn(['hiddenColumns', map.get('selectedDepartmentId'), x]));
        map.setIn(['showHiddenButton', state.get('selectedDepartmentId')], map.getIn(['hiddenColumns', map.get('selectedDepartmentId')])?.size)
          .setIn(['showResetButton', state.get('selectedDepartmentId')], map.getIn(['showHiddenButton', state.get('selectedDepartmentId')]));
      });

    case CLEAR_ATTRIBUTES_LIST_SORTS:
      return state.set('sorts', initialState.get('sorts'));

    case CLEAR_ATTRIBUTES_LIST_FILTERS:
      return state.set('filters', initialState.get('filters'));

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(LOCATION_ATTRIBUTE_IMPORTER)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeBackgroundJobs', activeJobs);
        });
      }

      return state;
    }

    case REORDER_ATTRIBUTES_COLUMN: {
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

    case LOAD_ATTRIBUTES_COLUMNS: {
      const columns = action.payload;
      const changedState = state.withMutations(map => {
        map.setIn(['columnOrder', state.get('selectedDepartmentId')], columns);
      });

      if (state.get('isCachedGridConfigurationRetrieved') && state.get('isAttributesLoaded') && !state.get('isGridConfigurationProcessed')) {
        return processGridConfigurationWithSelectedId(changedState, initialState);
      }
      return changedState;
    }

    case retrieveGridConfigurationPending(ATTRIBUTES_GRID):
      return state.set('loading', true);

    case retrieveGridConfigurationRejected(ATTRIBUTES_GRID):
      return state.set('loading', false);

    case retrieveGridConfigurationFulfilled(ATTRIBUTES_GRID): {
      const {configuration} = action.payload.data;
      return state.withMutations(map =>
        map.set('cachedGridConfig', fromJS(JSON.parse(configuration)))
          .set('isCachedGridConfigurationRetrieved', true));
    }

    case 'ATTRIBUTES_UPDATE_CACHED_GRID_CONFIGURATION' : {
      const updatedConfiguration = action.payload;
      if (!_.isEqual(updatedConfiguration, state.get('cachedGridConfig')?.toJS()) && state.get('saveCachedGridConfiguration')) {
        return state.set('cachedGridConfig', fromJS(updatedConfiguration));
      }
      return state;
    }

    case CANCEL_COLUMN_REORDER: {
      return state.withMutations(map =>
        map.set('showColumnReorderConfirmModal', false)
          .set('reorderedColumnDetail', initialState.get('reorderedColumnDetail'))
          .set('lastReorderedColumnModel', initialState.get('lastReorderedColumnModel'))
      );
    }

    default:
      return state;
  }
}
