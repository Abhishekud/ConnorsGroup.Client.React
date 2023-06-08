import {Map, fromJS} from 'immutable';
import {
  CANCEL_CONFIRM_RESUME_TUMBLEWEED_EXPORT,
  SHOW_CONFIRM_RESUME_TUMBLEWEED_EXPORT,
  RESUME_TUMBLEWEED_SCHEDULE_FULFILLED,
  RESUME_TUMBLEWEED_SCHEDULE_PENDING,
  RESUME_TUMBLEWEED_SCHEDULE_REJECTED,
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
    case SHOW_CONFIRM_RESUME_TUMBLEWEED_EXPORT:
      return initialState.set('show', true)
        .set('schedule', action.payload);

    case RESUME_TUMBLEWEED_SCHEDULE_PENDING: {
      return state.set('saving', true);
    }

    case RESUME_TUMBLEWEED_SCHEDULE_REJECTED: {
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    }

    case RESUME_TUMBLEWEED_SCHEDULE_FULFILLED: {
      return initialState;
    }

    case CANCEL_CONFIRM_RESUME_TUMBLEWEED_EXPORT:
      return state.set('show', false);

    default:
      return state;
  }
}
