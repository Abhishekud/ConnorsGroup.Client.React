import {createSelector} from 'reselect';
import modelSelector from './modelSelector';
import rulesSelector from './rulesSelector';

export default createSelector(
  modelSelector,
  rulesSelector,
  (model, rules) => {
    let parameterName = model.get('mostParameterName');
    const isToolAction = model.get('isToolAction');
    if (isToolAction && parameterName === 'L') parameterName = 'F';
    return rules.filter(rule => rule.get('parameter') === parameterName).sortBy(rule => rule.get('id'));
  }
);
