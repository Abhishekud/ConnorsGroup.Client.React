import {standardItemModelsArrayToMapById, createStandardItemStates, createCopiedStandardItemsModel, pasteCopiedStandardItemsModel} from '../services';
import {STANDARD_ELEMENT, STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';
import expect from '../../shared/services/testHelper';
const {describe, test, beforeEach} = global;

describe('Test generation of payload(copiedStandardItemsModelFromClipboard) of bulk paste API on StandardProfilePage', () => {
  let sourceStandardId;

  let sourceStandardItemsArray;
  let sourceStandardItems;
  let sourceStandardItemsStates;
  let selectedSourceStandardItems;
  let selectedSourceStandardElementGroupIds;
  let destinationStandardItemsArray;
  let destinationStandardItems;
  let copiedStandardItemsModelFromClipboardOnCopy;

  beforeEach(() => {
    sourceStandardId = 100000;
    sourceStandardItemsArray = [
      {
        'type': 'StandardElementGroup',
        'id': 1,
        'index': 1,
        'name': 'Joining Formalities',
        'normalTimeMeasurementUnits': 2611.1111111111113,
        'concurrencyToken': '5f387c1d-dd5a-43fa-97d8-97a0b726a3a0',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': 1,
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
        'id': 2,
        'index': 2,
        'name': 'FILL JOINING FORMS',
        'normalTimeMeasurementUnits': 1722.2222222222224,
        'concurrencyToken': '7906e92e-8809-4a00-9bdd-fdb2f2e6493f',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': 1,
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
        'id': 3,
        'index': 3,
        'name': 'FILL ACCESS FORMS',
        'normalTimeMeasurementUnits': 888.888888888889,
        'concurrencyToken': '09403e6c-b06c-4b83-a8c1-283ced4c0f23',
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
        'id': 18,
        'index': 4,
        'name': 'FILL ACCESS FORMS',
        'normalTimeMeasurementUnits': 888.888888888889,
        'concurrencyToken': 'dc94a32a-5b88-44ac-86d2-27d867221fe9',
      },
      {
        'type': 'StandardElementGroup',
        'id': 4,
        'index': 5,
        'name': 'Document Collection',
        'normalTimeMeasurementUnits': 3704.4444444444448,
        'concurrencyToken': '8d700bf2-432d-4064-9485-ae97257246c9',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': 4,
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
        'id': 14,
        'index': 6,
        'name': 'FILL JOINING FORMS',
        'normalTimeMeasurementUnits': 1722.2222222222224,
        'concurrencyToken': 'c4019f7d-6a5c-4d8c-b757-d904f6a7feb7',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': 4,
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
        'id': 6,
        'index': 7,
        'name': 'FILL JOINING FORMS',
        'normalTimeMeasurementUnits': 1722.2222222222224,
        'concurrencyToken': 'd5d08b7a-3438-4053-a96b-809d5750d8af',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': 4,
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
        'id': 116,
        'index': 8,
        'name': 'SCAN PERSONAL DOCUMENTS',
        'normalTimeMeasurementUnits': 260.0,
        'concurrencyToken': 'ce80cf2e-c418-4294-ab28-701c36da7c6b',
      },
      {
        'type': 'StandardElement',
        'standardElementGroupId': null,
        'elementType': 'Timed',
        'elementId': 100001,
        'unitOfMeasureId': 1,
        'unitOfMeasureName': 'NUM_OF_FORMS ',
        'measuredTimeMeasurementUnits': 888.888888888889,
        'frequencyFormula': ' NUM_OF_JOINING_FORMS * 2',
        'frequencyValue': 200.0,
        'internal': false,
        'machineAllowance': false,
        'comment': null,
        'elementStatus': 'Draft',
        'id': 7,
        'index': 9,
        'name': 'FILL ACCESS FORMS',
        'normalTimeMeasurementUnits': 177777.77777777781,
        'concurrencyToken': '8eade7cc-d147-47ac-85f2-968fc1f40ee1',
      },
    ];

    destinationStandardItemsArray = [
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

    sourceStandardItems = standardItemModelsArrayToMapById(sourceStandardItemsArray);
    sourceStandardItemsStates = createStandardItemStates(sourceStandardItemsArray).setIn([2, 'selected'], true).setIn([3, 'selected'], true).setIn([18, 'selected'], true).setIn([116, 'selected'], true);
    selectedSourceStandardItems = sourceStandardItemsStates.filter(x => x.get('selected'));
    selectedSourceStandardElementGroupIds = [1];
    destinationStandardItems = standardItemModelsArrayToMapById(destinationStandardItemsArray);
    copiedStandardItemsModelFromClipboardOnCopy = createCopiedStandardItemsModel(sourceStandardId, selectedSourceStandardItems, sourceStandardItems, selectedSourceStandardElementGroupIds);
  });

  // Unit test cases to test createCopiedStandardItemsModel service
  test('After copy, copiedStandardItemsModelFromClipboard should contain correct sourceStandardId value.', () => {
    expect(copiedStandardItemsModelFromClipboardOnCopy.sourceStandardId).toEqual(sourceStandardId);
  });

  test('After copy, copiedStandardItemsModelFromClipboard should contain correct number of copied items.', () => {
    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems.length).toEqual(3);
  });

  test('After copy, copiedStandardItemsModelFromClipboard should not contain child elements of completely selected groups.', () => {
    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).not.toContainObjectWithProperty({id: 2});
    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).not.toContainObjectWithProperty({id: 3});
  });

  test('After copy, copiedStandardItemsModelFromClipboard should contain correct types for copied groups and elements.', () => {

    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).toContainObjectWithProperty({id: 1, type: STANDARD_ELEMENT_GROUP});
    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).toContainObjectWithProperty({id: 18, type: STANDARD_ELEMENT});
    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).toContainObjectWithProperty({id: 116, type: STANDARD_ELEMENT});

  });

  test('After copy, copiedStandardItemsModelFromClipboard should contain correct concurrency token for every copied standard item.', () => {

    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).toContainObjectWithProperty({id: 1, concurrencyToken: '5f387c1d-dd5a-43fa-97d8-97a0b726a3a0'});
    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).toContainObjectWithProperty({id: 18, concurrencyToken: 'dc94a32a-5b88-44ac-86d2-27d867221fe9'});
    expect(copiedStandardItemsModelFromClipboardOnCopy.copiedItems).toContainObjectWithProperty({id: 116, concurrencyToken: 'ce80cf2e-c418-4294-ab28-701c36da7c6b'});

  });

  test('After copy, copiedStandardItemsModelFromClipboard should not contain contain destinationStandardItemIndex, destinationStandardId, destinationElementGroupId and destinationStandardItemConcurrencyToken.', () => {

    expect(copiedStandardItemsModelFromClipboardOnCopy).not.toHaveProperty('destinationStandardItemIndex');
    expect(copiedStandardItemsModelFromClipboardOnCopy).not.toHaveProperty('destinationStandardId');
    expect(copiedStandardItemsModelFromClipboardOnCopy).not.toHaveProperty('destinationElementGroupId');
    expect(copiedStandardItemsModelFromClipboardOnCopy).not.toHaveProperty('destinationStandardItemConcurrencyToken');

  });

  test('After copy, copiedStandardItemsModelFromClipboard should have correct structure.', () => {

    const expectedCopiedStandardItemsModelFromClipboardOnCopy = {
      'sourceStandardId': 100000,
      'copiedItems': [
        {
          'type': 'StandardElementGroup',
          'id': 1,
          'concurrencyToken': '5f387c1d-dd5a-43fa-97d8-97a0b726a3a0',
        },
        {
          'type': 'StandardElement',
          'id': 18,
          'concurrencyToken': 'dc94a32a-5b88-44ac-86d2-27d867221fe9',
        },
        {
          'type': 'StandardElement',
          'id': 116,
          'concurrencyToken': 'ce80cf2e-c418-4294-ab28-701c36da7c6b',
        },
      ],
    };

    expect(copiedStandardItemsModelFromClipboardOnCopy).toEqual(expectedCopiedStandardItemsModelFromClipboardOnCopy);
  });

  // Unit test cases to test pasteCopiedStandardItemsModel service
  test('After paste, copiedStandardItemsModelFromClipboard should contain correct sourceStandardId value.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.sourceStandardId).toEqual(sourceStandardId);

  });

  test('After paste, copiedStandardItemsModelFromClipboard should contain correct number of copied items.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;

    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems.length).toEqual(3);
  });

  test('After paste, copiedStandardItemsModelFromClipboard should not contain child elements of completely selected groups.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).not.toContainObjectWithProperty({id: 2});
    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).not.toContainObjectWithProperty({id: 3});

  });

  test('After paste, copiedStandardItemsModelFromClipboard should contain correct types for copied groups and elements.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).toContainObjectWithProperty({id: 1, type: STANDARD_ELEMENT_GROUP});
    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).toContainObjectWithProperty({id: 18, type: STANDARD_ELEMENT});
    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).toContainObjectWithProperty({id: 116, type: STANDARD_ELEMENT});

  });

  test('copiedStandardItemsModelFromClipboard should contain correct concurrency token for every copied standard item.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).toContainObjectWithProperty({id: 1, concurrencyToken: '5f387c1d-dd5a-43fa-97d8-97a0b726a3a0'});
    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).toContainObjectWithProperty({id: 18, concurrencyToken: 'dc94a32a-5b88-44ac-86d2-27d867221fe9'});
    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.copiedItems).toContainObjectWithProperty({id: 116, concurrencyToken: 'ce80cf2e-c418-4294-ab28-701c36da7c6b'});
  });

  test('After paste, copiedStandardItemsModelFromClipboard should contain correct destinationStandardItemIndex value.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.destinationStandardItemIndex).toEqual(destinationStandardItemIndex);

  });

  test('After paste, copiedStandardItemsModelFromClipboard should contain correct destinationStandardId value.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.destinationStandardId).toEqual(destinationStandardId);

  });

  test('After paste, copiedStandardItemsModelFromClipboard should contain correct destinationElementGroupId value, if pasted within a group.', () => {
    const destinationStandardItemIndex = 2;
    const destinationStandardId = 100004;
    const destinationElementGroupId = 35;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.destinationElementGroupId).toEqual(destinationElementGroupId);

  });

  test('After paste, copiedStandardItemsModelFromClipboard should contain destinationElementGroupId value as null, if pasted out side of groups.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.destinationElementGroupId).toBeNull();

  });

  test('After paste, copiedStandardItemsModelFromClipboard should contain correct destinationStandardItemConcurrencyToken value.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste.destinationStandardItemConcurrencyToken).toEqual('6b71909c-0cb7-4f71-9200-02e84626f43f');

  });

  test('After paste, copiedStandardItemsModelFromClipboard should have correct structure.', () => {
    const destinationStandardItemIndex = 5;
    const destinationStandardId = 100004;
    const destinationElementGroupId = null;
    const expectedCopiedStandardItemsModelFromClipboardOnPaste = {
      'sourceStandardId': 100000,
      'copiedItems': [
        {
          'type': 'StandardElementGroup',
          'id': 1,
          'concurrencyToken': '5f387c1d-dd5a-43fa-97d8-97a0b726a3a0',
        },
        {
          'type': 'StandardElement',
          'id': 18,
          'concurrencyToken': 'dc94a32a-5b88-44ac-86d2-27d867221fe9',
        },
        {
          'type': 'StandardElement',
          'id': 116,
          'concurrencyToken': 'ce80cf2e-c418-4294-ab28-701c36da7c6b',
        },
      ],
      'destinationStandardItemIndex': 5,
      'destinationStandardId': 100004,
      'destinationElementGroupId': null,
      'destinationStandardItemConcurrencyToken': '6b71909c-0cb7-4f71-9200-02e84626f43f',
    };

    const SUTCopiedStandardItemsModelFromClipboardOnPaste = pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboardOnCopy, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, destinationStandardItems);

    expect(SUTCopiedStandardItemsModelFromClipboardOnPaste).toEqual(expectedCopiedStandardItemsModelFromClipboardOnPaste);
  });

});
