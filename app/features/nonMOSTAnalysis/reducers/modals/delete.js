import {Map} from 'immutable';
import {
  CANCEL_DELETE_NON_MOST_STEP,
  SHOW_DELETE_NON_MOST_STEP,
  DELETE_NON_MOST_STEPS_FULFILLED,
  DELETE_NON_MOST_STEPS_PENDING,
  DELETE_NON_MOST_STEPS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  model: new Map({
    id: null,
    description: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_NON_MOST_STEP: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        description: payload.get('description'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_NON_MOST_STEPS_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_NON_MOST_STEP:
    case DELETE_NON_MOST_STEPS_FULFILLED:
      return initialState;

    case DELETE_NON_MOST_STEPS_REJECTED:
      return state.set('deleting', false);

    default:
      return state;
  }
}
