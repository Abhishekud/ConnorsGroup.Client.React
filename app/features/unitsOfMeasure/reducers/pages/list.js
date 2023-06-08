import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {
  LOAD_UNITS_OF_MEASURE_LIST_PENDING,
  LOAD_UNITS_OF_MEASURE_LIST_FULFILLED,
  LOAD_UNITS_OF_MEASURE_LIST_REJECTED,
  SORT_UNITS_OF_MEASURE_LIST,
  CREATE_UNIT_OF_MEASURE_FULFILLED,
  DELETE_UNIT_OF_MEASURE_FULFILLED,
  UPDATE_UNIT_OF_MEASURE_FULFILLED,
  SELECT_UNIT_OF_MEASURE,
  CLEAR_SELECTED_UNIT_OF_MEASURE,
  CLOSE_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR,
  FILTER_UNITS_OF_MEASURE_LIST,
} from '../../actions';

const initialState = Map({
  loading: false,
  unitsOfMeasure: Map(),
  sort: [{field: 'name', dir: 'asc'}],
  filter: null,
  selectedUnitOfMeasureId: null,
  selectedDepartmentId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_UNITS_OF_MEASURE_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_UNITS_OF_MEASURE_LIST_FULFILLED: {
      const {unitsOfMeasure, departmentId} = action.payload.data;
      return state.withMutations(map =>
        map.set('loading', false)
          .set('selectedDepartmentId', departmentId)
          .set('unitsOfMeasure', modelsArrayToMapById(unitsOfMeasure))
          .set('selectedUnitOfMeasureId', null));
    }

    case LOAD_UNITS_OF_MEASURE_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_UNIT_OF_MEASURE_FULFILLED:
    case UPDATE_UNIT_OF_MEASURE_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['unitsOfMeasure', data.id], fromJS(data));
    }

    case DELETE_UNIT_OF_MEASURE_FULFILLED:
      return state.deleteIn(['unitsOfMeasure', action.payload.data]);

    case SORT_UNITS_OF_MEASURE_LIST:
      return state.set('sort', action.payload);

    case FILTER_UNITS_OF_MEASURE_LIST:
      return state.set('filter', action.payload);

    case SELECT_UNIT_OF_MEASURE:
      return state.withMutations(m =>
        m.set('selectedUnitOfMeasureId', action.payload.get('id'))
          .deleteIn(['unitsOfMeasure', state.get('selectedUnitOfMeasureId'), 'selected'])
          .setIn(['unitsOfMeasure', action.payload.get('id'), 'selected'], true)
      );

    case CLEAR_SELECTED_UNIT_OF_MEASURE:
    case CLOSE_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR:
      return state.withMutations(m =>
        m.set('selectedUnitOfMeasureId', null)
          .deleteIn(['unitsOfMeasure', state.get('selectedUnitOfMeasureId'), 'selected'])
      );

    default:
      return state;
  }
}
