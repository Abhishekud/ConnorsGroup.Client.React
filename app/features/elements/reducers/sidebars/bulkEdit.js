import {Map, List, fromJS} from 'immutable';
import {
  TOGGLE_ELEMENT_PROFILE_BULK_EDIT_SIDEBAR,
  TOGGLE_SELECT_ELEMENT_STEP,
  SET_ELEMENT_PROFILE_BULK_EDIT_MODEL_PROPERTY,
  CLEAR_ELEMENT_PROFILE_BULK_EDIT_FIELDS,
  SELECT_ALL_ELEMENT_STEPS_FOR_BULK_EDIT,
  BULK_UPDATE_ELEMENT_STEPS_PENDING,
  BULK_UPDATE_ELEMENT_STEPS_FULFILLED,
  BULK_UPDATE_ELEMENT_STEPS_REJECTED,
  LOAD_MOST_ELEMENT_FULFILLED,
  LOAD_NON_MOST_ELEMENT_FULFILLED,
} from '../../actions';
import {
  LOAD_STANDARD_DETAILS_FULFILLED,
  LOAD_STANDARD_MOST_ELEMENT,
  LOAD_STANDARD_NON_MOST_ELEMENT,
  LOAD_STANDARD_MOST_ELEMENT_FULFILLED,
  LOAD_STANDARD_NON_MOST_ELEMENT_FULFILLED,
} from '../../../standards/actions';
import {DELETE_MOST_STEPS_FULFILLED} from '../../../mostAnalysis/actions';
import {DELETE_NON_MOST_STEPS_FULFILLED} from '../../../nonMOSTAnalysis/actions';

const initialState = Map({
  saving: false,
  open: false,
  model: Map({
    frequencyFormula: '',
    selectedStepIds: List(),
  }),
  validationErrors: Map(),
  appliedCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ELEMENT_PROFILE_BULK_EDIT_SIDEBAR:
      return state.withMutations(map => {
        const isOpenNow = !map.get('open');
        if (!isOpenNow) map.set('validationErrors', List());
        map.set('open', isOpenNow);
      });

    case SET_ELEMENT_PROFILE_BULK_EDIT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case TOGGLE_SELECT_ELEMENT_STEP: {
      const {standardElementId} = action.payload;
      const selectedStepIds = state.getIn(['model', 'selectedStepIds']);
      const index = selectedStepIds.indexOf(standardElementId);

      return state.updateIn(['model', 'selectedStepIds'], x => {
        if (index === -1) {
          return x.push(standardElementId);
        }
        return x.delete(index);
      });
    }

    case SELECT_ALL_ELEMENT_STEPS_FOR_BULK_EDIT: {
      const {ids} = action.payload;
      const selectedStepIds = state.getIn(['model', 'selectedStepIds']);
      return state.updateIn(['model', 'selectedStepIds'], x => x.withMutations(map => {
        ids.forEach(id => {
          const index = selectedStepIds.indexOf(id);
          if (index === -1) map.push(id);
        });
      }));
    }

    case CLEAR_ELEMENT_PROFILE_BULK_EDIT_FIELDS:
      return state.withMutations(map =>
        map.set('model', Map()));

    case BULK_UPDATE_ELEMENT_STEPS_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_ELEMENT_STEPS_FULFILLED:
      return state.withMutations(map =>
        map.set('saving', false)
          .setIn(['model', 'selectedStepIds'], List())
      );

    case BULK_UPDATE_ELEMENT_STEPS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case LOAD_MOST_ELEMENT_FULFILLED:
    case LOAD_STANDARD_MOST_ELEMENT:
    case LOAD_STANDARD_NON_MOST_ELEMENT:
    case LOAD_NON_MOST_ELEMENT_FULFILLED:
    case LOAD_STANDARD_DETAILS_FULFILLED:
    case LOAD_STANDARD_MOST_ELEMENT_FULFILLED:
    case LOAD_STANDARD_NON_MOST_ELEMENT_FULFILLED:
    case DELETE_MOST_STEPS_FULFILLED:
    case DELETE_NON_MOST_STEPS_FULFILLED:
      return initialState;

    default:
      return state;
  }
}
