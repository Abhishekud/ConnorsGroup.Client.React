import {List, Map} from 'immutable';
import buildMOSTPhaseTemplates from './buildMOSTPhaseTemplates';
import {
  TOOL_USE,
  EQUIPMENT_USE,
} from '../constants/sequenceModelTypes';
import {
  getUpdatedNumberOfObjectsManipulated,
} from '../services';
function createEmptyMOSTPhaseModel(number) {
  return Map({
    id: null,
    number,
    name: null,
    mostParameters: List(),
  });
}

function createEmptyMOSTParameterModel(number, name) {
  return Map({
    id: null,
    number,
    name,
    frequency: 1,
    frequencyIsLocked: false,
    simultaneous: false,
    indexValue: 0,
    indexValues: [],
  });
}

function buildUpdatedMOSTParameters(phaseTemplate, currentPhase, toolOrEquipmentUse, updatingNumberofObjects, numberOfObjects) {
  return phaseTemplate.get('parameters').map((name, number) => {
    const currentParameter = currentPhase.get('mostParameters')
      .find(cp => cp.get('number') === number && cp.get('name') === name) ||
      createEmptyMOSTParameterModel(number, name);
    let frequency = currentParameter.get('frequency');
    let frequencyIsLocked = false;
    if (numberOfObjects > 1 && toolOrEquipmentUse &&
      ((currentPhase.get('number') === 2 && currentParameter.get('number') === 3) || (currentPhase.get('number') === 3))) {
      frequency = numberOfObjects;
      frequencyIsLocked = true;
    } else if (updatingNumberofObjects && toolOrEquipmentUse &&
      ((currentPhase.get('number') === 2 && currentParameter.get('number') === 3) || (currentPhase.get('number') === 3))) {
      frequency = 1;
    }
    return currentParameter.withMutations(map => {
      map.set('frequency', frequency)
        .set('frequencyIsLocked', frequencyIsLocked)
        .set('simultaneous', currentParameter.get('simultaneous'))
        .set('indexValue', currentParameter.get('indexValue'));
    });
  }).toList();
}

export default function (mostStep, updatingNumberofObjects) {
  const numberOfObjects = getUpdatedNumberOfObjectsManipulated(mostStep);
  const phaseTemplates = buildMOSTPhaseTemplates(mostStep);
  const currentPhases = mostStep.get('mostPhases');
  const sequenceModelType = mostStep.get('sequenceModelType');
  const toolOrEquipmentUse = (sequenceModelType === TOOL_USE || sequenceModelType === EQUIPMENT_USE);

  return phaseTemplates.map((phaseTemplate, number) => {
    const currentPhase = currentPhases
      .find(cp => cp.get('number') === number) || createEmptyMOSTPhaseModel(number);

    return currentPhase.withMutations(map => {
      map.set('name', phaseTemplate.get('name'))
        .set('mostParameters', buildUpdatedMOSTParameters(phaseTemplate, currentPhase, toolOrEquipmentUse, updatingNumberofObjects, numberOfObjects));
    });
  }).toList();
}
