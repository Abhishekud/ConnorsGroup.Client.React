import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import MOSTStep from './MOSTStep';
import MOSTStepEditor from './MOSTStepEditor';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {ListItemInsertBar} from '../../shared/components';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  parentTypeSelector,
  parentIdSelector,
  creatingSelector,
  movingSelector,
  mostStepScrollNodeSelector,
  makeEditingMOSTStepSelector,
  makeSavingMOSTStepSelector,
  makeMOSTStepValidationErrorsSelector,
  makeMOSTStepParametersValidationErrorsSelector,
} from '../selectors/containers/mostSteps';
import {
  createMOSTStep,
  editMOSTStep,
  setMOSTStepModelProperty,
  setMOSTStepPhaseParameterModelProperty,
  showMOSTStepApplicationRulesPopup,
  cancelEditMOSTStep,
  updateMOSTStep,
  showDeleteMOSTStep,
  moveMOSTStep,
  showMoveMOSTStepToPosition,
} from '../actions';
import {
  selectedStepIdsSelector,
} from '../../elements/selectors/sidebars/bulkEdit';
import {handleApiError, scrollToNode} from '../../shared/services';
import {
  calculateMOSTStepAdjustedTMUs,
} from '../services';
import {TOOL_USE, EQUIPMENT_USE} from '../constants/sequenceModelTypes';
import {withRouter} from 'react-router';
import {
  loadMOSTElementDetails,
  toggleSelectElementStep,
} from '../../elements/actions';
import {parentTypes} from '../constants';

class MOSTStepContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {mostStep, editMOSTStep} = this.props;
    editMOSTStep(mostStep.get('id'));
  }

  handleMOSTStepFieldChanged(event) {
    const {name, value} = event.target;
    const {mostStep, setMOSTStepModelProperty} = this.props;

    setMOSTStepModelProperty(mostStep.get('id'), name, value);
  }

  handleMOSTStepPhaseParameterFieldChanged(mostPhaseNumber, mostParameterNumber, event) {
    const {name, type, checked} = event.target;

    let {value} = event.target;
    if (type === 'checkbox') value = checked;
    else if (name === 'indexValue') value = Number(value);

    const {mostStep, setMOSTStepPhaseParameterModelProperty} = this.props;

    setMOSTStepPhaseParameterModelProperty(mostStep.get('id'), mostPhaseNumber, mostParameterNumber, name, value);
  }

  handleMOSTStepPhaseParameterClicked(mostPhaseNumber, mostParameterNumber, mostParameterName, isToolAction) {
    const {mostType, mostStep, showMOSTStepApplicationRulesPopup} = this.props;
    showMOSTStepApplicationRulesPopup(
      mostType,
      mostStep.get('id'),
      mostStep.get('sequenceModelType') === TOOL_USE || mostStep.get('sequenceModelType') === EQUIPMENT_USE,
      mostPhaseNumber,
      mostParameterNumber,
      mostParameterName,
      isToolAction);
  }

  handleSave() {
    const {mostStep, updateMOSTStep, router, loadMOSTElementDetails, parentId, parentType} = this.props;
    updateMOSTStep(mostStep.get('id'), mostStep)
      .then(() => {
        if (parentType === parentTypes.ELEMENT) loadMOSTElementDetails(parentId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the MOST Step.'));
  }

  handleCancelEdit() {
    const {mostStep, cancelEditMOSTStep} = this.props;
    cancelEditMOSTStep(mostStep.get('id'));
  }

  handleDelete() {
    const {mostStep, showDeleteMOSTStep} = this.props;
    showDeleteMOSTStep(mostStep);
  }

  handleSimoToggle() {
    const {updateMOSTStep, router, loadMOSTElementDetails, parentId, parentType} = this.props;
    let mostStep = this.props.mostStep.asMutable();
    mostStep = mostStep.set('simultaneous', !mostStep.get('simultaneous'));
    mostStep = mostStep.set('adjustedMeasuredTimeMeasurementUnits', calculateMOSTStepAdjustedTMUs(mostStep));
    updateMOSTStep(mostStep.get('id'), mostStep)
      .then(() => {
        if (parentType === parentTypes.ELEMENT) loadMOSTElementDetails(parentId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the MOST Step.'));
  }

  handleCreate(insertAtNumber) {
    const {parentType, parentId, createMOSTStep, router, loadMOSTElementDetails} = this.props;
    createMOSTStep(parentType, parentId, insertAtNumber)
      .then(() => {
        if (parentType === parentTypes.ELEMENT) loadMOSTElementDetails(parentId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add the MOST Step.'));
  }

  handleMove(action) {
    const {mostStep, moveMOSTStep, loadMOSTElementDetails, parentId, parentType} = this.props;
    const id = mostStep.get('id');

    moveMOSTStep(id, {action}).then(() => {
      scrollToNode(this.props.scrollNode(id));
      if (parentType === parentTypes.ELEMENT) loadMOSTElementDetails(parentId);
    });
  }

  handleSelectElementStep() {
    const {toggleSelectElementStep, mostStep} = this.props;
    toggleSelectElementStep(mostStep.get('id'));
  }

  render() {
    const {
      readOnly,
      creating,
      editing,
      saving,
      moving,
      mostType,
      mostStep,
      mostStepsCount,
      timeFormat,
      stepValidationErrors,
      parametersValidationErrors,
      handleShowMoveToPosition,
      addScrollNode,
      selectedElementIds,
      disabledBulkEdit,
    } = this.props;

    let mostStepComponent;
    const isSelectedForBulkEdit = selectedElementIds.indexOf(mostStep.get('id')) >= 0;

    if (editing) {
      mostStepComponent = (
        <MOSTStepEditor
          mostType={mostType}
          mostStep={mostStep}
          timeFormat={timeFormat}
          readOnly={readOnly}
          disabled={readOnly || saving || creating || moving}
          stepValidationErrors={stepValidationErrors}
          parametersValidationErrors={parametersValidationErrors}
          canMove={mostStepsCount > 1}
          addScrollNode={addScrollNode}
          onMOSTStepFieldChanged={this.handleMOSTStepFieldChanged}
          onMOSTStepPhaseParameterFieldChanged={this.handleMOSTStepPhaseParameterFieldChanged}
          onMOSTStepPhaseParameterClicked={this.handleMOSTStepPhaseParameterClicked}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onDelete={this.handleDelete}
          onMove={this.handleMove}
          onMoveToPosition={handleShowMoveToPosition} />
      );
    } else {
      mostStepComponent = (
        <MOSTStep
          mostStep={mostStep}
          readOnly={readOnly}
          disabled={readOnly || saving || creating || moving}
          disabledBulkEdit={saving || creating || moving || disabledBulkEdit}
          timeFormat={timeFormat}
          canMove={mostStepsCount > 1}
          addScrollNode={addScrollNode}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onMove={this.handleMove}
          onMoveToPosition={handleShowMoveToPosition}
          isSelectedForBulkEdit={isSelectedForBulkEdit}
          onSelectElementStep={this.handleSelectElementStep}
          onSimoToggle={this.handleSimoToggle} />
      );
    }

    return (
      <div className="most-step-container">
        {mostStep.get('number') === 1
          ? <ListItemInsertBar onClick={this.handleCreate} disabled={readOnly} insertAtIndex={mostStep.get('number')} /> : null}
        {mostStepComponent}
        <ListItemInsertBar onClick={this.handleCreate} disabled={readOnly} insertAtIndex={mostStep.get('number') + 1} />
      </div>
    );
  }
}

MOSTStepContainer.propTypes = {
  mostType: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  disabledBulkEdit: PropTypes.bool,
  mostStep: PropTypes.instanceOf(Map),
  mostStepsCount: PropTypes.number.isRequired,
  addScrollNode: PropTypes.func.isRequired,
};

function makeMapStateToProps() {
  const editingSelector = makeEditingMOSTStepSelector();
  const savingSelector = makeSavingMOSTStepSelector();
  const stepValidationErrorsSelector = makeMOSTStepValidationErrorsSelector();
  const parametersValidationErrorsSelector = makeMOSTStepParametersValidationErrorsSelector();

  return (state, ownProps) => ({
    parentId: parentIdSelector(state),
    parentType: parentTypeSelector(state),
    creating: creatingSelector(state),
    editing: editingSelector(state, ownProps),
    saving: savingSelector(state, ownProps),
    moving: movingSelector(state, ownProps),
    timeFormat: timeFormatSelector(state),
    stepValidationErrors: stepValidationErrorsSelector(state, ownProps),
    parametersValidationErrors: parametersValidationErrorsSelector(state, ownProps),
    scrollNode: mostStepScrollNodeSelector(state),
    selectedElementIds: selectedStepIdsSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    createMOSTStep,
    editMOSTStep,
    setMOSTStepModelProperty,
    setMOSTStepPhaseParameterModelProperty,
    showMOSTStepApplicationRulesPopup,
    cancelEditMOSTStep,
    updateMOSTStep,
    showDeleteMOSTStep,
    moveMOSTStep,
    handleShowMoveToPosition: showMoveMOSTStepToPosition,
    loadMOSTElementDetails,
    toggleSelectElementStep,
  }
)(MOSTStepContainer));
