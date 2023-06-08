import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_TUMBLEWEED_SCHEDULE,
  SHOW_DELETE_TUMBLEWEED_SCHEDULE,
  DELETE_TUMBLEWEED_SCHEDULE_FULFILLED,
  DELETE_TUMBLEWEED_SCHEDULE_PENDING,
  DELETE_TUMBLEWEED_SCHEDULE_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map(),
  schedule: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_TUMBLEWEED_SCHEDULE:
      return initialState.set('show', true)
        .set('schedule', action.payload);

    case DELETE_TUMBLEWEED_SCHEDULE_PENDING: {
      return state.set('saving', true);
    }

    case DELETE_TUMBLEWEED_SCHEDULE_REJECTED: {
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    }

    case DELETE_TUMBLEWEED_SCHEDULE_FULFILLED: {
      return initialState;
    }

    case CANCEL_DELETE_TUMBLEWEED_SCHEDULE:
      return state.set('show', false);

    default:
      return state;
  }
}
