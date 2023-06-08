import {default as reducer} from '../../../reducers/pages/list';
import {shouldReloadLaborStandardsSelector} from '.';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../../../shared/actions/index';
import {CALCULATE_LABOR} from '../../../../../shared/constants/backgroundJobs';
import {LOAD_LABOR_STANDARDS_LIST_PENDING} from '../../../actions';

const {describe, test, expect} = global;

// Apply a chain of actions through the reducer to test the resulting state.
function applyActions(actionChain) {
  // When initializing the reducer, you must start with a complete blank, but defined, state.
  let blankState;
  return actionChain.reduce((acc, curr) => reducer(acc, curr), blankState);
}

describe('Labor Standards List page should reload labor standards selector', () => {
  // We are testing the should reload labor standards selector. The resultFunc property
  // skips the chain of selectors so that we can pass just the list state.
  const sut = shouldReloadLaborStandardsSelector.resultFunc;


  test('should not reload by default', () => {
    const state = applyActions([{type: '@@INIT'}]);
    expect(sut(state)).toBeFalsy();
  });


  test('should not reload when calculation is occurring.', () => {
    const actions = [
      {type: '@@INIT'},
      {type: POLL_BACKGROUND_JOBS_FULFILLED, payload: {data: {activeJobs: true, backgroundJobTypes: [CALCULATE_LABOR]}}},
    ];
    const state = applyActions(actions);

    expect(sut(state)).toBeFalsy();
  });


  test('should not reload when calculation has not occurred since initial load.', () => {
    const actions = [
      {type: '@@INIT'},
      {type: POLL_BACKGROUND_JOBS_FULFILLED, payload: {data: {activeJobs: false, backgroundJobTypes: [CALCULATE_LABOR]}}},
    ];
    const state = applyActions(actions);

    expect(sut(state)).toBeFalsy();
  });


  test('should reload when calculation has occurred since initial load but is not now.', () => {
    const actions = [
      {type: '@@INIT'},
      {type: POLL_BACKGROUND_JOBS_FULFILLED, payload: {data: {activeJobs: true, backgroundJobTypes: [CALCULATE_LABOR]}}},
      {type: POLL_BACKGROUND_JOBS_FULFILLED, payload: {data: {activeJobs: false, backgroundJobTypes: [CALCULATE_LABOR]}}},
    ];
    const state = applyActions(actions);

    expect(sut(state)).toBeTruthy();
  });


  test('should not reload after reload request is sent', () => {
    const actions = [
      {type: '@@INIT'},
      {type: POLL_BACKGROUND_JOBS_FULFILLED, payload: {data: {activeJobs: true, backgroundJobTypes: [CALCULATE_LABOR]}}},
      {type: POLL_BACKGROUND_JOBS_FULFILLED, payload: {data: {activeJobs: false, backgroundJobTypes: [CALCULATE_LABOR]}}},
      {type: LOAD_LABOR_STANDARDS_LIST_PENDING},
    ];
    const state = applyActions(actions);

    expect(sut(state)).toBeFalsy();
  });
});
