import {Map, fromJS} from 'immutable';
import {
  LOAD_TUMBLEWEED_INTEGRATION_PENDING,
  LOAD_TUMBLEWEED_INTEGRATION_FULFILLED,
  SAVE_TUMBLEWEED_INTEGRATION_PENDING,
  SAVE_TUMBLEWEED_INTEGRATION_FULFILLED,
  SET_TUMBLEWEED_FIELD_VALUE,
  SAVE_TUMBLEWEED_INTEGRATION_REJECTED,
  LOAD_TUMBLEWEED_INTEGRATION_REJECTED,
} from '../../actions';

const initialState = new Map({
  tumbleweedEndpoint: new Map(),
  pristine: new Map(),
  validationErrors: new Map(),
  isPristine: true,
  loading: true,
  saving: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_TUMBLEWEED_INTEGRATION_PENDING:
      return state.set('saving', true);
    case LOAD_TUMBLEWEED_INTEGRATION_PENDING:
      return state.set('loading', true);
    case SAVE_TUMBLEWEED_INTEGRATION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        if (status === 400) {
          map.set('validationErrors', fromJS(data));
        } else {
          map.set('validationErrors', initialState.get('validationErrors'));
        }
      });
    case LOAD_TUMBLEWEED_INTEGRATION_REJECTED:
      return initialState.set('loading', false);
    case SAVE_TUMBLEWEED_INTEGRATION_FULFILLED:
    case LOAD_TUMBLEWEED_INTEGRATION_FULFILLED: {
      return state.set('tumbleweedEndpoint', fromJS(action.payload.data))
        .set('pristine', fromJS(action.payload.data))
        .set('saving', false)
        .set('loading', false)
        .set('isPristine', true)
        .set('validationErrors', new Map());
    }
    case SET_TUMBLEWEED_FIELD_VALUE: {
      return state.withMutations(map =>
        map.setIn(['tumbleweedEndpoint', action.payload.name], action.payload.value)
          .set('isPristine', false));
    }
    default:
      return state;
  }
}
