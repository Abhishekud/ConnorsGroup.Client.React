import {Map, fromJS} from 'immutable';
import {
  LOAD_TUMBLEWEED_SCHEDULES_PENDING,
  LOAD_TUMBLEWEED_SCHEDULES_FULFILLED,
  LOAD_TUMBLEWEED_SCHEDULES_REJECTED,
} from '../../actions';

const initialState = new Map({
  schedules: new Map(),
  loading: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TUMBLEWEED_SCHEDULES_PENDING:
      return state.set('loading', true);
    case LOAD_TUMBLEWEED_SCHEDULES_REJECTED:
      return state.set('loading', false);
    case LOAD_TUMBLEWEED_SCHEDULES_FULFILLED: {
      return state.set('schedules', fromJS(action.payload.data))
        .set('saving', false)
        .set('loading', false)
        .set('isPristine', true)
        .set('validationErrors', new Map());
    }
    default:
      return state;
  }
}
