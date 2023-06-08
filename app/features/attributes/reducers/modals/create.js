import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_ATTRIBUTE,
  CREATE_ATTRIBUTE_FULFILLED,
  CREATE_ATTRIBUTE_PENDING,
  CREATE_ATTRIBUTE_REJECTED,
  SET_CREATE_ATTRIBUTE_MODEL_PROPERTY,
  SHOW_CREATE_ATTRIBUTE,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  departmentName: '',
  model: new Map({
    name: '',
    departmentId: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_ATTRIBUTE: {
      const {departmentId, departmentName} = action.payload;

      return initialState.withMutations(map =>
        map.set('show', true)
          .set('departmentName', departmentName)
          .setIn(['model', 'departmentId'], departmentId));
    }

    case SET_CREATE_ATTRIBUTE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_ATTRIBUTE_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_ATTRIBUTE:
    case CREATE_ATTRIBUTE_FULFILLED:
      return initialState;

    case CREATE_ATTRIBUTE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
