import {fromJS} from 'immutable';
import {
  SET_PROPERTY_FOR_EDIT,
  CANCEL_EDIT,

  LOAD_TASK_FULFILLED,
  SAVE_EDIT_FULFILLED,
  SAVE_EDIT_PENDING,
  SAVE_EDIT_REJECTED,

  DELETE_FULFILLED,

  CREATE_FULFILLED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  model: {
    name: null,
    genericDepartment: null,
    timeDependency: null,
    combinedDistribution: null,
    message: null,
    success: null,
  },
  dirty: false,
  validationErrors: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CANCEL_EDIT:
    case DELETE_FULFILLED:
      return initialState;
    case SAVE_EDIT_FULFILLED:
      return initialState;
    case SAVE_EDIT_PENDING:
      return state.set('saving', true);
    case SAVE_EDIT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    case SET_PROPERTY_FOR_EDIT: {
      if (action.payload.id === 'timeDependency') {
        return state
          .setIn(['model', action.payload.id], action.payload.value)
          //Since only one value allows for combined distribution, we can clear it out on any selection
          .setIn(['model', 'combinedDistribution'], null)
          .set('dirty', true);
      }
      return state.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);
    }

    case LOAD_TASK_FULFILLED:
    case CREATE_FULFILLED:
      return state.set('show', true).set('dirty', false).set('model', fromJS(action.payload.data));
  }
  return state;
}

