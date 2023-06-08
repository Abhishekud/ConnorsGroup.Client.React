import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_STANDARD_FILING_FIELD_OPTION,
  SHOW_DELETE_STANDARD_FILING_FIELD_OPTION,
  DELETE_STANDARD_FILING_FIELD_OPTION_FULFILLED,
  DELETE_STANDARD_FILING_FIELD_OPTION_PENDING,
  DELETE_STANDARD_FILING_FIELD_OPTION_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    id: null,
    value: null,
  }),
  standardFilingFieldId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_STANDARD_FILING_FIELD_OPTION: {
      const {standardFilingFieldId, standardFilingFieldOption} = action.payload;
      const model = Map({
        id: standardFilingFieldOption.get('id'),
        value: standardFilingFieldOption.get('value'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model)
          .set('standardFilingFieldId', standardFilingFieldId));
    }

    case DELETE_STANDARD_FILING_FIELD_OPTION_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_STANDARD_FILING_FIELD_OPTION:
    case DELETE_STANDARD_FILING_FIELD_OPTION_FULFILLED:
      return initialState;

    case DELETE_STANDARD_FILING_FIELD_OPTION_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
