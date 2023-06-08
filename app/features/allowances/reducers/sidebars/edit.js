import {fromJS, Map} from 'immutable';
import {
  TOGGLE_ALLOWANCE_BUILDER_EDIT_SIDEBAR,
  LOAD_ALLOWANCE_FULFILLED,
  EDIT_ALLOWANCE,
  CANCEL_EDIT_ALLOWANCE,
  SET_EDIT_ALLOWANCE_WORKING_MODEL_PROPERTY,
  UPDATE_ALLOWANCE_PENDING,
  UPDATE_ALLOWANCE_FULFILLED,
  UPDATE_ALLOWANCE_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  editing: false,
  saving: false,
  pristineModel: Map(),
  workingModel: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ALLOWANCE_BUILDER_EDIT_SIDEBAR: {
      if (state.get('show')) {
        return state.withMutations(map =>
          map.set('show', false)
            .set('editing', false)
            .set('workingModel', state.get('pristineModel'))
            .set('validationErrors', Map()));
      }

      return state.set('show', true);
    }

    case LOAD_ALLOWANCE_FULFILLED: {
      const {allowance} = action.payload.data;
      const model = fromJS(allowance);

      return state.withMutations(map =>
        map.set('show', false)
          .set('editing', false)
          .set('saving', false)
          .set('pristineModel', model)
          .set('workingModel', model)
          .set('validationErrors', Map()));
    }

    case EDIT_ALLOWANCE:
      return state.set('editing', true);

    case CANCEL_EDIT_ALLOWANCE:
      return state.withMutations(map =>
        map.set('editing', false)
          .set('workingModel', state.get('pristineModel'))
          .set('validationErrors', Map()));

    case SET_EDIT_ALLOWANCE_WORKING_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['workingModel', name], value);
        if (message && name === 'name') {
          map.setIn(['validationErrors', name], fromJS([message]));
        }
      }
      );
    }

    case UPDATE_ALLOWANCE_PENDING:
      return state.set('saving', true);

    case UPDATE_ALLOWANCE_FULFILLED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('editing', false)
          .set('pristineModel', fromJS(action.payload.data))
          .set('validationErrors', Map()));

    case UPDATE_ALLOWANCE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
