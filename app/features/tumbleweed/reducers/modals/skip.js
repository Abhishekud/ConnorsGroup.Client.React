import {Map, fromJS} from 'immutable';
import {
  CANCEL_SKIP_TUMBLEWEED_EXPORT,
  SAVE_SKIP_TUMBLEWEED_EXPORT_FULFILLED,
  SAVE_SKIP_TUMBLEWEED_EXPORT_PENDING,
  SAVE_SKIP_TUMBLEWEED_EXPORT_REJECTED,
  SET_SKIP_TUMBLEWEED_EXPORT_MODEL_PROPERTY,
  SHOW_SKIP_TUMBLEWEED_EXPORT,
} from '../../actions';
import moment from 'moment';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map(),
  schedule: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SKIP_TUMBLEWEED_EXPORT: {
      const data = action.payload.toJS();
      const offset = new Date().getTimezoneOffset();
      const result = {
        ...data,
        pauseFrom: data.pauseFrom ? moment.utc(data.pauseFrom).add(offset, 'minutes') : data.pauseFrom,
        pauseUntil: data.pauseUntil ? moment.utc(data.pauseUntil).add(offset, 'minutes') : data.pauseUntil,
      };
      const schedule = fromJS(result);
      return initialState.set('show', true)
        .set('model', schedule)
        .set('schedule', schedule);
    }

    case SET_SKIP_TUMBLEWEED_EXPORT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SAVE_SKIP_TUMBLEWEED_EXPORT_PENDING:
      return state.set('saving', true);

    case CANCEL_SKIP_TUMBLEWEED_EXPORT:
    case SAVE_SKIP_TUMBLEWEED_EXPORT_FULFILLED:
      return initialState;

    case SAVE_SKIP_TUMBLEWEED_EXPORT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
