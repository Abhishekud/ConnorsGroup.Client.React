import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS, List} from 'immutable';
import {
  LOAD_PART_FIELDS_LIST_PENDING,
  LOAD_PART_FIELDS_LIST_FULFILLED,
  LOAD_PART_FIELDS_LIST_REJECTED,
  SORT_PART_FIELDS_LIST,
  FILTER_PART_FIELDS_LIST,
  CREATE_PART_FIELD_FULFILLED,
  DELETE_PART_FIELD_FULFILLED,
  UPDATE_PART_FIELD_FULFILLED,
  SELECT_PART_FIELD,
  CLEAR_SELECTED_PART_FIELD,
  CLOSE_EDIT_PART_FIELD_SIDEBAR,
} from '../../actions';
import {BooleanFilterCell} from '../../../customizableGrid/components';
import {RequireCheckCell} from '../../components';


const initialState = Map({
  loading: false,
  partFields: Map(),
  sort: new List(),
  filter: null,
  selectedPartFieldId: null,
  columns:
      fromJS([{
        field: 'name',
        title: 'Name',
        editable: false,
        filterable: true,
        sortable: true,
      },
      {
        field: 'required',
        title: 'Required',
        filterable: true,
        sortable: false,
        editor: 'boolean',
        cell: RequireCheckCell,
        filterCell: BooleanFilterCell,
      },
      ]),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PART_FIELDS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_PART_FIELDS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('partFields', modelsArrayToMapById(action.payload.data))
          .set('selectedPartFieldId', null));

    case LOAD_PART_FIELDS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_PART_FIELD_FULFILLED:
    case UPDATE_PART_FIELD_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['partFields', data.id], fromJS(data));
    }

    case DELETE_PART_FIELD_FULFILLED:
      return state.deleteIn(['partFields', action.payload.data]);

    case FILTER_PART_FIELDS_LIST: {
      return state.set('filter', action.payload);
    }

    case SORT_PART_FIELDS_LIST:
      return state.set('sort', action.payload);

    case SELECT_PART_FIELD:
      return state.set('selectedPartFieldId', action.payload.get('id'));

    case CLEAR_SELECTED_PART_FIELD:
    case CLOSE_EDIT_PART_FIELD_SIDEBAR:
      return state.set('selectedPartFieldId', null);

    default:
      return state;
  }
}
