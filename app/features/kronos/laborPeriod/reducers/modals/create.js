import {fromJS, Map} from 'immutable';
import {
  SHOW_CREATE_MODAL,
  HIDE_CREATE_MODAL,
  SET_PROPERTY_FOR_CREATE,
  CREATE_LABOR_PERIOD,
  CREATE_LABOR_PERIOD_PENDING,
  CREATE_LABOR_PERIOD_FULFILLED,
  CREATE_LABOR_PERIOD_REJECTED,
  ADD_ABSOLUTE_HOURS_LIST_ITEM_FOR_CREATE,
  ADD_OPERATION_HOURS_LIST_ITEM_FOR_CREATE,
  ADD_AFTER_OPEN_HOURS_LIST_ITEM_FOR_CREATE,
  ADD_AFTER_CLOSE_HOURS_LIST_ITEM_FOR_CREATE,
  REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_CREATE,
  SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
  SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
  SET_AFTER_OPEN_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
  SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
} from '../../actions';

import {KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX} from '../../../constants/KronosLaborPeriodTypes';

const initialState = fromJS({
  show: false,
  saving: false,
  model: new Map(),
  validationErrors: new Map(),
});

const initialLaborPeriod = fromJS([]);
const absoluteHoursMap = new Map(
  {
    day: '',
    timeField1: new Map({hour: '', minute: ''}),
    timeField2: new Map({hour: '', minute: ''}),
    laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.ABSOLUTE_HOURS,
  });
const operationHoursMap = new Map({
  day: '',
  laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.OPERATION_HOURS,
});
const afterOpenHoursMap = new Map({
  day: '',
  timeField1: new Map({hour: '', minute: '', negativeZero: false}),
  timeField2: new Map({hour: '', minute: '', negativeZero: false}),
  laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_OPEN_HOURS,
});
const afterCloseHoursMap = new Map({
  day: '',
  timeField1: new Map({hour: '', minute: '', negativeZero: false}),
  timeField2: new Map({hour: '', minute: '', negativeZero: false}),
  laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_CLOSE_HOURS,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_MODAL:
      return state.set('show', true).set('model', new Map());
    case HIDE_CREATE_MODAL:
      return initialState;
    case CREATE_LABOR_PERIOD_PENDING:
      return state.set('saving', true);
    case CREATE_LABOR_PERIOD:
    case CREATE_LABOR_PERIOD_FULFILLED:
      return state.set('show', false).set('saving', false).set('model', new Map());
    case CREATE_LABOR_PERIOD_REJECTED: {
      const {status, data} = action.payload.response;
      return state.set('saving', false).set('validationErrors', status === 400 ? fromJS(data) : Map());
    }

    case SET_PROPERTY_FOR_CREATE: {
      if (action.payload.id === 'laborPeriodType') {
        return state
          .setIn(['model', 'laborPeriodType'], action.payload.value)
          .setIn(['model', 'laborPeriodDays'], initialLaborPeriod);
      } else if (action.payload.id === 'trafficPatternType') {
        return state
          .setIn(['model', 'trafficPatternType'], action.payload.value);
      } else if (action.payload.id === 'laborDistributionType') {
        return state
          .setIn(['model', 'laborDistributionType'], action.payload.value);
      }

      return state.setIn(['model', action.payload.id], action.payload.value);
    }

    case ADD_ABSOLUTE_HOURS_LIST_ITEM_FOR_CREATE:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(absoluteHoursMap));
    case ADD_OPERATION_HOURS_LIST_ITEM_FOR_CREATE:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(operationHoursMap));
    case ADD_AFTER_OPEN_HOURS_LIST_ITEM_FOR_CREATE:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(afterOpenHoursMap));
    case ADD_AFTER_CLOSE_HOURS_LIST_ITEM_FOR_CREATE:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(afterCloseHoursMap));

    case REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_CREATE:
      return state.deleteIn(['model', 'laborPeriodDays', action.payload.index]);

    case SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE:
    case SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE:
    case SET_AFTER_OPEN_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE:
    case SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE:
      return state.setIn(['model', 'laborPeriodDays', action.payload.index, action.payload.id], action.payload.value);
  }
  return state;
}
