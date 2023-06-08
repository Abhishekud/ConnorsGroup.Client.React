import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_CLASSIFICATION,
  CREATE_CLASSIFICATION_FULFILLED,
  CREATE_CLASSIFICATION_PENDING,
  CREATE_CLASSIFICATION_REJECTED,
  SET_CREATE_CLASSIFICATION_MODEL_PROPERTY,
  SHOW_CREATE_CLASSIFICATION,
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
    case SHOW_CREATE_CLASSIFICATION:
      return initialState.set('show', true);

    case SET_CREATE_CLASSIFICATION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_CLASSIFICATION_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_CLASSIFICATION:
    case CREATE_CLASSIFICATION_FULFILLED:
      return initialState;

    case CREATE_CLASSIFICATION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
