import {Map, fromJS} from 'immutable';
import {
  CANCEL_EDIT_TUMBLEWEED_SCHEDULE,
  SAVE_TUMBLEWEED_SCHEDULE_FULFILLED,
  SAVE_TUMBLEWEED_SCHEDULE_PENDING,
  SAVE_TUMBLEWEED_SCHEDULE_REJECTED,
  SET_EDIT_TUMBLEWEED_SCHEDULE_MODEL_PROPERTY,
  SHOW_EDIT_TUMBLEWEED_SCHEDULE,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_EDIT_TUMBLEWEED_SCHEDULE:
      return initialState.set('show', true)
        .set('model', fromJS(action.payload.toJS()));

    case SET_EDIT_TUMBLEWEED_SCHEDULE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SAVE_TUMBLEWEED_SCHEDULE_PENDING:
      return state.set('saving', true);

    case CANCEL_EDIT_TUMBLEWEED_SCHEDULE:
    case SAVE_TUMBLEWEED_SCHEDULE_FULFILLED:
      return initialState;

    case SAVE_TUMBLEWEED_SCHEDULE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
