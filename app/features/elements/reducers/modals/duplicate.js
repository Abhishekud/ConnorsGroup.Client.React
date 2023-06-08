import {fromJS, Map} from 'immutable';
import {
  SHOW_DUPLICATE_ELEMENT,
  CANCEL_DUPLICATE_ELEMENT,
  SET_DUPLICATE_ELEMENT_MODEL_PROPERTY,
  DUPLICATE_ELEMENT_PENDING,
  DUPLICATE_ELEMENT_FULFILLED,
  DUPLICATE_ELEMENT_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  elementType: null,
  model: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DUPLICATE_ELEMENT: {
      const {model, elementType} = action.payload;

      return initialState.withMutations(map => {
        map.set('show', true)
          .set('model', model)
          .set('elementType', elementType);
      });
    }

    case SET_DUPLICATE_ELEMENT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case DUPLICATE_ELEMENT_PENDING:
      return state.set('saving', true);

    case CANCEL_DUPLICATE_ELEMENT:
    case DUPLICATE_ELEMENT_FULFILLED:
      return initialState;

    case DUPLICATE_ELEMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
