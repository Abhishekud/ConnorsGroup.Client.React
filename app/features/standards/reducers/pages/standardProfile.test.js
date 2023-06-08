import {Map} from 'immutable';
import {default as reducerFunction} from './standardProfile';
import {BULK_PASTE_STANDARD_ITEMS_FULFILLED} from '../../actions';
import {standardItemModelsArrayToMapById, createStandardItemStates} from '../../services';
import {STANDARD_ELEMENT_GROUP, STANDARD_ELEMENT} from '../../constants/standardItemTypes';
const {describe, test, expect, beforeEach} = global;

describe('On successful paste, pasted items should be merged in state correctly', () => {
  const bulkPasteStandardItemsFulfilledAction = {
    type: BULK_PASTE_STANDARD_ITEMS_FULFILLED,
    payload: {},
  };

  const standardItemsArray = [
    {
      'type': 'StandardElementGroup',
      'id': 35,
      'index': 1,
      'name': 'Collect items from cart',
      'normalTimeMeasurementUnits': 416.66666666666663,
      'concurrencyToken': 'f0cc4f97-d069-4043-bac2-46c738adf019',
    },
    {
      'type': 'StandardElement',
      'standardElementGroupId': 35,
      'elementType': 'Timed',
      'elementId': 100003,
      'unitOfMeasureId': 2,
      'unitOfMeasureName': 'NO_OF_ITEMS',
      'measuredTimeMeasurementUnits': 277.77777777777777,
      'frequencyFormula': '1',
      'frequencyValue': 1.0,
      'internal': false,
      'machineAllowance': false,
      'comment': null,
      'elementStatus': 'Draft',
      'id': 36,
      'index': 2,
      'name': 'Pick item from cart',
      'normalTimeMeasurementUnits': 277.77777777777777,
      'concurrencyToken': '4df772ac-168d-4b89-9fca-a6be06d6c6fc',
    },
    {
      'type': 'StandardElement',
      'standardElementGroupId': 35,
      'elementType': 'Timed',
      'elementId': 100004,
      'unitOfMeasureId': 2,
      'unitOfMeasureName': 'NO_OF_ITEMS',
      'measuredTimeMeasurementUnits': 138.88888888888889,
      'frequencyFormula': '1',
      'frequencyValue': 1.0,
      'internal': false,
      'machineAllowance': false,
      'comment': null,
      'elementStatus': 'Draft',
      'id': 38,
      'index': 3,
      'name': 'Place item on the counter',
      'normalTimeMeasurementUnits': 138.88888888888889,
      'concurrencyToken': '2934f13c-6c55-4709-9a2e-5821fc4a7ae3',
    },
    {
      'type': 'StandardElement',
      'standardElementGroupId': null,
      'elementType': 'Timed',
      'elementId': 100005,
      'unitOfMeasureId': 2,
      'unitOfMeasureName': 'NO_OF_ITEMS',
      'measuredTimeMeasurementUnits': 111.11111111111111,
      'frequencyFormula': '1',
      'frequencyValue': 1.0,
      'internal': false,
      'machineAllowance': false,
      'comment': null,
      'elementStatus': 'Draft',
      'id': 37,
      'index': 4,
      'name': 'Scan item in billing system',
      'normalTimeMeasurementUnits': 111.11111111111111,
      'concurrencyToken': 'cdc69f0b-f6ab-46da-939c-b6af42d22b0f',
    },
    {
      'type': 'StandardElementGroup',
      'id': 39,
      'index': 5,
      'name': 'Set items in bags',
      'normalTimeMeasurementUnits': 250.0,
      'concurrencyToken': '6b71909c-0cb7-4f71-9200-02e84626f43f',
    },
    {
      'type': 'StandardElement',
      'standardElementGroupId': 39,
      'elementType': 'Timed',
      'elementId': 100006,
      'unitOfMeasureId': 2,
      'unitOfMeasureName': 'NO_OF_ITEMS',
      'measuredTimeMeasurementUnits': 0.0,
      'frequencyFormula': '1',
      'frequencyValue': 1.0,
      'internal': false,
      'machineAllowance': false,
      'comment': null,
      'elementStatus': 'Draft',
      'id': 40,
      'index': 6,
      'name': 'Pick item from counter',
      'normalTimeMeasurementUnits': 0.0,
      'concurrencyToken': '0da88222-b8d5-4e81-baa5-d1f688a00eca',
    },
    {
      'type': 'StandardElement',
      'standardElementGroupId': 39,
      'elementType': 'MOST',
      'elementId': 100007,
      'unitOfMeasureId': 2,
      'unitOfMeasureName': 'NO_OF_ITEMS',
      'measuredTimeMeasurementUnits': 250.0,
      'frequencyFormula': '1',
      'frequencyValue': 1.0,
      'internal': false,
      'machineAllowance': false,
      'comment': null,
      'elementStatus': 'Draft',
      'id': 42,
      'index': 7,
      'name': 'Place item in bag',
      'normalTimeMeasurementUnits': 250.0,
      'concurrencyToken': 'e5d21610-5ab1-44df-b3b5-1ce4d5b966e1',
    },
  ];

  const payloadData = {
    'standardElementGroups': [
      {
        'type': 'StandardElementGroup',
        'id': 57,
        'index': 5,
        'name': 'Joining Formalities',
        'normalTimeMeasurementUnits': 2611.1111111111113,
        'concurrencyToken': 'efb3a70c-fcc2-41a5-870d-440d80bb69ef',
      },
    ],
    'standardElements': [
      {
        'type': 'StandardElement',
        'standardElementGroupId': 57,
        'elementType': 'Timed',
        'elementId': 100000,
        'unitOfMeasureId': 1,
        'unitOfMeasureName': 'NUM_OF_FORMS ',
        'measuredTimeMeasurementUnits': 1722.2222222222224,
        'frequencyFormula': '1',
        'frequencyValue': 1.0,
        'internal': false,
        'machineAllowance': false,
        'comment': null,
        'elementStatus': 'Draft',
        'id': 58,
        'index': 6,
        'name': 'FILL JOINING FORMS',
        'normalTimeMeasurementUnits': 1722.2222222222224,
        'concurrencyToken': 'ddf589a8-00ab-4f19-89b6-38c2107a4e2a',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': 57,
        'elementType': 'Timed',
        'elementId': 100001,
        'unitOfMeasureId': 1,
        'unitOfMeasureName': 'NUM_OF_FORMS ',
        'measuredTimeMeasurementUnits': 888.888888888889,
        'frequencyFormula': '1',
        'frequencyValue': 1.0,
        'internal': false,
        'machineAllowance': false,
        'comment': null,
        'elementStatus': 'Draft',
        'id': 59,
        'index': 7,
        'name': 'FILL ACCESS FORMS',
        'normalTimeMeasurementUnits': 888.888888888889,
        'concurrencyToken': 'f0afc3bc-45a6-4abd-93e1-dbb129e6324b',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': null,
        'elementType': 'Timed',
        'elementId': 100001,
        'unitOfMeasureId': 1,
        'unitOfMeasureName': 'NUM_OF_FORMS ',
        'measuredTimeMeasurementUnits': 888.888888888889,
        'frequencyFormula': '1',
        'frequencyValue': 1.0,
        'internal': false,
        'machineAllowance': false,
        'comment': null,
        'elementStatus': 'Draft',
        'id': 60,
        'index': 8,
        'name': 'FILL ACCESS FORMS',
        'normalTimeMeasurementUnits': 888.888888888889,
        'concurrencyToken': 'a6e893f7-2e6d-4513-a08a-1ae579e049fe',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': null,
        'elementType': 'MOST',
        'elementId': 100002,
        'unitOfMeasureId': 1,
        'unitOfMeasureName': 'NUM_OF_FORMS ',
        'measuredTimeMeasurementUnits': 260.0,
        'frequencyFormula': '1',
        'frequencyValue': 1.0,
        'internal': false,
        'machineAllowance': false,
        'comment': null,
        'elementStatus': 'Draft',
        'id': 61,
        'index': 9,
        'name': 'SCAN PERSONAL DOCUMENTS',
        'normalTimeMeasurementUnits': 260.0,
        'concurrencyToken': '231b006b-a6f0-40a6-8815-6442e78036e8',
      },
    ],
    'standardItemIndexesAndTimes': [
      {
        'id': 35,
        'index': 1,
        'standardElementGroupId': null,
        'normalTimeMeasurementUnits': 416.66666666666663,
      },
      {
        'id': 36,
        'index': 2,
        'standardElementGroupId': 35,
        'normalTimeMeasurementUnits': 277.77777777777777,
      },
      {
        'id': 37,
        'index': 4,
        'standardElementGroupId': null,
        'normalTimeMeasurementUnits': 111.11111111111111,
      },
      {
        'id': 38,
        'index': 3,
        'standardElementGroupId': 35,
        'normalTimeMeasurementUnits': 138.88888888888889,
      },
      {
        'id': 57,
        'index': 5,
        'standardElementGroupId': null,
        'normalTimeMeasurementUnits': 2611.1111111111113,
      },
      {
        'id': 58,
        'index': 6,
        'standardElementGroupId': 57,
        'normalTimeMeasurementUnits': 1722.2222222222224,
      },
      {
        'id': 59,
        'index': 7,
        'standardElementGroupId': 57,
        'normalTimeMeasurementUnits': 888.888888888889,
      },
      {
        'id': 60,
        'index': 8,
        'standardElementGroupId': null,
        'normalTimeMeasurementUnits': 888.888888888889,
      },
      {
        'id': 61,
        'index': 9,
        'standardElementGroupId': null,
        'normalTimeMeasurementUnits': 260.0,
      },
      {
        'id': 39,
        'index': 10,
        'standardElementGroupId': null,
        'normalTimeMeasurementUnits': 250.0,
      },
      {
        'id': 40,
        'index': 11,
        'standardElementGroupId': 39,
        'normalTimeMeasurementUnits': 0.0,
      },
      {
        'id': 42,
        'index': 12,
        'standardElementGroupId': 39,
        'normalTimeMeasurementUnits': 250.0,
      },
    ],
    'standardUnitsOfMeasure': [
      {
        'id': 3,
        'unitOfMeasureName': 'NO_OF_ITEMS',
        'totalManualNormalTimeMeasurementUnits': 777.77777777777783,
        'totalMachineNormalTimeMeasurementUnits': 0.0,
        'totalNormalTimeMeasurementUnits': 777.77777777777783,
        'totalManualStandardTimeMeasurementUnits': 777.77777777777783,
        'totalMachineStandardTimeMeasurementUnits': 0.0,
        'totalStandardTimeMeasurementUnits': 777.77777777777783,
      },
    ],
  };

  let stateBeforePasteAction;

  beforeEach(() => {
    stateBeforePasteAction = new Map({
      standardItems: standardItemModelsArrayToMapById(standardItemsArray),
      standardItemsStates: createStandardItemStates(standardItemsArray),
      pristineStandardItems: Map(),
    });
  });

  test('Standard items total count should be correct after merging pasted items.', () => {
    bulkPasteStandardItemsFulfilledAction.payload = {data: payloadData};
    const SUT = reducerFunction(stateBeforePasteAction, bulkPasteStandardItemsFulfilledAction);
    const SUTStandardItems = SUT.get('standardItems');

    expect(SUTStandardItems.size).toEqual(12);
  });

  test('Standard element count should be correct after merging pasted items.', () => {
    bulkPasteStandardItemsFulfilledAction.payload = {data: payloadData};
    const SUT = reducerFunction(stateBeforePasteAction, bulkPasteStandardItemsFulfilledAction);
    const SUTStandardItems = SUT.get('standardItems');

    expect(SUTStandardItems.filter(si => si.get('type') === STANDARD_ELEMENT).count()).toEqual(9);
  });

  test('Standard element group count should be correct after merging pasted items.', () => {
    bulkPasteStandardItemsFulfilledAction.payload = {data: payloadData};
    const SUT = reducerFunction(stateBeforePasteAction, bulkPasteStandardItemsFulfilledAction);
    const SUTStandardItems = SUT.get('standardItems');

    expect(SUTStandardItems.filter(si => si.get('type') === STANDARD_ELEMENT_GROUP).count()).toEqual(3);
  });

  test('Pasted standard items should get merged in state variable "standardItems"', () => {
    bulkPasteStandardItemsFulfilledAction.payload = {data: payloadData};
    const SUT = reducerFunction(stateBeforePasteAction, bulkPasteStandardItemsFulfilledAction);
    const SUTStandardItems = SUT.get('standardItems');

    expect(SUTStandardItems.filter(si => si.get('id') === 57 && si.get('type') === STANDARD_ELEMENT_GROUP).count()).toEqual(1);
    expect(SUTStandardItems.filter(si => si.get('id') === 58 && si.get('type') === STANDARD_ELEMENT && si.get('standardElementGroupId') === 57).count()).toEqual(1);
    expect(SUTStandardItems.filter(si => si.get('id') === 59 && si.get('type') === STANDARD_ELEMENT && si.get('standardElementGroupId') === 57).count()).toEqual(1);

    expect(SUTStandardItems.filter(si => si.get('id') === 60 && si.get('type') === STANDARD_ELEMENT && si.get('standardElementGroupId') === null).count()).toEqual(1);
    expect(SUTStandardItems.filter(si => si.get('id') === 61 && si.get('type') === STANDARD_ELEMENT && si.get('standardElementGroupId') === null).count()).toEqual(1);

  });

  test('Standard item states count should be correct after merging pasted items.', () => {
    bulkPasteStandardItemsFulfilledAction.payload = {data: payloadData};
    const SUT = reducerFunction(stateBeforePasteAction, bulkPasteStandardItemsFulfilledAction);
    const SUTStandardItemsStates = SUT.get('standardItemsStates');

    expect(SUTStandardItemsStates.size).toEqual(12);
  });

  test('For each pasted standard item a new item state should get added to state variable "standardItemsStates"', () => {
    bulkPasteStandardItemsFulfilledAction.payload = {data: payloadData};
    const SUT = reducerFunction(stateBeforePasteAction, bulkPasteStandardItemsFulfilledAction);
    const SUTStandardItemsStates = SUT.get('standardItemsStates');
    const SUTStandardItemsStatesKeys = SUTStandardItemsStates.map(item => item.id).keySeq().toArray();

    expect(SUTStandardItemsStatesKeys.filter(x => x === 57).length).toEqual(1);
    expect(SUTStandardItemsStatesKeys.filter(x => x === 58).length).toEqual(1);
    expect(SUTStandardItemsStatesKeys.filter(x => x === 59).length).toEqual(1);
    expect(SUTStandardItemsStatesKeys.filter(x => x === 60).length).toEqual(1);
    expect(SUTStandardItemsStatesKeys.filter(x => x === 61).length).toEqual(1);

  });

});
