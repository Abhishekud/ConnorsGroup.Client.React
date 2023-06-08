import {fromJS, List, Map} from 'immutable';
import {
  LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_PENDING,
  LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_FULFILLED,
  LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_REJECTED,
  SORT_UNIT_OF_MEASURE_STANDARDS_MAPPING_LIST,
  FILTER_UNIT_OF_MEASURE_STANDARDS_LIST,
  TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
  REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN,
  TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN_VISIBILITY,
} from '../../actions';

const initialState = fromJS({
  loading: false,
  sort: new List(),
  unitOfMeasureStandards: new List(),
  showGridConfiguration: false,
  columnOrder: List(),
  filter: null,
  hiddenColumns: new Map(),
  unitOfMeasureModel: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_FULFILLED: {
      const {
        departmentId,
        departmentName,
        name,
        standards,
      } = action.payload.data;

      const model = Map({
        departmentId, departmentName, name,
      });

      return state.withMutations(map =>
        map
          .set('loading', false)
          .set('unitOfMeasureStandards', fromJS(standards))
          .set('unitOfMeasureModel', model)
      );
    }

    case LOAD_UNIT_OF_MEASURE_STANDARDS_LIST_REJECTED: {
      return state.set('loading', false);
    }

    case TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_CONFIGURATION_SIDEBAR_FULFILLED:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));


    case FILTER_UNIT_OF_MEASURE_STANDARDS_LIST: {
      return state.set('filter', action.payload);
    }

    case SORT_UNIT_OF_MEASURE_STANDARDS_MAPPING_LIST: {
      return state.set('sort', action.payload);
    }

    case TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN_VISIBILITY: {
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
    case REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN: {
      const {columnKey, newIndex, oldIndex} = action.payload;
      return state.update('columnOrder', order => order.push(Map({column: columnKey, newIndex, oldIndex})));
    }

    default:
      return state;
  }
}
