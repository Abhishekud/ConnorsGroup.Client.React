import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_SELECTED_ELEMENT_STEPS,
  SHOW_DELETE_SELECTED_ELEMENT_STEPS,
} from '../../actions';
import {
  DELETE_MOST_STEPS_FULFILLED,
  DELETE_MOST_STEPS_PENDING,
  DELETE_MOST_STEPS_REJECTED,
} from '../../../mostAnalysis/actions';
import {
  DELETE_NON_MOST_STEPS_FULFILLED,
  DELETE_NON_MOST_STEPS_PENDING,
  DELETE_NON_MOST_STEPS_REJECTED,
} from '../../../nonMOSTAnalysis/actions';
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
    case SHOW_DELETE_SELECTED_ELEMENT_STEPS: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        isMOST: payload.get('isMOST'),
        selectedStepIds: payload.get('selectedStepIds'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_NON_MOST_STEPS_PENDING:
    case DELETE_MOST_STEPS_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_SELECTED_ELEMENT_STEPS:
    case DELETE_NON_MOST_STEPS_FULFILLED:
    case DELETE_MOST_STEPS_FULFILLED:
      return initialState;

    case DELETE_NON_MOST_STEPS_REJECTED:
    case DELETE_MOST_STEPS_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
