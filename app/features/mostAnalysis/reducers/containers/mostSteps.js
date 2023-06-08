import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {parentTypes} from '../../constants';
import mostParameterValidationErrorKeyRegExp from '../../constants/mostParameterValidationErrorKeyRegExp';
import {
  buildUpdatedMOSTPhases,
  createMOSTStepState,
  createMOSTStepStates,
  getUpdatedEquipmentType,
  getUpdatedNumberOfObjectsManipulated,
  getUpdatedToolType,
  calculateMOSTStepTMUs,
  calculateMOSTStepAdjustedTMUs,
  extractMOSTStepParameterValidationErrors,
} from '../../services';
import {LOAD_MOST_ELEMENT_FULFILLED, LOAD_MOST_ELEMENT_REJECTED} from '../../../elements/actions';
import {INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_FULFILLED, INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_REJECTED} from '../../../industryElements/actions';
import {INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_FULFILLED, INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_REJECTED} from '../../../industryStandards/actions';
import {LOAD_STANDARD_MOST_ELEMENT_FULFILLED, LOAD_STANDARD_MOST_ELEMENT_REVISION_FULFILLED, LOAD_STANDARD_MOST_ELEMENT_REVISION_REJECTED} from '../../../standards/actions';
import {
  CREATE_MOST_STEP_PENDING,
  CREATE_MOST_STEP_FULFILLED,
  CREATE_MOST_STEP_REJECTED,
  EDIT_MOST_STEP,
  CANCEL_EDIT_MOST_STEP,
  SET_MOST_STEP_MODEL_PROPERTY,
  SET_MOST_STEP_PHASE_PARAMETER_MODEL_PROPERTY,
  UPDATE_MOST_STEP_PENDING,
  UPDATE_MOST_STEP_FULFILLED,
  UPDATE_MOST_STEP_REJECTED,
  DELETE_MOST_STEPS_FULFILLED,
  MOVE_MOST_STEP_PENDING,
  MOVE_MOST_STEP_FULFILLED,
  MOVE_MOST_STEP_REJECTED,
  REGISTER_MOST_STEP_SCROLL_NODE,
} from '../../actions';

const initialState = Map({
  parentId: null,
  parentType: null,
  mostType: null,
  mostSteps: Map(),
  pristineMOSTSteps: Map(),
  mostStepStates: Map(),
  mostStepsValidationErrors: Map(),
  mostStepsParametersValidationErrors: Map(),
  creating: false,
  moving: false,
  scrollNodes: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_MOST_ELEMENT_FULFILLED:
    case LOAD_STANDARD_MOST_ELEMENT_FULFILLED:
    case INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_FULFILLED:
    case INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_FULFILLED:
    case LOAD_STANDARD_MOST_ELEMENT_REVISION_FULFILLED: {
      const {id: parentId, mostType, mostSteps} = action.payload.data;
      const parentType = action.type === LOAD_MOST_ELEMENT_FULFILLED
        ? parentTypes.ELEMENT : parentTypes.STANDARD_ELEMENT;

      return initialState.withMutations(map =>
        map.set('parentId', parentId)
          .set('parentType', parentType)
          .set('mostType', mostType)
          .set('mostSteps', modelsArrayToMapById(mostSteps))
          .set('pristineMOSTSteps', modelsArrayToMapById(mostSteps))
          .set('mostStepStates', createMOSTStepStates(mostSteps)));
    }

    case CREATE_MOST_STEP_PENDING:
      return state.set('creating', true);

    case LOAD_MOST_ELEMENT_REJECTED:
    case INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_REJECTED:
    case INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_REJECTED:
    case LOAD_STANDARD_MOST_ELEMENT_REVISION_REJECTED:
      return initialState;

    case CREATE_MOST_STEP_FULFILLED: {
      const {mostStep, mostStepNumbers} = action.payload.data;
      const mostStepNumbersMap = modelsArrayToMapById(mostStepNumbers);
      const mostStepMap = fromJS(mostStep);

      return state.withMutations(map =>
        map.set('creating', false)
          .setIn(['mostSteps', mostStep.id], mostStepMap)
          .setIn(['mostSteps', mostStep.id, 'description'], '')
          .setIn(['pristineMOSTSteps', mostStep.id], mostStepMap)
          .setIn(['mostStepStates', mostStep.id], createMOSTStepState())
          .setIn(['mostStepStates', mostStep.id, 'editing'], true)
          .mergeDeepIn(['mostSteps'], mostStepNumbersMap)
          .mergeDeepIn(['pristineMOSTSteps'], mostStepNumbersMap));
    }

    case CREATE_MOST_STEP_REJECTED:
      return state.set('creating', false);

    case EDIT_MOST_STEP: {
      const mostStepId = action.payload;

      return state.withMutations(map => {
        const mostSteps = map.getIn(['mostSteps', mostStepId]).withMutations(step => {
          step.set('mostPhases', buildUpdatedMOSTPhases(step, false));
        });
        map.setIn(['mostStepStates', mostStepId, 'editing'], true)
          .setIn(['mostSteps', mostStepId], mostSteps)
          .setIn(['pristineMOSTSteps', mostStepId], mostSteps);
      });
    }

    case CANCEL_EDIT_MOST_STEP: {
      const mostStepId = action.payload;

      return state.withMutations(map => {
        map.setIn(['mostStepStates', mostStepId, 'editing'], false)
          .setIn(['mostSteps', mostStepId], map.getIn(['pristineMOSTSteps', mostStepId]))
          .deleteIn(['pristineMOSTSteps', mostStepId])
          .deleteIn(['mostStepsValidationErrors', mostStepId])
          .deleteIn(['mostStepsParametersValidationErrors', mostStepId]);
      });
    }

    case SET_MOST_STEP_MODEL_PROPERTY: {
      const {mostStepId, name, value} = action.payload;

      const mostStep = state.getIn(['mostSteps', mostStepId]);

      const updatedMostStep = mostStep.withMutations(map => {
        map.set(name, value);

        if (name === 'sequenceModelType') {
          map.set('toolType', getUpdatedToolType(map))
            .set('equipmentType', getUpdatedEquipmentType(map))
            .set('numberOfObjectsManipulated', getUpdatedNumberOfObjectsManipulated(map))
            .set('mostPhases', buildUpdatedMOSTPhases(map, false));

          const stepTMUs = calculateMOSTStepTMUs(state.get('mostType'), map);
          map.set('measuredTimeMeasurementUnits', stepTMUs);
        }

        if (name === 'numberOfObjectsManipulated') {
          map.set('mostPhases', buildUpdatedMOSTPhases(map, true));

          const stepTMUs = calculateMOSTStepTMUs(state.get('mostType'), map);
          map.set('measuredTimeMeasurementUnits', stepTMUs);
        }

        if (name === 'toolType' || name === 'equipmentType') {
          map.set('mostPhases', buildUpdatedMOSTPhases(map, false));
        }

        const adjustedTMUs = calculateMOSTStepAdjustedTMUs(map);
        map.set('adjustedMeasuredTimeMeasurementUnits', adjustedTMUs);
      });

      return state.setIn(['mostSteps', mostStepId], updatedMostStep);
    }

    case SET_MOST_STEP_PHASE_PARAMETER_MODEL_PROPERTY: {
      const {mostStepId, mostPhaseNumber, mostParameterNumber, name, value} = action.payload;

      let mostStep = state.getIn(['mostSteps', mostStepId]);
      const mostPhases = mostStep.get('mostPhases');
      const mostPhaseIndex = mostPhases.findIndex(mp => mp.get('number') === mostPhaseNumber);
      const mostPhase = mostPhases.get(mostPhaseIndex);
      const mostParameters = mostPhase.get('mostParameters');
      const mostParameterIndex = mostParameters.findIndex(mp => mp.get('number') === mostParameterNumber);

      mostStep = mostStep.withMutations(map => {
        map.setIn([
          'mostPhases', mostPhaseIndex,
          'mostParameters', mostParameterIndex,
          name,
        ], value);

        const stepTMUs = calculateMOSTStepTMUs(state.get('mostType'), map);
        map.set('measuredTimeMeasurementUnits', stepTMUs);

        const adjustedTMUs = calculateMOSTStepAdjustedTMUs(map);
        map.set('adjustedMeasuredTimeMeasurementUnits', adjustedTMUs);
      });

      return state.setIn(['mostSteps', mostStepId], mostStep);
    }

    case UPDATE_MOST_STEP_PENDING:
      return state.setIn(['mostStepStates', action.payload, 'saving'], true);

    case UPDATE_MOST_STEP_FULFILLED: {
      const {mostStep} = action.payload.data;
      const mostStepId = mostStep.id;

      return state.withMutations(map => {
        map.setIn(['mostSteps', mostStepId], fromJS(mostStep))
          .setIn(['mostStepStates', mostStepId, 'editing'], false)
          .setIn(['mostStepStates', mostStepId, 'saving'], false)
          .deleteIn(['pristineMOSTSteps', mostStepId])
          .deleteIn(['mostStepsValidationErrors', mostStepId])
          .deleteIn(['mostStepsParametersValidationErrors', mostStepId]);
      });
    }

    case UPDATE_MOST_STEP_REJECTED: {
      const {payload} = action;
      const {id: mostStepId} = JSON.parse(payload.config.data);
      const {status, data} = payload.response || {};

      return state.withMutations(map => {
        map.setIn(['mostStepStates', mostStepId, 'saving'], false);

        if (status === 400) {
          const validationErrors = fromJS(data);

          const stepValidationErrors = validationErrors.filter(
            (_, key) => !mostParameterValidationErrorKeyRegExp.test(key)).toMap();

          map.setIn(['mostStepsValidationErrors', mostStepId], stepValidationErrors);
          map.setIn(['mostStepsParametersValidationErrors', mostStepId],
            extractMOSTStepParameterValidationErrors(validationErrors));
        } else {
          map.deleteIn(['mostStepsValidationErrors', mostStepId]);
          map.deleteIn(['mostStepsParametersValidationErrors', mostStepId]);
        }
      });
    }

    case DELETE_MOST_STEPS_FULFILLED: {
      const {mostStepIds, mostStepNumbers} = action.payload.data;
      const mostStepNumbersMap = modelsArrayToMapById(mostStepNumbers);

      return state.withMutations(map => {
        mostStepIds.forEach(mostStepId => {
          map.deleteIn(['mostSteps', mostStepId])
            .deleteIn(['pristineMOSTSteps', mostStepId])
            .deleteIn(['mostStepStates', mostStepId])
            .deleteIn(['mostStepsValidationErrors', mostStepId])
            .deleteIn(['mostStepsParametersValidationErrors', mostStepId]);
        });
        map.mergeDeepIn(['mostSteps'], mostStepNumbersMap)
          . mergeDeepIn(['pristineMOSTSteps'], mostStepNumbersMap);
      });
    }

    case MOVE_MOST_STEP_PENDING:
      return state.set('moving', true);

    case MOVE_MOST_STEP_REJECTED:
      return state.set('moving', false);

    case MOVE_MOST_STEP_FULFILLED: {
      const mostStepNumbersMap = modelsArrayToMapById(action.payload.data);

      return state.withMutations(map =>
        map.set('moving', false)
          .mergeDeepIn(['mostSteps'], mostStepNumbersMap)
          .mergeDeepIn(['pristineMOSTSteps'], mostStepNumbersMap));
    }

    case REGISTER_MOST_STEP_SCROLL_NODE: {
      const {nodeId, node} = action.payload;

      return state.setIn(['scrollNodes', nodeId], node);
    }

    default:
      return state;
  }
}
