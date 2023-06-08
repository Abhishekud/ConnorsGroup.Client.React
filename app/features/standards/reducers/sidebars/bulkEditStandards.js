import {Map, List, fromJS} from 'immutable';
import {
  BULK_UPDATE_STANDARDS_FULFILLED,
  BULK_UPDATE_STANDARDS_PENDING,
  BULK_UPDATE_STANDARDS_REJECTED,
  CLEAR_BULK_EDIT_STANDARDS_DATA,
  CLEAR_STANDARDS_LIST_BULK_EDIT_FIELDS,
  LOAD_STANDARDS_LIST_FULFILLED,
  SET_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY,
  SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY,
  SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY_CHECKED,
  TOGGLE_STANDARDS_LIST_BULK_EDIT_SIDEBAR,
} from '../../actions';

const initialState = Map({
  saving: false,
  open: false,
  model: Map({
    updateName: false,
    updateAttributeId: false,
    updateJobClassId: false,
    updateLaborCategoryId: false,
    updateClassificationId: false,
    updateAllowanceId: false,
    updatePartFamilyId: false,
    updateFixVariable: false,
    udpateStatus: false,
    updateEffectiveStartDate: false,
    updateEffectiveEndDate: false,
    filingFieldValues: List(),
    filingFieldsChecked: List(),
  }),
  validationErrors: Map(),
  appliedCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STANDARDS_LIST_BULK_EDIT_SIDEBAR:
      return state.withMutations(map => {
        const isOpenNow = !map.get('open');
        if (!isOpenNow) map.set('validationErrors', List());
        map.set('open', isOpenNow);
      });

    case SET_STANDARDS_LIST_BULK_EDIT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY: {
      const {id, value} = action.payload;
      const filingFields = state.getIn(['model', 'filingFieldValues']);
      if (filingFields === null) {
        return state.setIn(['model', 'filingFieldValues'],
          fromJS([{standardFilingFieldId: id, standardFileFieldOptionId: value}]));
      }
      const index = filingFields.findIndex(y => y.get('standardFilingFieldId') === id);
      return state.updateIn(['model', 'filingFieldValues'], x => {
        if (index === -1) {
          if (value === null) return x;
          return x.push(fromJS({
            standardFilingFieldId: id,
            standardFilingFieldOptionId: value,
          }));
        }
        if (value === null) {
          return x.delete(index);
        }
        return x.set(index, fromJS({
          standardFilingFieldId: id,
          standardFilingFieldOptionId: value,
        }));
      });
    }

    case SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY_CHECKED: {
      const {id, checked} = action.payload;
      const filingFieldsChecked = state.getIn(['model', 'filingFieldsChecked']);
      const index = filingFieldsChecked.indexOf(id);

      return state.updateIn(['model', 'filingFieldsChecked'], x => {
        if (index === -1 && checked) return x.push(id);
        if (index >= 0 && !checked) return x.delete(index);
        return x;
      });

    }

    case CLEAR_STANDARDS_LIST_BULK_EDIT_FIELDS:
      return state.withMutations(map =>
        map.set('model', Map()));

    case BULK_UPDATE_STANDARDS_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_STANDARDS_FULFILLED:
      return state.set('saving', false);

    case BULK_UPDATE_STANDARDS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case CLEAR_BULK_EDIT_STANDARDS_DATA:
    case LOAD_STANDARDS_LIST_FULFILLED:
      return initialState;

    default:
      return state;
  }
}
