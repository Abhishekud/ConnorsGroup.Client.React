import {fromJS} from 'immutable';
import {
  SHOW_CREATE_MODAL,
  HIDE_CREATE_MODAL,
  SET_PROPERTY_FOR_CREATE,
  CREATE,
  CREATE_FULFILLED,
  CREATE_PENDING,
  CREATE_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  model: {
    name: null,
    genericDepartment: null,
    timeDependency: null,
    combinedDistribution: null,
    taskGroups: [],
  },
  validationErrors: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_MODAL:
      return state.set('show', true);
    case HIDE_CREATE_MODAL:
      return initialState;
    case CREATE_PENDING:
      return state.set('saving', true);
    case CREATE:
    case CREATE_FULFILLED:
      return initialState;
    case CREATE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    case SET_PROPERTY_FOR_CREATE: {
      if (action.payload.id === 'timeDependency') {
        return state
          .setIn(['model', action.payload.id], action.payload.value)
          //Since only one value allows for combined distribution, we can clear it out on any selection
          .setIn(['model', 'combinedDistribution'], null);
      }
      return state.setIn(['model', action.payload.id], action.payload.value);
    }
  }
  return state;
}
