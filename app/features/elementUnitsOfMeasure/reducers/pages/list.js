import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {DefaultTableCell, DefaultTableNumericCell, DefaultTableHeaderCell} from '../../../customizableGrid/components';
import {
  LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_PENDING,
  LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_FULFILLED,
  LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_REJECTED,
  SORT_ELEMENT_UNITS_OF_MEASURE_LIST,
  CREATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED,
  DELETE_ELEMENT_UNIT_OF_MEASURE_FULFILLED,
  UPDATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED,
  SELECT_ELEMENT_UNIT_OF_MEASURE,
  CLEAR_SELECTED_ELEMENT_UNIT_OF_MEASURE,
  CLOSE_ELEMENT_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR,
  FILTER_ELEMENT_UNITS_OF_MEASURE_LIST,
} from '../../actions';

const initialState = fromJS({
  loading: false,
  headerSelectionValue: false,
  unitsOfMeasure: Map(),
  sort: [{field: 'name', dir: 'asc'}],
  filter: null,
  columns: ([{
    field: 'name',
    title: 'Name',
    filterable: true,
    sortable: true,
    headerCell: DefaultTableHeaderCell,
    cell: DefaultTableCell,
  }, {
    field: 'elementsCount',
    title: 'Elements Count',
    filterable: true,
    sortable: true,
    filter: 'numeric',
    headerCell: DefaultTableHeaderCell,
    cell: DefaultTableNumericCell,
  }]),
  selectedUnitOfMeasureId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('unitsOfMeasure', modelsArrayToMapById(action.payload.data))
          .set('selectedUnitOfMeasureId', null));

    case LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED:
    case UPDATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['unitsOfMeasure', data.id], fromJS(data));
    }

    case DELETE_ELEMENT_UNIT_OF_MEASURE_FULFILLED:
      return state.deleteIn(['unitsOfMeasure', action.payload.data]);

    case SORT_ELEMENT_UNITS_OF_MEASURE_LIST: {
      return state.set('sort', action.payload);
    }

    case FILTER_ELEMENT_UNITS_OF_MEASURE_LIST: {
      return state.set('filter', (action.payload === null ? action.payload : fromJS(action.payload)));
    }

    case SELECT_ELEMENT_UNIT_OF_MEASURE:
      return state.set('selectedUnitOfMeasureId', action.payload.get('id'));

    case CLEAR_SELECTED_ELEMENT_UNIT_OF_MEASURE:
    case CLOSE_ELEMENT_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR:
      return state.set('selectedUnitOfMeasureId', null);

    default:
      return state;
  }
}
