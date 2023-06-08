import {fromJS, Map} from 'immutable';
import {
  LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_FULFILLED,
  SELECT_STANDARD_FILING_FIELD_OPTION,
  CLEAR_SELECTED_STANDARD_FILING_FIELD_OPTION,
  CLOSE_EDIT_STANDARD_FILING_FIELD_OPTION_SIDEBAR,
  SET_EDIT_STANDARD_FILING_FIELD_OPTION_MODEL_PROPERTY,
  UPDATE_STANDARD_FILING_FIELD_OPTION_PENDING,
  UPDATE_STANDARD_FILING_FIELD_OPTION_FULFILLED,
  UPDATE_STANDARD_FILING_FIELD_OPTION_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  dirty: false,
  model: Map(),
  validationErrors: Map(),
  standardFilingFieldId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_STANDARD_FILING_FIELD_OPTION:
    case CLOSE_EDIT_STANDARD_FILING_FIELD_OPTION_SIDEBAR:
    case LOAD_STANDARD_FILING_FIELD_OPTIONS_LIST_FULFILLED:
    case UPDATE_STANDARD_FILING_FIELD_OPTION_FULFILLED:
      return initialState;

    case SELECT_STANDARD_FILING_FIELD_OPTION: {
      const {standardFilingFieldId, standardFilingFieldOption} = action.payload;

      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('dirty', false)
          .set('model', standardFilingFieldOption)
          .set('standardFilingFieldId', standardFilingFieldId)
          .set('validationErrors', Map()));
    }

    case SET_EDIT_STANDARD_FILING_FIELD_OPTION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case UPDATE_STANDARD_FILING_FIELD_OPTION_PENDING:
      return state.set('saving', true);

    case UPDATE_STANDARD_FILING_FIELD_OPTION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
