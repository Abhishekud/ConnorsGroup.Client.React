import {Map, fromJS} from 'immutable';
import {
  BULK_UPDATE_ELEMENTS_FULFILLED,
  BULK_UPDATE_ELEMENTS_PENDING,
  BULK_UPDATE_ELEMENTS_REJECTED,
  CLEAR_BULK_EDIT_ELEMENTS_DATA,
  CLEAR_ELEMENTS_LIST_BULK_EDIT_FIELDS,
  LOAD_ELEMENTS_LIST_FULFILLED,
  SET_ELEMENTS_LIST_BULK_EDIT_MODEL_PROPERTY,
  TOGGLE_ELEMENTS_LIST_BULK_EDIT_SIDEBAR,
} from '../../actions';

const initialState = Map({
  saving: false,
  open: false,
  model: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ELEMENTS_LIST_BULK_EDIT_SIDEBAR:
      return state.withMutations(map => {
        const isOpenNow = !map.get('open');
        if (!isOpenNow) map.set('validationErrors', Map());
        map.set('open', isOpenNow);
      });

    case SET_ELEMENTS_LIST_BULK_EDIT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CLEAR_ELEMENTS_LIST_BULK_EDIT_FIELDS:
      return state.withMutations(map =>
        map.set('model', Map()));

    case BULK_UPDATE_ELEMENTS_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_ELEMENTS_FULFILLED:
      return state.set('saving', false);

    case BULK_UPDATE_ELEMENTS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case CLEAR_BULK_EDIT_ELEMENTS_DATA:
    case LOAD_ELEMENTS_LIST_FULFILLED:
      return initialState;

    default:
      return state;
  }
}
