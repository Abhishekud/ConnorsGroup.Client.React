import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById, formatTMUsNumericOnly} from '../../../shared/services';
import {parentTypes} from '../../constants';
import {
  createNonMOSTStepState,
  createNonMOSTStepStates,
  calculateNonMOSTStepAdjustedTMUs,
} from '../../services';
import {timeFormats} from '../../../shared/constants';
import {CHANGE_TIME_FORMAT} from '../../../shared/actions';
import {LOAD_NON_MOST_ELEMENT_FULFILLED, LOAD_NON_MOST_ELEMENT_REJECTED} from '../../../elements/actions';
import {INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_FULFILLED, INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_REJECTED} from '../../../industryElements/actions';
import {INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_NON_MOST_ELEMENT_DETAILS_FULFILLED, INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_NON_MOST_ELEMENT_DETAILS_REJECTED} from '../../../industryStandards/actions';
import {LOAD_STANDARD_NON_MOST_ELEMENT_FULFILLED, LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_FULFILLED, LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_REJECTED} from '../../../standards/actions';
import {
  CREATE_NON_MOST_STEP_PENDING,
  CREATE_NON_MOST_STEP_FULFILLED,
  CREATE_NON_MOST_STEP_REJECTED,
  EDIT_NON_MOST_STEP,
  CANCEL_EDIT_NON_MOST_STEP,
  SET_NON_MOST_STEP_MODEL_PROPERTY,
  UPDATE_NON_MOST_STEP_PENDING,
  UPDATE_NON_MOST_STEP_FULFILLED,
  UPDATE_NON_MOST_STEP_REJECTED,
  DELETE_NON_MOST_STEPS_FULFILLED,
  MOVE_NON_MOST_STEP_PENDING,
  MOVE_NON_MOST_STEP_FULFILLED,
  MOVE_NON_MOST_STEP_REJECTED,
  REGISTER_NON_MOST_STEP_SCROLL_NODE,
} from '../../actions';

const initialState = Map({
  parentId: null,
  parentType: null,
  nonMOSTSteps: Map(),
  pristineNonMOSTSteps: Map(),
  nonMOSTStepStates: Map(),
  nonMOSTStepsValidationErrors: Map(),
  moving: false,
  creating: false,

  timeFormat: timeFormats.SECONDS,

  scrollNodes: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIME_FORMAT:
      return state.set('timeFormat', action.payload);


    case LOAD_NON_MOST_ELEMENT_FULFILLED:
    case LOAD_STANDARD_NON_MOST_ELEMENT_FULFILLED:
    case INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_NON_MOST_ELEMENT_DETAILS_FULFILLED:
    case INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_FULFILLED:
    case LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_FULFILLED:{
      const {id: parentId, nonMOSTSteps} = action.payload.data;
      const parentType = action.type === LOAD_NON_MOST_ELEMENT_FULFILLED || action.type === INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_FULFILLED
        ? parentTypes.ELEMENT : parentTypes.STANDARD_ELEMENT;

      return initialState.withMutations(map =>
        map.set('timeFormat', state.get('timeFormat'))
          .set('parentId', parentId)
          .set('parentType', parentType)
          .set('nonMOSTSteps', modelsArrayToMapById(nonMOSTSteps))
          .set('pristineNonMOSTSteps', modelsArrayToMapById(nonMOSTSteps))
          .set('nonMOSTStepStates', createNonMOSTStepStates(nonMOSTSteps)));
    }

    case LOAD_NON_MOST_ELEMENT_REJECTED:
    case INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_REJECTED:
    case INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_NON_MOST_ELEMENT_DETAILS_REJECTED:
    case LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_REJECTED:
      return initialState;

    case CREATE_NON_MOST_STEP_PENDING:
      return state.set('creating', true);

    case CREATE_NON_MOST_STEP_FULFILLED: {
      const {nonMOSTStep, nonMOSTStepNumbers} = action.payload.data;
      const nonMOSTStepNumbersMap = modelsArrayToMapById(nonMOSTStepNumbers);
      const nonMOSTStepMap = fromJS(nonMOSTStep);

      return state.withMutations(map =>
        map.set('creating', false)
          .setIn(['nonMOSTSteps', nonMOSTStep.id], nonMOSTStepMap)
          .setIn(['nonMOSTSteps', nonMOSTStep.id, 'description'], '')
          .setIn(['pristineNonMOSTSteps', nonMOSTStep.id], nonMOSTStepMap)
          .setIn(['nonMOSTStepStates', nonMOSTStep.id], createNonMOSTStepState())
          .setIn(['nonMOSTStepStates', nonMOSTStep.id, 'editing'], true)
          .mergeDeepIn(['nonMOSTSteps'], nonMOSTStepNumbersMap)
          .mergeDeepIn(['pristineNonMOSTSteps'], nonMOSTStepNumbersMap));
    }

    case CREATE_NON_MOST_STEP_REJECTED:
      return state.set('creating', false);

    case EDIT_NON_MOST_STEP: {
      const nonMOSTStepId = action.payload;
      const nonMOSTStep = state.getIn(['nonMOSTSteps', nonMOSTStepId]);
      const timeFormat = state.get('timeFormat');

      return state.withMutations(map => {
        map.setIn(['nonMOSTStepStates', nonMOSTStepId, 'editing'], true)
          .setIn(['pristineNonMOSTSteps', nonMOSTStepId], nonMOSTStep);

        const updatedMTMUs = formatTMUsNumericOnly(nonMOSTStep.get('measuredTimeMeasurementUnits'), timeFormat);
        map.setIn(['nonMOSTSteps', nonMOSTStepId, 'measuredTimeMeasurementUnits'], updatedMTMUs);
      });
    }

    case CANCEL_EDIT_NON_MOST_STEP: {
      const nonMOSTStepId = action.payload;

      return state.withMutations(map => {
        map.setIn(['nonMOSTStepStates', nonMOSTStepId, 'editing'], false)
          .setIn(['nonMOSTSteps', nonMOSTStepId], map.getIn(['pristineNonMOSTSteps', nonMOSTStepId]))
          .deleteIn(['pristineNonMOSTSteps', nonMOSTStepId])
          .deleteIn(['nonMOSTStepsValidationErrors', nonMOSTStepId])
          .deleteIn(['nonMOSTStepsParametersValidationErrors', nonMOSTStepId]);
      });
    }

    case SET_NON_MOST_STEP_MODEL_PROPERTY: {
      const {nonMOSTStepId, name, value} = action.payload;

      const nonMOSTStep = state.getIn(['nonMOSTSteps', nonMOSTStepId]);

      const updatedNonMOSTStep = nonMOSTStep.withMutations(map => {
        map.set(name, value);

        const adjustedTMUs = calculateNonMOSTStepAdjustedTMUs(map, state.get('timeFormat'));
        map.set('adjustedMeasuredTimeMeasurementUnits', adjustedTMUs);
      });

      return state.setIn(['nonMOSTSteps', nonMOSTStepId], updatedNonMOSTStep);
    }

    case UPDATE_NON_MOST_STEP_PENDING:
      return state.setIn(['nonMOSTStepStates', action.payload, 'saving'], true);

    case UPDATE_NON_MOST_STEP_FULFILLED: {
      const {nonMOSTStep} = action.payload.data;
      const nonMOSTStepId = nonMOSTStep.id;

      return state.withMutations(map => {
        map.setIn(['nonMOSTSteps', nonMOSTStepId], fromJS(nonMOSTStep))
          .setIn(['nonMOSTStepStates', nonMOSTStepId, 'editing'], false)
          .setIn(['nonMOSTStepStates', nonMOSTStepId, 'saving'], false)
          .deleteIn(['pristineNonMOSTSteps', nonMOSTStepId])
          .deleteIn(['nonMOSTStepsValidationErrors', nonMOSTStepId]);
      });
    }

    case UPDATE_NON_MOST_STEP_REJECTED: {
      const {payload} = action;
      const {id: nonMOSTStepId} = JSON.parse(payload.config.data);
      const {status, data} = payload.response || {};

      return state.withMutations(map => {
        map.setIn(['nonMOSTStepStates', nonMOSTStepId, 'saving'], false);

        if (status === 400) {
          const validationErrors = fromJS(data);

          map.setIn(['nonMOSTStepsValidationErrors', nonMOSTStepId], validationErrors);
        } else {
          map.deleteIn(['nonMOSTStepsValidationErrors', nonMOSTStepId]);
        }
      });
    }

    case DELETE_NON_MOST_STEPS_FULFILLED: {
      const {nonMOSTStepIds, nonMOSTStepNumbers} = action.payload.data;
      const nonMOSTStepNumbersMap = modelsArrayToMapById(nonMOSTStepNumbers);

      return state.withMutations(map => {
        nonMOSTStepIds.forEach(nonMOSTStepId => {
          map.deleteIn(['nonMOSTSteps', nonMOSTStepId])
            .deleteIn(['pristineNonMOSTSteps', nonMOSTStepId])
            .deleteIn(['nonMOSTStepStates', nonMOSTStepId])
            .deleteIn(['nonMOSTStepsValidationErrors', nonMOSTStepId])
            .deleteIn(['nonMOSTStepsParametersValidationErrors', nonMOSTStepId]);
        });
        map.mergeDeepIn(['nonMOSTSteps'], nonMOSTStepNumbersMap)
          .mergeDeepIn(['pristineNonMOSTSteps'], nonMOSTStepNumbersMap);
      });
    }

    case MOVE_NON_MOST_STEP_PENDING:
      return state.set('moving', true);

    case MOVE_NON_MOST_STEP_REJECTED:
      return state.set('moving', false);

    case MOVE_NON_MOST_STEP_FULFILLED: {
      const nonMOSTStepNumbersMap = modelsArrayToMapById(action.payload.data);

      return state.withMutations(map =>
        map.set('moving', false)
          .mergeDeepIn(['nonMOSTSteps'], nonMOSTStepNumbersMap)
          .mergeDeepIn(['pristineNonMOSTSteps'], nonMOSTStepNumbersMap));
    }

    case REGISTER_NON_MOST_STEP_SCROLL_NODE: {
      const {nodeId, node} = action.payload;

      return state.setIn(['scrollNodes', nodeId], node);
    }

    default:
      return state;
  }
}
