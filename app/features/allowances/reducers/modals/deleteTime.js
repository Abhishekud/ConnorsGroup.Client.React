import {Map} from 'immutable';
import {
  CANCEL_DELETE_ALLOWANCE_TIME,
  SHOW_DELETE_ALLOWANCE_TIME,
  DELETE_ALLOWANCE_TIME_FULFILLED,
  DELETE_ALLOWANCE_TIME_PENDING,
  DELETE_ALLOWANCE_TIME_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  model: new Map({
    id: null,
    name: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_ALLOWANCE_TIME: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_ALLOWANCE_TIME_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_ALLOWANCE_TIME:
    case DELETE_ALLOWANCE_TIME_FULFILLED:
      return initialState;

    case DELETE_ALLOWANCE_TIME_REJECTED:
      return state.set('deleting', false);

    default:
      return state;
  }
}
