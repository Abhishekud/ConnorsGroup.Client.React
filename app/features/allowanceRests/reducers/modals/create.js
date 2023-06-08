import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_ALLOWANCE_REST,
  CREATE_ALLOWANCE_REST_FULFILLED,
  CREATE_ALLOWANCE_REST_PENDING,
  CREATE_ALLOWANCE_REST_REJECTED,
  SET_CREATE_ALLOWANCE_REST_MODEL_PROPERTY,
  SHOW_CREATE_ALLOWANCE_REST,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    conditionalMultiplier: 1,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_ALLOWANCE_REST:
      return initialState.set('show', true);

    case SET_CREATE_ALLOWANCE_REST_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['model', name], value);
        if (message && name === 'name') {
          map.setIn(['validationErrors', name], fromJS([message]));
        }
      }
      );
    }

    case CREATE_ALLOWANCE_REST_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_ALLOWANCE_REST:
    case CREATE_ALLOWANCE_REST_FULFILLED:
      return initialState;

    case CREATE_ALLOWANCE_REST_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
