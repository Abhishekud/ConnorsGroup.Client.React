import {Map} from 'immutable';
import {
  SHOW_CONFIRM_UPDATE_STANDARD,
  CANCEL_UPDATE_STANDARD,
  HIDE_CONFIRM_UPDATE_STANDARD,
  UPDATE_STANDARD_FULFILLED,
  UPDATE_STANDARD_PENDING,
  UPDATE_STANDARD_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  processing: false,
  standardId: null,
  model: Map(),
  oldStatus: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CONFIRM_UPDATE_STANDARD: {
      const {id, model, oldStatus, performSave} = action.payload;

      return initialState.withMutations(map =>
        map.set('show', true)
          .set('standardId', id)
          .set('model', model)
          .set('performSave', performSave)
          .set('oldStatus', oldStatus));
    }

    case UPDATE_STANDARD_PENDING:
      return state.set('processing', true);

    case HIDE_CONFIRM_UPDATE_STANDARD:
    case CANCEL_UPDATE_STANDARD:
    case UPDATE_STANDARD_FULFILLED:
    case UPDATE_STANDARD_REJECTED:
      return initialState;

    default:
      return state;
  }
}
