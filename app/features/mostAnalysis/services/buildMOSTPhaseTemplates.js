import {OrderedMap, Map} from 'immutable';
import {
  GENERAL,
  CONTROL,
  TOOL_USE,
  EQUIPMENT_USE,
  PROCESS_TIME,
} from '../constants/sequenceModelTypes';
import {
  GET,
  PUT,
  RETURN,
  MOVE_ACTUATE,
  GET_TOOL,
  PUT_TOOL,
  TOOL_ACTION,
  ASIDE_TOOL,
  GET_EQUIPMENT,
  PUT_EQUIPMENT,
  EQUIPMENT_ACTION,
  ASIDE_EQUIPMENT,
} from '../constants/mostPhaseNames';
import getToolTypeParameterName from './getToolTypeParameterName';
import getEquipmentTypeParameterName from './getEquipmentTypeParameterName';

function buildABG(name) {
  return Map({
    name,
    parameters: OrderedMap([[1, 'A'], [2, 'B'], [3, 'G']]),
  });
}

function buildABP(name) {
  return Map({
    name,
    parameters: OrderedMap([[1, 'A'], [2, 'B'], [3, 'P']]),
  });
}

function buildA(name) {
  return Map({
    name,
    parameters: OrderedMap([[1, 'A']]),
  });
}

function buildParameterForNumberOfObjectsManipulated(mostAnalysisStep) {
  const numberOfObjectsManipulated = mostAnalysisStep.get('numberOfObjectsManipulated');
  if (numberOfObjectsManipulated > 1) {
    return [1, 'A'];
  }

  return null;
}

function buildParameterForToolOrEquipmentType(typePropertyName, mostAnalysisStep, getTypeParameterName) {
  const type = mostAnalysisStep.get(typePropertyName);
  const parameterName = getTypeParameterName(type);
  return [2, parameterName];
}

function buildToolActionPhase(name, mostAnalysisStep) {
  const parameters = [];

  const numObjsManipParameter = buildParameterForNumberOfObjectsManipulated(mostAnalysisStep);
  if (numObjsManipParameter) parameters.push(numObjsManipParameter);

  parameters.push(
    buildParameterForToolOrEquipmentType('toolType', mostAnalysisStep, getToolTypeParameterName));

  return Map({
    name,
    parameters: OrderedMap(parameters),
  });
}

function buildEquipmentActionPhase(name, mostAnalysisStep) {
  const parameters = [];

  const numObjsManipParameter = buildParameterForNumberOfObjectsManipulated(mostAnalysisStep);
  if (numObjsManipParameter) parameters.push(numObjsManipParameter);

  parameters.push(
    buildParameterForToolOrEquipmentType('equipmentType', mostAnalysisStep, getEquipmentTypeParameterName));

  return Map({
    name,
    parameters: OrderedMap(parameters),
  });
}

export default function (mostStep) {
  switch (mostStep.get('sequenceModelType')) {
    case GENERAL:
      return OrderedMap([
        [1, buildABG(GET)],
        [2, buildABP(PUT)],
        [3, buildA(RETURN)],
      ]);

    case CONTROL:
      return OrderedMap([
        [1, buildABG(GET)],
        [2, Map({
          name: MOVE_ACTUATE,
          parameters: Map([[1, 'M'], [2, 'X'], [3, 'I']]),
        })],
        [3, buildA(RETURN)],
      ]);

    case TOOL_USE:
      return OrderedMap([
        [1, buildABG(GET_TOOL)],
        [2, buildABP(PUT_TOOL)],
        [3, buildToolActionPhase(TOOL_ACTION, mostStep)],
        [4, buildABP(ASIDE_TOOL)],
        [5, buildA(RETURN)],
      ]);

    case EQUIPMENT_USE:
      return OrderedMap([
        [1, buildABG(GET_EQUIPMENT)],
        [2, buildABP(PUT_EQUIPMENT)],
        [3, buildEquipmentActionPhase(EQUIPMENT_ACTION, mostStep)],
        [4, buildABP(ASIDE_EQUIPMENT)],
        [5, buildA(RETURN)],
      ]);

    case PROCESS_TIME:
      return OrderedMap();

    default:
      throw new Error('Invalid sequence model type.');
  }
}
