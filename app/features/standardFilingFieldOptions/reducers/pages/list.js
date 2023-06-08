import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {
  LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_PENDING,
  LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_FULFILLED,
  LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_REJECTED,
  SORT_STANDARD_FILING_FIELD_OPTIONS_LIST,
  CREATE_STANDARD_FILING_FIELD_OPTION_FULFILLED,
  DELETE_STANDARD_FILING_FIELD_OPTION_FULFILLED,
  UPDATE_STANDARD_FILING_FIELD_OPTION_FULFILLED,
  SELECT_STANDARD_FILING_FIELD_OPTION,
  CLEAR_SELECTED_STANDARD_FILING_FIELD_OPTION,
  CLOSE_EDIT_STANDARD_FILING_FIELD_OPTION_SIDEBAR,
  FILTER_STANDARD_FILING_FIELD_OPTIONS_LIST,
} from '../../actions';

const initialState = Map({
  loading: false,
  standardFilingFieldSelectorList: [],
  standardFilingFieldOptions: Map(),
  sort: [{field: 'value', dir: 'asc'}],
  filter: null,
  selectedStandardFilingFieldId: null,
  selectedStandardFilingFieldOptionId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_FULFILLED: {
      const {standardFilingFieldId, standardFilingFieldOptions} = action.payload.data;

      return state.withMutations(map =>
        map.set('loading', false)
          .set('standardFilingFieldOptions', modelsArrayToMapById(standardFilingFieldOptions))
          .set('selectedStandardFilingFieldId', standardFilingFieldId)
          .set('selectedStandardFilingFieldOptionId', null));
    }

    case LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_STANDARD_FILING_FIELD_OPTION_FULFILLED:
    case UPDATE_STANDARD_FILING_FIELD_OPTION_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['standardFilingFieldOptions', data.id], fromJS(data));
    }

    case DELETE_STANDARD_FILING_FIELD_OPTION_FULFILLED:
      return state.deleteIn(['standardFilingFieldOptions', action.payload.data]);

    case SORT_STANDARD_FILING_FIELD_OPTIONS_LIST:
      return state.set('sort', action.payload);

    case FILTER_STANDARD_FILING_FIELD_OPTIONS_LIST:
      return state.set('filter', action.payload);

    case SELECT_STANDARD_FILING_FIELD_OPTION: {
      const {standardFilingFieldOption} = action.payload;
      return state.withMutations(m =>
        m.set('selectedStandardFilingFieldOptionId', standardFilingFieldOption.get('id'))
          .deleteIn(['standardFilingFieldOptions', state.get('selectedStandardFilingFieldOptionId'), 'selected'])
          .setIn(['standardFilingFieldOptions', standardFilingFieldOption.get('id'), 'selected'], true)
      );
    }

    case CLEAR_SELECTED_STANDARD_FILING_FIELD_OPTION:
    case CLOSE_EDIT_STANDARD_FILING_FIELD_OPTION_SIDEBAR:
      return state.withMutations(m =>
        m.set('selectedStandardFilingFieldOptionId', null)
          .deleteIn(['standardFilingFieldOptions', state.get('selectedStandardFilingFieldOptionId'), 'selected'])
      );

    default:
      return state;
  }
}
