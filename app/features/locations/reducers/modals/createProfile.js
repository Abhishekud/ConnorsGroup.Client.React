import {List, Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_LOCATION_PROFILE,
  CREATE_LOCATION_PROFILE_FULFILLED,
  CREATE_LOCATION_PROFILE_PENDING,
  CREATE_LOCATION_PROFILE_REJECTED,
  SET_CREATE_LOCATION_PROFILE_MODEL_PROPERTY,
  SHOW_CREATE_LOCATION_PROFILE,
  ADD_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT,
  REMOVE_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    departments: List(),
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_LOCATION_PROFILE:
      return initialState.set('show', true);

    case SET_CREATE_LOCATION_PROFILE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_LOCATION_PROFILE_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_LOCATION_PROFILE:
    case CREATE_LOCATION_PROFILE_FULFILLED:
      return initialState;

    case CREATE_LOCATION_PROFILE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case ADD_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT: {
      const {id, name} = action.payload;
      const departments = state.getIn(['model', 'departments']);
      const index = departments.findIndex(y => y.get('id') === id);
      return index === -1 ? state.updateIn(['model', 'departments'], x => x.push(fromJS({id, name}))) : state;
    }

    case REMOVE_CREATE_LOCATION_PROFILE_MODEL_DEPARTMENT: {
      const id = action.payload;
      const departments = state.getIn(['model', 'departments']);
      const index = departments.findIndex(y => y.get('id') === id);
      return index > -1 ? state.updateIn(['model', 'departments'], x => x.delete(index)) : state;
    }

    default:
      return state;
  }
}
