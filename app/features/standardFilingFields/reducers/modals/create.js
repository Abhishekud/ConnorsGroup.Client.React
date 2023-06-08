import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_STANDARD_FILING_FIELD,
  CREATE_STANDARD_FILING_FIELD_FULFILLED,
  CREATE_STANDARD_FILING_FIELD_PENDING,
  CREATE_STANDARD_FILING_FIELD_REJECTED,
  SET_CREATE_STANDARD_FILING_FIELD_MODEL_PROPERTY,
  SHOW_CREATE_STANDARD_FILING_FIELD,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    required: false,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_STANDARD_FILING_FIELD:
      return initialState.set('show', true);

    case SET_CREATE_STANDARD_FILING_FIELD_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_STANDARD_FILING_FIELD_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_STANDARD_FILING_FIELD:
    case CREATE_STANDARD_FILING_FIELD_FULFILLED:
      return initialState;

    case CREATE_STANDARD_FILING_FIELD_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
