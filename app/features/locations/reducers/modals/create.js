import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_LOCATION,
  CREATE_LOCATION_FULFILLED,
  CREATE_LOCATION_PENDING,
  CREATE_LOCATION_REJECTED,
  SET_CREATE_LOCATION_MODEL_PROPERTY,
  SHOW_CREATE_LOCATION,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    activeDate: null,
    inactiveDate: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_LOCATION:
      return initialState.set('show', true);

    case SET_CREATE_LOCATION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_LOCATION_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_LOCATION:
    case CREATE_LOCATION_FULFILLED:
      return initialState;

    case CREATE_LOCATION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
