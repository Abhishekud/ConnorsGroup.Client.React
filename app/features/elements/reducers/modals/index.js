import {combineReducers} from 'redux';
import confirmOpenMassUpdate from './confirmOpenMassUpdate';
import createNonMOSTElement from './createNonMOSTElement';
import createMOSTElement from './createMOSTElement';
import deleteElement from './deleteElement';
import deleteSelectedSteps from './deleteSelectedSteps';
import duplicate from './duplicate';
import updateElements from './updateElements';
import deleteSelectedElements from './deleteSelectedElements';

export default combineReducers({
  confirmOpenMassUpdate,
  createNonMOSTElement,
  createMOSTElement,
  deleteElement,
  deleteSelectedSteps,
  deleteSelectedElements,
  duplicate,
  updateElements,
});
