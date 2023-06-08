import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_VOLUME_DRIVER_MAPPING_SET,
  CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  CREATE_VOLUME_DRIVER_MAPPING_SET_PENDING,
  CREATE_VOLUME_DRIVER_MAPPING_SET_REJECTED,
  SET_CREATE_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY,
  SHOW_CREATE_VOLUME_DRIVER_MAPPING_SET,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    copyFromCategoryId: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_VOLUME_DRIVER_MAPPING_SET:
      return initialState.set('show', true);

    case SET_CREATE_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_VOLUME_DRIVER_MAPPING_SET_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_VOLUME_DRIVER_MAPPING_SET:
    case CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED:
      return initialState;

    case CREATE_VOLUME_DRIVER_MAPPING_SET_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
