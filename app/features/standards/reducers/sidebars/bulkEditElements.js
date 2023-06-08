import {Map, fromJS} from 'immutable';
import {
  TOGGLE_STANDARD_PROFILE_BULK_EDIT_SIDEBAR,
  SET_STANDARD_PROFILE_BULK_EDIT_MODEL_PROPERTY,
  CLEAR_STANDARD_PROFILE_BULK_EDIT_FIELDS,
  BULK_UPDATE_STANDARD_ELEMENTS_PENDING,
  BULK_UPDATE_STANDARD_ELEMENTS_FULFILLED,
  BULK_UPDATE_STANDARD_ELEMENTS_REJECTED,
} from '../../actions';

const initialState = Map({
  saving: false,
  open: false,
  model: Map({
    frequencyFormula: '',
  }),
  validationErrors: Map(),
  appliedCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STANDARD_PROFILE_BULK_EDIT_SIDEBAR:
      return initialState.set('open', !state.get('open'));

    case SET_STANDARD_PROFILE_BULK_EDIT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CLEAR_STANDARD_PROFILE_BULK_EDIT_FIELDS:
      return state.withMutations(map =>
        map.set('model', Map()));

    case BULK_UPDATE_STANDARD_ELEMENTS_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_STANDARD_ELEMENTS_FULFILLED:
      return state.withMutations(map =>
        map.set('saving', false));

    case BULK_UPDATE_STANDARD_ELEMENTS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
