import {Map} from 'immutable';
import {default as reducerFunction} from './select';
import {SHOW_SELECT_UNIT_OF_MEASURE,
  SELECT_UNIT_OF_MEASURE_FOR_ELEMENT,
  OPEN_ELEMENT_SEARCH,
  CANCEL_SELECT_UNIT_OF_MEASURE} from '../../actions';
import {CREATE_UNIT_OF_MEASURE_FULFILLED} from '../../../unitsOfMeasure/actions';
const {describe, test, expect, beforeEach} = global;

/**
 * Scenario: 01. A standard element is added from the Elements Search page
 * Given: User is on the Elements Search page, selects element(s) to add
 * When: User clicks the Add button on selecting element(s) from the Elements Search page
 * Then: The `Select or Create New Unit of Measure` modal is shown. On selecting a Unit of Measure from
 * the dropdown, the selected value should be set in the Unit of Measure field
 */
describe('01. A standard element is added from the Elements Search page', () => {

  const showSelectUnitOfMeasureAction = {
    type: SHOW_SELECT_UNIT_OF_MEASURE,
    payload: {},
  };

  const selectUnitOfMeasureForElementAction = {
    type: SELECT_UNIT_OF_MEASURE_FOR_ELEMENT,
    payload: {},
  };

  const initialPageLoadState = {
    type: OPEN_ELEMENT_SEARCH,
    payload: {},
  };

  let stateBeforeAddAction;

  beforeEach(() => {
    stateBeforeAddAction = new Map({
      show: false,
      selectedUnitOfMeasure: 0,
    });
  });

  test('Verify that the Select UoM modal should show when user clicks Add to add element(s) to a standard', () => {
    const SUT = reducerFunction(stateBeforeAddAction, showSelectUnitOfMeasureAction);
    const SUTShow = SUT.get('show');

    expect(SUTShow).toEqual(true);
  });

  test('Verify that the selected UoM is set when we select UoM from the select UoM modal', () => {
    selectUnitOfMeasureForElementAction.payload = '100522';
    const SUT = reducerFunction(stateBeforeAddAction, selectUnitOfMeasureForElementAction);
    const SUTselectedUnitOfMeasure = SUT.get('selectedUnitOfMeasure');
    expect(SUTselectedUnitOfMeasure).toEqual(selectUnitOfMeasureForElementAction.payload);
  });

  test('Verify that the Selected Unit of Measure is 0 and modal is not visible on initial page load', () => {
    initialPageLoadState.payload = 0;
    const SUT = reducerFunction(stateBeforeAddAction, initialPageLoadState);
    const SUTselectedUnitOfMeasure = SUT.get('selectedUnitOfMeasure');
    const SUTShow = SUT.get('show');
    expect(SUTselectedUnitOfMeasure).toEqual(stateBeforeAddAction.get('selectedUnitOfMeasure'));
    expect(SUTShow).toEqual(false);
  });
});


/**
 * Scenario: 02. User clicks Add new in the Select Unit of Measure dropdown
 * Given: Select Unit of Measure dropdown is open
 * When:  The user clicks Add New
 * Then: The `Create New Unit of Measure` modal should open and the underlying modal should be hidden.
 * On creating a new Unit of Measure, the Create New Unit of Measure modal should close and the newly
 * created Unit of Measure should be set in the Unit of Measure field in the underlying modal
 */
describe('02. User clicks Add new in the Select or Create New Unit of Measure dropdown', () => {

  const cancelSelectUnitOfMeasureAction = {
    type: CANCEL_SELECT_UNIT_OF_MEASURE,
    payload: {},
  };

  const createUnitOfMeasureAction = {
    type: CREATE_UNIT_OF_MEASURE_FULFILLED,
    payload: {},
  };

  let stateBeforeAddAction;

  beforeEach(() => {
    stateBeforeAddAction = new Map({
      show: false,
      selectedUnitOfMeasure: 0,
    });
  });

  test('Verify that the Select Unit of Measure modal is closed when user clicks Add new from the dropdown', () => {
    const SUT = reducerFunction(stateBeforeAddAction, cancelSelectUnitOfMeasureAction);
    const SUTShow = SUT.get('show');

    expect(SUTShow).toEqual(false);
  });

  test('Verify that the newly created UoM should be set when we create new UoM from the create UoM modal', () => {
    createUnitOfMeasureAction.payload = {data: {id: 101522}};
    const SUT = reducerFunction(stateBeforeAddAction, createUnitOfMeasureAction);
    const SUTselectedUnitOfMeasure = SUT.get('selectedUnitOfMeasure');

    expect(SUTselectedUnitOfMeasure).toEqual(createUnitOfMeasureAction.payload.data.id.toString());
  });
});
