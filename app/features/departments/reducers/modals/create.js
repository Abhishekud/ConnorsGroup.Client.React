import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_DEPARTMENT,
  CREATE_DEPARTMENT_FULFILLED,
  CREATE_DEPARTMENT_PENDING,
  CREATE_DEPARTMENT_REJECTED,
  SET_CREATE_DEPARTMENT_MODEL_PROPERTY,
  SHOW_CREATE_DEPARTMENT,
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
    case SHOW_CREATE_DEPARTMENT:
      return initialState.set('show', true);

    case SET_CREATE_DEPARTMENT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_DEPARTMENT_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_DEPARTMENT:
    case CREATE_DEPARTMENT_FULFILLED:
      return initialState;

    case CREATE_DEPARTMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
