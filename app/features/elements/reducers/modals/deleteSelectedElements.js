import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_SELECTED_ELEMENTS,
  SHOW_DELETE_SELECTED_ELEMENTS,
  DELETE_ELEMENTS_FULFILLED,
  DELETE_ELEMENTS_PENDING,
  DELETE_ELEMENTS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    selectedElementIds: null,
    name: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_SELECTED_ELEMENTS: {
      const model = Map({
        selectedElementIds: action.payload,
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_ELEMENTS_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_SELECTED_ELEMENTS:
    case DELETE_ELEMENTS_FULFILLED:
      return initialState;

    case DELETE_ELEMENTS_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
