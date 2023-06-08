import {Map} from 'immutable';
import {
  SHOW_CONFIRM_UPDATE_ELEMENTS,
  CANCEL_UPDATE_ELEMENTS,
  HIDE_CONFIRM_UPDATE_ELEMENTS,
  BULK_UPDATE_ELEMENTS_FULFILLED,
  BULK_UPDATE_ELEMENTS_PENDING,
  BULK_UPDATE_ELEMENTS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  processing: false,
  model: Map(),
  oldStatus: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CONFIRM_UPDATE_ELEMENTS: {
      const {model, performSave} = action.payload;

      return initialState.withMutations(map =>
        map.set('show', true)
          .set('model', model)
          .set('performSave', performSave));
    }

    case BULK_UPDATE_ELEMENTS_PENDING:
      return state.set('processing', true);

    case HIDE_CONFIRM_UPDATE_ELEMENTS:
    case CANCEL_UPDATE_ELEMENTS:
    case BULK_UPDATE_ELEMENTS_FULFILLED:
    case BULK_UPDATE_ELEMENTS_REJECTED:
      return initialState;

    default:
      return state;
  }
}
