import {Map} from 'immutable';
import {
  SHOW_STANDARD_TO_PRODUCTION_COMMENT,
  CANCEL_UPDATE_STANDARD,
  HIDE_STANDARD_TO_PRODUCTION_COMMENT,
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
    case SHOW_STANDARD_TO_PRODUCTION_COMMENT: {
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

    case HIDE_STANDARD_TO_PRODUCTION_COMMENT:
    case CANCEL_UPDATE_STANDARD:
    case UPDATE_STANDARD_FULFILLED:
    case UPDATE_STANDARD_REJECTED:
      return initialState;

    default:
      return state;
  }
}
