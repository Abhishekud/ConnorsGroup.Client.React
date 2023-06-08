import {Map, fromJS} from 'immutable';
import {
  ADD_ELEMENTS_FULFILLED,
  ADD_ELEMENTS_PENDING,
  ADD_ELEMENTS_REJECTED,
  CANCEL_CREATE_STANDARD_ELEMENT,
  CANCEL_SELECT_UNIT_OF_MEASURE,
  CREATE_STANDARD_ELEMENT_FULFILLED,
  CREATE_STANDARD_ELEMENT_PENDING,
  CREATE_STANDARD_ELEMENT_REJECTED,
  EDIT_STANDARD_ELEMENT,
  EDIT_STANDARD_ELEMENT_GROUP,
  SET_ADD_STANDARD_ELEMENT_MODEL_PROPERTY,
  SET_CREATE_STANDARD_ELEMENT_MODEL_PROPERTY,
  SHOW_CREATE_STANDARD_ELEMENT,
  TOGGLE_CREATE_STANDARD_ELEMENT,
} from '../../actions';
import {BASIC_MOST} from '../../../mostAnalysis/constants/mostTypes';
import {MOST} from '../../../elements/constants/elementTypes';
import {CREATE_UNIT_OF_MEASURE_FULFILLED, SHOW_CREATE_UNIT_OF_MEASURE} from '../../../unitsOfMeasure/actions';

const initialState = new Map({
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

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_STANDARD_ELEMENT: {
      const {elementType, insertAtIndex, standardElementGroupId, standardTimeFormat, addElementModel} = action.payload;
      return initialState.withMutations(map => {
        if (elementType === MOST) map.setIn(['model', 'mostType'], BASIC_MOST);
        map.set('show', true)
          .setIn(['model', 'elementType'], elementType)
          .setIn(['model', 'insertAtIndex'], insertAtIndex)
          .setIn(['model', 'standardElementGroupId'], standardElementGroupId)
          .setIn(['model', 'timeFormat'], standardTimeFormat);
        if (addElementModel) {
          map.setIn(['model', 'mostType'], addElementModel.mostType);
          map.setIn(['model', 'name'], addElementModel.name)
            .set('elementId', addElementModel.id);
        }
      });
    }

    case SHOW_CREATE_UNIT_OF_MEASURE:
    case TOGGLE_CREATE_STANDARD_ELEMENT: {
      if (!state.get('editing')) {
        return state.update('show', show => !show);
      }
      return state;
    }

    case EDIT_STANDARD_ELEMENT_GROUP:
    case EDIT_STANDARD_ELEMENT:
      return state.set('editing', true);

    case SET_CREATE_STANDARD_ELEMENT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_STANDARD_ELEMENT_PENDING:
      return state.set('saving', true);

    case CANCEL_SELECT_UNIT_OF_MEASURE:
    case CANCEL_CREATE_STANDARD_ELEMENT:
    case CREATE_STANDARD_ELEMENT_FULFILLED:
      return initialState;

    case CREATE_STANDARD_ELEMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case SET_ADD_STANDARD_ELEMENT_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['model', name], value)
          .setIn(['validationErrors', name], message ? fromJS([message]) : Map());
      }
      );
    }

    case ADD_ELEMENTS_PENDING:
      return state.set('saving', true);

    case ADD_ELEMENTS_REJECTED:
    case ADD_ELEMENTS_FULFILLED: {
      return initialState.set('show', false);
    }

    case CREATE_UNIT_OF_MEASURE_FULFILLED:{
      return state.setIn(['model', 'unitOfMeasureId'], action.payload.data.id.toString());
    }

    default:
      return state;
  }
}
