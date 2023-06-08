import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_PART_FAMILY,
  CREATE_PART_FAMILY_FULFILLED,
  CREATE_PART_FAMILY_PENDING,
  CREATE_PART_FAMILY_REJECTED,
  SET_CREATE_PART_FAMILY_MODEL_PROPERTY,
  SHOW_CREATE_PART_FAMILY,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_PART_FAMILY:
      return initialState.set('show', true);

    case SET_CREATE_PART_FAMILY_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_PART_FAMILY_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_PART_FAMILY:
    case CREATE_PART_FAMILY_FULFILLED:
      return initialState;

    case CREATE_PART_FAMILY_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
