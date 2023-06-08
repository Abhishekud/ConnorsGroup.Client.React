import {fromJS, List, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  LOAD_CHARACTERISTIC_STANDARDS_LIST_PENDING,
  LOAD_CHARACTERISTIC_STANDARDS_LIST_FULFILLED,
  LOAD_CHARACTERISTIC_STANDARDS_LIST_REJECTED,
  SORT_CHARACTERISTIC_STANDARDS_MAPPING_LIST,
  FILTER_CHARACTERISTIC_STANDARDS_LIST,
  TOGGLE_CHARACTERISTIC_STANDARDS_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
  REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN,
  TOGGLE_CHARACTERISTIC_STANDARDS_GRID_COLUMN_VISIBILITY,
  PAGE_CHARACTERISTIC_STANDARDS_LIST,
} from '../../actions';

const initialState = fromJS({
  loading: false,
  sort: new List(),
  characteristicStandards: new Map(),
  selectedCharacteristicId: null,
  selectedDepartmentId: null,
  showGridConfiguration: false,
  columnOrder: List(),
  filter: null,
  hiddenColumns: new Map(),
  take: 50,
  skip: 0,
  tablePaging: Map({skip: 0, take: 50}),
  characteristicModel: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHARACTERISTIC_STANDARDS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_CHARACTERISTIC_STANDARDS_LIST_FULFILLED: {
      const {
        characteristicId,
        departmentId,
        departmentName,
        name,
        standards,
      } = action.payload.data;

      const newstandards = standards.map(obj => ({...obj, selected: false}));
      const model = Map({
        departmentId, departmentName, name,
      });

      return state.withMutations(map =>
        map
          .set('loading', false)
          .set('selectedDepartmentId', departmentId)
          .set('characteristicStandards', modelsArrayToMapById(newstandards))
          .set('selectedCharacteristicId', characteristicId)
          .set('characteristicModel', model)
      );
    }

    case LOAD_CHARACTERISTIC_STANDARDS_LIST_REJECTED: {
      return state.set('loading', false);
    }

    case TOGGLE_CHARACTERISTIC_STANDARDS_GRID_CONFIGURATION_SIDEBAR_FULFILLED:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));


    case PAGE_CHARACTERISTIC_STANDARDS_LIST:
      return state.set('skip', action.payload);


    case FILTER_CHARACTERISTIC_STANDARDS_LIST: {
      return state.withMutations(map =>
        map.set('filter', (action.payload.filter === null ? action.payload.filter : fromJS(action.payload.filter)))
          .set('skip', 0));
    }

    case SORT_CHARACTERISTIC_STANDARDS_MAPPING_LIST: {
      return state.set('sort', action.payload);
    }

    case TOGGLE_CHARACTERISTIC_STANDARDS_GRID_COLUMN_VISIBILITY: {
      if (action.payload.visibility) {
        return state.deleteIn(['hiddenColumns', action.payload.field]);
      }
      return state.withMutations(map => {
        const handleFilter = map => {
          if (map.get('filter') !== null) {
            const filterIndex = map.getIn(['filter', 'filters']).findIndex(value => value.get('field') === action.payload.field);
            if (filterIndex !== -1) {
              return map.deleteIn(['filter', 'filters', filterIndex]);
            }
          }
          return map;
        };
        const handleSort = map => {
          if (map.get('filter') !== null) {
            const sortIndex = map.get('sort').findIndex(value => value.get('field') === action.payload.field);
            if (sortIndex !== -1) {
              return map.deleteIn(['sort', sortIndex]);
            }
          }
          return map;
        };
        const handleHidden = map => map.setIn(['hiddenColumns', action.payload.field], true);
        handleHidden(handleSort(handleFilter(map)));
      });
    }
    case REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN: {
      const {columnKey, newIndex, oldIndex} = action.payload;
      return state.update('columnOrder', order => order.push(Map({column: columnKey, newIndex, oldIndex})));
    }

    default:
      return state;
  }
}
