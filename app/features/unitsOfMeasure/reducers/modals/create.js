import {
  CANCEL_CREATE_UNIT_OF_MEASURE,
  CREATE_UNIT_OF_MEASURE_FULFILLED,
  CREATE_UNIT_OF_MEASURE_PENDING,
  CREATE_UNIT_OF_MEASURE_REJECTED,
  SET_CREATE_UNIT_OF_MEASURE_MODEL_PROPERTY,
  SHOW_CREATE_UNIT_OF_MEASURE,
} from '../../actions';
import {fromJS, Map} from 'immutable';

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
    case SHOW_CREATE_UNIT_OF_MEASURE:
      return initialState.withMutations(map =>
        map.set('show', true)
          .setIn(['model', 'departmentId'], action.payload));

    case SET_CREATE_UNIT_OF_MEASURE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_UNIT_OF_MEASURE_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_UNIT_OF_MEASURE:
    case CREATE_UNIT_OF_MEASURE_FULFILLED:
      return initialState;

    case CREATE_UNIT_OF_MEASURE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
