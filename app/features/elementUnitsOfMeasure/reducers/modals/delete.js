import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_ELEMENT_UNIT_OF_MEASURE,
  SHOW_DELETE_ELEMENT_UNIT_OF_MEASURE,
  DELETE_ELEMENT_UNIT_OF_MEASURE_FULFILLED,
  DELETE_ELEMENT_UNIT_OF_MEASURE_PENDING,
  DELETE_ELEMENT_UNIT_OF_MEASURE_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    id: null,
    name: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_ELEMENT_UNIT_OF_MEASURE: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_ELEMENT_UNIT_OF_MEASURE_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_ELEMENT_UNIT_OF_MEASURE:
    case DELETE_ELEMENT_UNIT_OF_MEASURE_FULFILLED:
      return initialState;

    case DELETE_ELEMENT_UNIT_OF_MEASURE_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
