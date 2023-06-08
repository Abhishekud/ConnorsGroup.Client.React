import {
  CANCEL_CREATE_ALLOWANCE,
  CREATE_ALLOWANCE_FULFILLED,
  CREATE_ALLOWANCE_PENDING,
  CREATE_ALLOWANCE_REJECTED,
  SET_CREATE_ALLOWANCE_MODEL_PROPERTY,
  SHOW_CREATE_ALLOWANCE,
} from '../../actions';
import {fromJS, Map} from 'immutable';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_ALLOWANCE:
      return initialState.set('show', true);

    case SET_CREATE_ALLOWANCE_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['model', name], value);
        if (message && name === 'name') {
          map.setIn(['validationErrors', name], fromJS([message]));
        }
      }
      );
    }

    case CREATE_ALLOWANCE_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_ALLOWANCE:
    case CREATE_ALLOWANCE_FULFILLED:
      return initialState;

    case CREATE_ALLOWANCE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
