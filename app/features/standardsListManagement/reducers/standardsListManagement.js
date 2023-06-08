import {Map, fromJS} from 'immutable';
import {
  SELECT_STANDARDS_LIST_TYPE,
} from '../actions';
import {
  LOAD_STANDARD_FILING_FIELDS_LIST_FULFILLED,
  LOAD_STANDARD_FILING_FIELDS_LIST_PENDING,
  LOAD_STANDARD_FILING_FIELDS_LIST_REJECTED,
  CREATE_STANDARD_FILING_FIELD_FULFILLED,
  UPDATE_STANDARD_FILING_FIELD_FULFILLED,
  DELETE_STANDARD_FILING_FIELD_FULFILLED,
} from '../../standardFilingFields/actions';
import {
  STANDARDS_LIST_OPTION_DEPARTMENTS,
  STANDARDS_LIST_OPTION_CLASSIFICATIONS,
  STANDARDS_LIST_OPTION_JOB_CLASSES,
  STANDARDS_LIST_OPTION_LABOR_CATEGORIES,
  STANDARDS_LIST_OPTION_UNITS_OF_MEASURE,
  STANDARDS_LIST_OPTION_VOLUME_DRIVERS,
} from '../constants/listOptions';
import {modelsArrayToMapById} from '../../shared/services';

const systemFilingFields = [{
  id: STANDARDS_LIST_OPTION_DEPARTMENTS,
  name: 'Departments',
}, {
  id: STANDARDS_LIST_OPTION_CLASSIFICATIONS,
  name: 'Classifications',
}, {
  id: STANDARDS_LIST_OPTION_JOB_CLASSES,
  name: 'Job Classes',
}, {
  id: STANDARDS_LIST_OPTION_LABOR_CATEGORIES,
  name: 'Labor Categories',
}, {
  id: STANDARDS_LIST_OPTION_UNITS_OF_MEASURE,
  name: 'Units of Measure',
}, {
  id: STANDARDS_LIST_OPTION_VOLUME_DRIVERS,
  name: 'Volume Drivers',
}];

const initialState = new Map({
  loading: false,
  selectedStandardFilingField: Map(systemFilingFields[1]), // CLASSIFICATIONS
  standardFilingFields: modelsArrayToMapById(systemFilingFields),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_STANDARDS_LIST_TYPE: {
      const intId = Number.parseInt(action.payload, 10);
      const id = Number.isNaN(intId) ? action.payload : intId;

      return state.set('selectedStandardFilingField', state.getIn(['standardFilingFields', id]));
    }

    case UPDATE_STANDARD_FILING_FIELD_FULFILLED:
    case CREATE_STANDARD_FILING_FIELD_FULFILLED: {
      const {data} = action.payload;
      return state.withMutations(map =>
        map.set('selectedStandardFilingField', fromJS(data))
          .setIn(['standardFilingFields', data.id], fromJS(data)));
    }

    case DELETE_STANDARD_FILING_FIELD_FULFILLED: {
      return state.withMutations(map => {
        map.set('selectedStandardFilingField', initialState.get('selectedStandardFilingField'))
          .deleteIn(['standardFilingFields', action.payload.data]);
      });
    }

    case LOAD_STANDARD_FILING_FIELDS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_STANDARD_FILING_FIELDS_LIST_REJECTED:
      return state.set('loading', false);

    case LOAD_STANDARD_FILING_FIELDS_LIST_FULFILLED: {
      const {data} = action.payload;
      return state.withMutations(map => {
        const fields = map.get('standardFilingFields').withMutations(fs => {
          fs.merge(modelsArrayToMapById(data));
        });
        map.set('standardFilingFields', fields)
          .set('loading', false);
      });
    }

    default:
      return state;
  }
}
