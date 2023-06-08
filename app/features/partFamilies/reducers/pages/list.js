import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS, List} from 'immutable';
import {
  LOAD_PART_FAMILIES_LIST_PENDING,
  LOAD_PART_FAMILIES_LIST_FULFILLED,
  LOAD_PART_FAMILIES_LIST_REJECTED,
  SORT_PART_FAMILIES_LIST,
  FILTER_PART_FAMILIES_LIST,
  CREATE_PART_FAMILY_FULFILLED,
  DELETE_PART_FAMILY_FULFILLED,
  UPDATE_PART_FAMILY_FULFILLED,
  SELECT_PART_FAMILY,
  CLEAR_SELECTED_PART_FAMILY,
  CLOSE_PART_FAMILIES_LIST_EDIT_SIDEBAR,
} from '../../actions';

import {DefaultTableHeaderCell, DefaultTableNumericCell, DefaultTableCell} from '../../../customizableGrid/components';

const initialState = Map({
  loading: false,
  partFamilies: Map(),
  sort: new List(),
  filter: null,
  columns: fromJS([
    {
      field: 'name',
      title: 'Name',
      filterable: true,
      sortable: true,
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableCell,
    },
    {
      field: 'standardsCount',
      title: '# of Standards',
      filterable: true,
      sortable: true,
      filter: 'numeric',
      headerCell: DefaultTableHeaderCell,
      cell: DefaultTableNumericCell,
    }]),
  selectedPartFamilyId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PART_FAMILIES_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_PART_FAMILIES_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('partFamilies', modelsArrayToMapById(action.payload.data))
          .set('selectedPartFamilyId', null));

    case LOAD_PART_FAMILIES_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_PART_FAMILY_FULFILLED:
    case UPDATE_PART_FAMILY_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['partFamilies', data.id], fromJS(data));
    }

    case DELETE_PART_FAMILY_FULFILLED:
      return state.deleteIn(['partFamilies', action.payload.data]);

    case SORT_PART_FAMILIES_LIST:
      return state.set('sort', action.payload);

    case FILTER_PART_FAMILIES_LIST:
      return state.set('filter', action.payload);

    case SELECT_PART_FAMILY:
      return state.set('selectedPartFamilyId', action.payload.get('id'));

    case CLEAR_SELECTED_PART_FAMILY:
    case CLOSE_PART_FAMILIES_LIST_EDIT_SIDEBAR:
      return state.set('selectedPartFamilyId', null);

    default:
      return state;
  }
}
