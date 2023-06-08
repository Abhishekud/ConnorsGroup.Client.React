import {Map} from 'immutable';
import {default as reducerFunction} from './createStandardElement';
import {SHOW_CREATE_STANDARD_ELEMENT,
  TOGGLE_CREATE_STANDARD_ELEMENT,
  ADD_ELEMENTS_FULFILLED,
  EDIT_STANDARD_ELEMENT,
  EDIT_STANDARD_ELEMENT_GROUP,
  SET_ADD_STANDARD_ELEMENT_MODEL_PROPERTY} from '../../actions';
import {CREATE_UNIT_OF_MEASURE_FULFILLED, SHOW_CREATE_UNIT_OF_MEASURE} from '../../../unitsOfMeasure/actions';
import {MOST} from '../../../elements/constants/elementTypes';
import {BASIC_MOST} from '../../../mostAnalysis/constants/mostTypes';
const {describe, test, expect, beforeAll} = global;

/**
 * Scenario: 01. A new standard element is created
 * When: A new MOST element is created at index 1
 * Then: A `New MOST` modal is shown which will have BASIC_MOST as the value in the
 * MOST Type dropdown and all the other fields as empty.
 * Note: A new MOST standard element can be created outside or within a group
 */

describe('01. A new MOST standard element is created', () => {
  const createStandardElementAction = {
    type: SHOW_CREATE_STANDARD_ELEMENT,
    payload: {},
  };

  const payloadData = {
    elementType: MOST,
    insertAtIndex: 1,
    standardElementGroupId: null,
    standardTimeFormat: 'Seconds',
    addElementModel: null,
  };

  let stateBeforeAction;

  beforeAll(() => {
    stateBeforeAction = new Map({
      show: false,
      saving: false,
      validationErrors: new Map(),
      model: new Map({
        elementType: '',
        insertAtIndex: 0,
        standardElementGroupId: null,
        timeFormat: null,
        mostType: null,
        name: '',
        frequencyFormula: '',
        unitOfMeasureId: null,
        measuredTimeMeasurementUnits: 0,
        comment: '',
      }),
      elementId: 0,
      editing: false,
    });
  });

  test('Verify if create new MOST model has the correct values along with show state variable', () => {
    createStandardElementAction.payload = payloadData;
    const SUT = reducerFunction(stateBeforeAction, createStandardElementAction);

    expect(SUT.get('show')).toEqual(true);
    expect(SUT.getIn(['model', 'elementType'])).toEqual(MOST);
    expect(SUT.getIn(['model', 'mostType'])).toEqual(BASIC_MOST);
    expect(SUT.getIn(['model', 'insertAtIndex'])).toEqual(payloadData.insertAtIndex);
    expect(SUT.getIn(['model', 'standardElementGroupId'])).toEqual(null);
    expect(SUT.getIn(['model', 'timeFormat'])).toEqual(payloadData.standardTimeFormat);
  });

  test('Verify if create new MOST standard element model does not have the Add New Element Model values', () => {
    createStandardElementAction.payload = payloadData;
    const SUT = reducerFunction(stateBeforeAction, createStandardElementAction);

    expect(SUT.getIn(['model', 'name'])).toEqual(stateBeforeAction.getIn(['model', 'name']));
    expect(SUT.get('elementId')).toEqual(stateBeforeAction.get('elementId'));
  });

  test('Verify if create new MOST model has the correct values when adding standard element within a group along with show state variable', () => {
    payloadData.standardElementGroupId = 100000;
    createStandardElementAction.payload = payloadData;
    const SUT = reducerFunction(stateBeforeAction, createStandardElementAction);

    expect(SUT.get('show')).toEqual(true);
    expect(SUT.getIn(['model', 'elementType'])).toEqual(MOST);
    expect(SUT.getIn(['model', 'mostType'])).toEqual(BASIC_MOST);
    expect(SUT.getIn(['model', 'insertAtIndex'])).toEqual(payloadData.insertAtIndex);
    expect(SUT.getIn(['model', 'standardElementGroupId'])).toEqual(payloadData.standardElementGroupId);
    expect(SUT.getIn(['model', 'timeFormat'])).toEqual(payloadData.standardTimeFormat);
  });
});

/**
 * Scenario: 02. A new standard element is added by ID
 * When: A new MOST element with ID 101530 is added at index 1
 * Then: The 'Add' modal based on element type is shown which will contain
 *  the Name and MOST Type field pre-populated and all the other fields as empty.
 * Note: A new MOST standard element can be added outside or within a group
 */

describe('02. A new MOST standard element is added by ID', () => {
  const showCreateStandardElementAction = {
    type: SHOW_CREATE_STANDARD_ELEMENT,
    payload: {},
  };

  const setAddStandardElementModelPropertyAction = {
    type: SET_ADD_STANDARD_ELEMENT_MODEL_PROPERTY,
    payload: {},
  };

  const addElementsAction = {
    type: ADD_ELEMENTS_FULFILLED,
    payload: {},
  };

  const payloadData = {
    elementType: MOST,
    insertAtIndex: 1,
    standardElementGroupId: null,
    standardTimeFormat: 'Seconds',
    addElementModel: {id: 101530, name: 'Walk to Office', elementType: 'MOST', mostType: BASIC_MOST},
  };

  const emptyFieldData = {
    name: 'name',
    value: '',
    message: 'Name is required',
  };

  let stateBeforeAction;

  beforeAll(() => {
    stateBeforeAction = new Map({
      show: false,
      saving: false,
      validationErrors: new Map(),
      model: new Map({
        elementType: '',
        insertAtIndex: 0,
        standardElementGroupId: null,
        timeFormat: null,
        mostType: null,
        name: '',
        frequencyFormula: '',
        unitOfMeasureId: null,
        measuredTimeMeasurementUnits: 0,
        comment: '',
      }),
      elementId: 0,
      editing: false,
    });
  });

  test('Verify if Add new MOST model has the correct values along with show state variable when adding a standard element outside a group', () => {
    showCreateStandardElementAction.payload = payloadData;
    const SUT = reducerFunction(stateBeforeAction, showCreateStandardElementAction);

    expect(SUT.get('show')).toEqual(true);
    expect(SUT.getIn(['model', 'elementType'])).toEqual(MOST);
    expect(SUT.getIn(['model', 'mostType'])).toEqual(BASIC_MOST);
    expect(SUT.getIn(['model', 'insertAtIndex'])).toEqual(payloadData.insertAtIndex);
    expect(SUT.getIn(['model', 'standardElementGroupId'])).toEqual(payloadData.standardElementGroupId);
    expect(SUT.getIn(['model', 'timeFormat'])).toEqual(payloadData.standardTimeFormat);
    expect(SUT.getIn(['model', 'name'])).toEqual(payloadData.addElementModel.name);
    expect(SUT.get('elementId')).toEqual(payloadData.addElementModel.id);
  });

  test('Verify Add new MOST model does not have the name, element id, element type and most type empty', () => {
    showCreateStandardElementAction.payload = payloadData;
    const SUT = reducerFunction(stateBeforeAction, showCreateStandardElementAction);

    expect(SUT.getIn(['model', 'name'])).not.toEqual(stateBeforeAction.getIn(['model', 'name']));
    expect(SUT.getIn(['model', 'elementType'])).not.toEqual(stateBeforeAction.getIn(['model', 'elementType']));
    expect(SUT.getIn(['model', 'mostType'])).not.toEqual(stateBeforeAction.getIn(['model', 'mostType']));
    expect(SUT.get('elementId')).not.toEqual(stateBeforeAction.get('elementId'));
  });

  test('Verify if Add new MOST model has the correct values along with show state variable when adding a standard element within a group', () => {
    payloadData.standardElementGroupId = 100000;
    showCreateStandardElementAction.payload = payloadData;
    const SUT = reducerFunction(stateBeforeAction, showCreateStandardElementAction);

    expect(SUT.get('show')).toEqual(true);
    expect(SUT.getIn(['model', 'elementType'])).toEqual(MOST);
    expect(SUT.getIn(['model', 'mostType'])).toEqual(BASIC_MOST);
    expect(SUT.getIn(['model', 'insertAtIndex'])).toEqual(payloadData.insertAtIndex);
    expect(SUT.getIn(['model', 'standardElementGroupId'])).toEqual(payloadData.standardElementGroupId);
    expect(SUT.getIn(['model', 'timeFormat'])).toEqual(payloadData.standardTimeFormat);
    expect(SUT.getIn(['model', 'name'])).toEqual(payloadData.addElementModel.name);
    expect(SUT.get('elementId')).toEqual(payloadData.addElementModel.id);
  });

  test('Verify validation error(s) is/are displayed when the required value(s) is/are not provided, ', () => {
    setAddStandardElementModelPropertyAction.payload = emptyFieldData;
    const SUT = reducerFunction(stateBeforeAction, setAddStandardElementModelPropertyAction);
    const SUTName = SUT.getIn(['model', 'name']);
    const SUTValidationErrors = SUT.getIn(['validationErrors', 'name']).toJS();

    expect(SUTName).toEqual(emptyFieldData.value);
    expect(SUTValidationErrors[0]).toEqual(emptyFieldData.message);
  });

  test('Verify add standard element modal is closed when element is added', () => {
    const SUT = reducerFunction(stateBeforeAction, addElementsAction);
    const SUTShow = SUT.get('show');
    expect(SUTShow).toEqual(false);
  });

});

/**
 * Scenario: 03. A standard element is being edited
 * When: A standard element is being edited
 * Then: Then the editing state will be true
 * Note: A standard element or a standard element group can be edited
 */

describe('03. A standard element is being edited', () => {

  const editStandardElementAction = {
    type: EDIT_STANDARD_ELEMENT,
    payload: {},
  };

  const editStandardElementGroupAction = {
    type: EDIT_STANDARD_ELEMENT_GROUP,
    payload: {},
  };

  let stateBeforeAction;

  beforeAll(() => {
    stateBeforeAction = new Map({
      show: false,
      saving: false,
      validationErrors: new Map(),
      model: new Map({
        elementType: '',
        insertAtIndex: 0,
        standardElementGroupId: null,
        timeFormat: null,
        mostType: null,
        name: '',
        frequencyFormula: '',
        unitOfMeasureId: null,
        measuredTimeMeasurementUnits: 0,
        comment: '',
      }),
      elementId: 0,
      editing: false,
    });
  });

  test('Verify editing state is true when editing a standard element outside a group', () => {
    const SUTForElement = reducerFunction(stateBeforeAction, editStandardElementAction);
    const SUTElementEditing = SUTForElement.get('editing');

    expect(SUTElementEditing).toEqual(true);
  });

  test('Verify editing state is true when editing a standard element within a group', () => {
    const SUTForElementGroup = reducerFunction(stateBeforeAction, editStandardElementGroupAction);
    const SUTElementGroupEditing = SUTForElementGroup.get('editing');

    expect(SUTElementGroupEditing).toEqual(true);
  });
});

/**
 * Scenario: 04. A new Unit of Measure is created from the Create New Unit of Measure modal
 * When: User clicks on Add new from the Select Unit of Measure dropdown and creates new Unit of Measure
 * Then: On selecting Add new from the Select Unit of Measure dropdown, the `Create New Unit of Measure` modal
 * opens and the underlying Create or Add modal will be hidden. On creating a new Unit of Measure,
 * the Create New Unit of Measure modal should close and the newly created Unit of Measure should
 * be populated in the Unit of Measure field in the underlying modal
 */

describe('04. A new Unit of Measure is created from the Create New Unit of Measure modal', () => {

  const showCreateUnitOfMeasureAction = {
    type: SHOW_CREATE_UNIT_OF_MEASURE,
    payload: {},
  };

  const createUnitOfMeasureAction = {
    type: CREATE_UNIT_OF_MEASURE_FULFILLED,
    payload: {},
  };

  const toggleCreateStandardElementAction = {
    type: TOGGLE_CREATE_STANDARD_ELEMENT,
    payload: {},
  };

  let stateBeforeAction;

  beforeAll(() => {
    stateBeforeAction = new Map({
      show: false,
      saving: false,
      validationErrors: new Map(),
      model: new Map({
        elementType: '',
        insertAtIndex: 0,
        standardElementGroupId: null,
        timeFormat: null,
        mostType: null,
        name: '',
        frequencyFormula: '',
        unitOfMeasureId: null,
        measuredTimeMeasurementUnits: 0,
        comment: '',
      }),
      elementId: 0,
      editing: false,
    });
  });

  test('Verify that the Create/Add standard element modal is hidden when we click Add new to create a new Unit of Measure', () => {
    const SUT = reducerFunction(stateBeforeAction.withMutations(map => {
      map.set('editing', false)
        .set('show', true);
    }), showCreateUnitOfMeasureAction);
    const SUTShow = SUT.get('show');

    expect(SUTShow).toEqual(false);
  });

  test('Verify that the newly created Unit of Measure value is set in the model when we create new Unit of Measure', () => {
    createUnitOfMeasureAction.payload = {data: {id: 101522}};
    const SUT = reducerFunction(stateBeforeAction, createUnitOfMeasureAction);
    const SUTselectedUnitOfMeasure = SUT.getIn(['model', 'unitOfMeasureId']);

    expect(SUTselectedUnitOfMeasure).toEqual(createUnitOfMeasureAction.payload.data.id.toString());
  });

  test('Verify that the Create/Add standard element modal is visible when Create New Unit of Measure modal is cancelled or a new Unit of Measure is created', () => {
    toggleCreateStandardElementAction.payload = {show: true, editing: false};
    const SUT = reducerFunction(stateBeforeAction.withMutations(map => {
      map.set('editing', false)
        .set('show', false);
    }), toggleCreateStandardElementAction);
    const SUTShow = SUT.get('show');

    expect(SUTShow).toEqual(true);
  });
});

