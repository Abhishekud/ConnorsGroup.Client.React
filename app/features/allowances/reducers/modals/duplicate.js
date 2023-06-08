import {fromJS, Map} from 'immutable';
import {
  SHOW_DUPLICATE_ALLOWANCE,
  CANCEL_DUPLICATE_ALLOWANCE,
  SET_DUPLICATE_ALLOWANCE_MODEL_PROPERTY,
  DUPLICATE_ALLOWANCE_PENDING,
  DUPLICATE_ALLOWANCE_FULFILLED,
  DUPLICATE_ALLOWANCE_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  allowanceId: null,
  validationErrors: new Map(),
  model: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DUPLICATE_ALLOWANCE: {
      const {allowanceId, model} = action.payload;
      return initialState.withMutations(map => {
        map.set('show', true)
          .set('allowanceId', allowanceId)
          .set('model', model);
      });
    }

    case SET_DUPLICATE_ALLOWANCE_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['model', name], value);
        if (message && name === 'name') {
          map.setIn(['validationErrors', name], fromJS([message]));
        }
      }
      );
    }

    case DUPLICATE_ALLOWANCE_PENDING:
      return state.set('saving', true);

    case CANCEL_DUPLICATE_ALLOWANCE:
    case DUPLICATE_ALLOWANCE_FULFILLED:
      return initialState;

    case DUPLICATE_ALLOWANCE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
