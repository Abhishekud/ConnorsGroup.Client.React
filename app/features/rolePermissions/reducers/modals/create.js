import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_ROLE,
  CREATE_ROLE_FULFILLED,
  CREATE_ROLE_PENDING,
  CREATE_ROLE_REJECTED,
  SET_CREATE_ROLE_MODEL_PROPERTY,
  SHOW_CREATE_ROLE,
} from '../../actions';

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
    case SHOW_CREATE_ROLE: {
      return initialState.withMutations(map => map.set('show', true));
    }

    case SET_CREATE_ROLE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_ROLE_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_ROLE:
    case CREATE_ROLE_FULFILLED:
      return initialState;

    case CREATE_ROLE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
