import {fromJS} from 'immutable';
import {
  SHOW_CREATE_ATTRIBUTE_MODAL,
  HIDE_CREATE_ATTRIBUTE_MODAL,
  CREATE_REFLEXIS_ATTRIBUTE_PENDING,
  CREATE_REFLEXIS_ATTRIBUTE_REJECTED,
  CREATE_REFLEXIS_ATTRIBUTE_FULFILLED,
  SET_CREATE_ATTRIBUTE_PROPERTY,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  model: {
    name: '',
  },
  validationErrors: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_ATTRIBUTE_MODAL:
      return state.set('show', true);

    case HIDE_CREATE_ATTRIBUTE_MODAL:
      return state.set('show', false);

    case CREATE_REFLEXIS_ATTRIBUTE_PENDING:
      return state.set('saving', true);

    case CREATE_REFLEXIS_ATTRIBUTE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });

    case CREATE_REFLEXIS_ATTRIBUTE_FULFILLED: {
      if (action.payload.status === 200) {
        return initialState;
      }
      return state.set('loading', false);
    }

    case SET_CREATE_ATTRIBUTE_PROPERTY:
      return state.setIn(['model', action.payload.name], action.payload.value);
  }

  return state;
}
