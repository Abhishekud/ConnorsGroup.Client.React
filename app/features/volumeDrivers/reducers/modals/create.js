import {
  CANCEL_CREATE_VOLUME_DRIVER,
  CREATE_VOLUME_DRIVER_FULFILLED,
  CREATE_VOLUME_DRIVER_PENDING,
  CREATE_VOLUME_DRIVER_REJECTED,
  SET_CREATE_VOLUME_DRIVER_MODEL_PROPERTY,
  SHOW_CREATE_VOLUME_DRIVER,
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
    case SHOW_CREATE_VOLUME_DRIVER:
      return initialState.set('show', true);

    case SET_CREATE_VOLUME_DRIVER_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_VOLUME_DRIVER_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_VOLUME_DRIVER:
    case CREATE_VOLUME_DRIVER_FULFILLED:
      return initialState;

    case CREATE_VOLUME_DRIVER_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
