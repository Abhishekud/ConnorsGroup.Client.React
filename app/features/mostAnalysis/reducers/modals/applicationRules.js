import {fromJS, Map, List} from 'immutable';
import {
  SHOW_MOST_STEP_APPLICATION_RULES_POPUP,
  HIDE_MOST_STEP_APPLICATION_RULES_POPUP,
  LOAD_APPLICATION_RULES_FULFILLED,
  LOAD_APPLICATION_RULES_PENDING,
  LOAD_APPLICATION_RULES_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  loading: false,
  model: new Map(),
  rules: new List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MOST_STEP_APPLICATION_RULES_POPUP: {
      const {mostType, mostStepId, toolUse, mostPhaseNumber, mostParameterNumber, mostParameterName, isToolAction} = action.payload;
      return state.withMutations(map => {
        map.set('show', true)
          .setIn(['model', 'mostType'], mostType)
          .setIn(['model', 'mostStepId'], mostStepId)
          .setIn(['model', 'toolUse'], toolUse)
          .setIn(['model', 'mostPhaseNumber'], mostPhaseNumber)
          .setIn(['model', 'mostParameterNumber'], mostParameterNumber)
          .setIn(['model', 'mostParameterName'], mostParameterName)
          .setIn(['model', 'isToolAction'], isToolAction);
      });
    }

    case HIDE_MOST_STEP_APPLICATION_RULES_POPUP:
      return initialState;

    case LOAD_APPLICATION_RULES_PENDING:
      return state.set('loading', true);

    case LOAD_APPLICATION_RULES_REJECTED:
      return state.set('loading', false);

    case LOAD_APPLICATION_RULES_FULFILLED: {
      return state.withMutations(map => {
        map.set('loading', false);
        map.set('rules', fromJS(action.payload.data));
      });
    }

    default:
      return state;
  }
}
