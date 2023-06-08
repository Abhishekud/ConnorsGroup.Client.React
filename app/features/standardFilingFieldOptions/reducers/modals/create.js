import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_STANDARD_FILING_FIELD_OPTION,
  CREATE_STANDARD_FILING_FIELD_OPTION_FULFILLED,
  CREATE_STANDARD_FILING_FIELD_OPTION_PENDING,
  CREATE_STANDARD_FILING_FIELD_OPTION_REJECTED,
  SET_CREATE_STANDARD_FILING_FIELD_OPTION_MODEL_PROPERTY,
  SHOW_CREATE_STANDARD_FILING_FIELD_OPTION,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    value: '',
  }),
  standardFilingFieldId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_STANDARD_FILING_FIELD_OPTION:
      return initialState.withMutations(map =>
        map.set('show', true)
          .set('standardFilingFieldId', action.payload)
      );

    case SET_CREATE_STANDARD_FILING_FIELD_OPTION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_STANDARD_FILING_FIELD_OPTION_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_STANDARD_FILING_FIELD_OPTION:
    case CREATE_STANDARD_FILING_FIELD_OPTION_FULFILLED:
      return initialState;

    case CREATE_STANDARD_FILING_FIELD_OPTION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
