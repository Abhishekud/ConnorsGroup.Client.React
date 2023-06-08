import {Map, fromJS} from 'immutable';
import {
  CANCEL_CREATE_ALLOWANCE_TIME,
  CREATE_ALLOWANCE_TIME_FULFILLED,
  CREATE_ALLOWANCE_TIME_PENDING,
  CREATE_ALLOWANCE_TIME_REJECTED,
  SET_CREATE_ALLOWANCE_TIME_MODEL_PROPERTY,
  SHOW_CREATE_ALLOWANCE_TIME,
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
    case SHOW_CREATE_ALLOWANCE_TIME: {
      const {allowanceId, allowanceTimeType} = action.payload;

      return initialState.withMutations(map =>
        map.set('show', true)
          .setIn(['model', 'allowanceId'], allowanceId)
          .setIn(['model', 'type'], allowanceTimeType));
    }

    case SET_CREATE_ALLOWANCE_TIME_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_ALLOWANCE_TIME_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_ALLOWANCE_TIME:
    case CREATE_ALLOWANCE_TIME_FULFILLED:
      return initialState;

    case CREATE_ALLOWANCE_TIME_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
