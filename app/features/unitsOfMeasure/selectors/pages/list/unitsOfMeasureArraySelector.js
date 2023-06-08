import {createSelector} from 'reselect';
import unitsOfMeasureSelector from './unitsOfMeasureSelector';

export default createSelector(
  unitsOfMeasureSelector,
  unitsOfMeasure => unitsOfMeasure.toList().toJS()
);
