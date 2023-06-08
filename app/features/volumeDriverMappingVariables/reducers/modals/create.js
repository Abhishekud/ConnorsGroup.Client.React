import {Map, List, fromJS} from 'immutable';
import {
  CANCEL_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES,
  CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_FULFILLED,
  CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_PENDING,
  CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_REJECTED,
  SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_PROPERTY,
  SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_SET_VALUE,
  SHOW_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    description: null,
    observationNotes: null,
    volumeDriverMappingVariableValues: List(),
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES:
      return initialState.set('show', true);


    case SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_SET_VALUE: {
      const {volumeDriverMappingSetId, value} = action.payload;
      let volumeDriverMappingVariableValues = state.getIn(['model', 'volumeDriverMappingVariableValues']);
      volumeDriverMappingVariableValues = fromJS(volumeDriverMappingVariableValues);
      const valueIndex = volumeDriverMappingVariableValues.findIndex(v => v.get('volumeDriverMappingSetId') === volumeDriverMappingSetId);

      if (valueIndex < 0) {
        return state.setIn(['model', 'volumeDriverMappingVariableValues'], volumeDriverMappingVariableValues.push(Map({volumeDriverMappingSetId, value})));
      }

      return state.setIn(['model', 'volumeDriverMappingVariableValues', valueIndex, 'value'], value);
    }

    case CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES:
    case CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_FULFILLED:
      return initialState;

    case CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
