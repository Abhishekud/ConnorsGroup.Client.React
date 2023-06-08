import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS, List} from 'immutable';
import {
  LOAD_PARTS_PAGE,
  LOAD_PARTS_LIST_PENDING,
  LOAD_PARTS_LIST_FULFILLED,
  LOAD_PARTS_LIST_REJECTED,
  SORT_PARTS_LIST,
  CREATE_PART_FULFILLED,
  DELETE_PART_FULFILLED,
  FILTER_PARTS_LIST,
  UPDATE_PART_FULFILLED,
  SELECT_PART,
  CLEAR_SELECTED_PART,
  CLOSE_PARTS_LIST_EDIT_SIDEBAR,
  REORDER_PARTS_GRID_COLUMN,
  TOGGLE_PARTS_GRID_COLUMN_VISIBILITY,
  TOGGLE_PARTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED,
} from '../../actions';

const initialState = Map({
  loading: false,
  parts: Map(),
  sort: new List(),
  filter: new Map(),
  hiddenColumns: Map(),
  columnOrder: List(),
  showGridConfiguration: false,
  selectedPartId: null,
  selectedPartFamilyId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PARTS_PAGE:
    case LOAD_PARTS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_PARTS_LIST_FULFILLED: {
      const {partFamilyId, parts} = action.payload.data;

      return state.withMutations(map =>
        map.set('loading', false)
          .set('parts', modelsArrayToMapById(parts))
          .set('selectedPartFamilyId', partFamilyId)
          .set('selectedPartId', null));
    }

    case LOAD_PARTS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_PART_FULFILLED:
    case UPDATE_PART_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['parts', data.id], fromJS(data));
    }

    case DELETE_PART_FULFILLED:
      return state.deleteIn(['parts', action.payload.data]);


    case FILTER_PARTS_LIST: {
      return state.setIn(['filter', state.get('selectedPartFamilyId')], action.payload);
    }

    case SORT_PARTS_LIST:
      return state.setIn(['sort', state.get('selectedPartFamilyId')], action.payload);

    case SELECT_PART:
      return state.set('selectedPartId', action.payload.get('id'));

    case CLEAR_SELECTED_PART:
    case CLOSE_PARTS_LIST_EDIT_SIDEBAR:
      return state.set('selectedPartId', null);

    case REORDER_PARTS_GRID_COLUMN: {
      const {columnKey, newIndex, oldIndex} = action.payload;
      return state.withMutations(map => {
        if (map.getIn(['columnOrder', state.get('selectedPartFamilyId')])) {
          return map.updateIn(['columnOrder', state.get('selectedPartFamilyId')], order => order.push(Map({column: columnKey, newIndex, oldIndex})));
        }
        return map.setIn(['columnOrder', state.get('selectedPartFamilyId')], new List()).updateIn(['columnOrder', state.get('selectedPartFamilyId')], order => order.push(Map({column: columnKey, newIndex, oldIndex})));
      });
    }

    case TOGGLE_PARTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED:
      return state.set('showGridConfiguration', !state.get('showGridConfiguration'));


    case TOGGLE_PARTS_GRID_COLUMN_VISIBILITY: {
      if (action.payload.visibility) {
        return state.deleteIn(['hiddenColumns', state.get('selectedPartFamilyId'), action.payload.field]);
      }
      return state.withMutations(map => {
        const handleFilter = map => {
          if (map.hasIn(['filter', state.get('selectedPartFamilyId')])) {
            const filterIndex = map.getIn(['filter', state.get('selectedPartFamilyId'), 'filters']).findIndex(value => value.get('field') === action.payload.field);
            if (filterIndex !== -1) {
              return map.deleteIn(['filter', state.get('selectedPartFamilyId'), 'filters', filterIndex]);
            }
          }
          return map;
        };
        const handleSort = map => {
          if (map.hasIn(['sort', state.get('selectedPartFamilyId')])) {
            const sortIndex = map.getIn(['sort', state.get('selectedPartFamilyId')]).findIndex(value => value.get('field') === action.payload.field);
            if (sortIndex !== -1) {
              return map.deleteIn(['sort', state.get('selectedPartFamilyId'), sortIndex]);
            }
          }
          return map;
        };
        const handleHidden = map => map.setIn(['hiddenColumns', state.get('selectedPartFamilyId'), action.payload.field], true);
        handleHidden(handleSort(handleFilter(map)));
      });
    }

    default:
      return state;
  }
}
