import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import NonMOSTStep from './NonMOSTStep';
import NonMOSTStepEditor from './NonMOSTStepEditor';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {ListItemInsertBar} from '../../shared/components';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  parentTypeSelector,
  parentIdSelector,
  creatingSelector,
  movingSelector,
  nonMOSTStepScrollNodeSelector,
  makeEditingNonMOSTStepSelector,
  makeSavingNonMOSTStepSelector,
  makeNonMOSTStepValidationErrorsSelector,
} from '../selectors/containers/nonMOSTSteps';
import {
  createNonMOSTStep,
  editNonMOSTStep,
  setNonMOSTStepModelProperty,
  cancelEditNonMOSTStep,
  updateNonMOSTStep,
  showDeleteNonMOSTStep,
  moveNonMOSTStep,
  showMoveNonMOSTStepToPosition,
} from '../actions';
import {
  selectedStepIdsSelector,
} from '../../elements/selectors/sidebars/bulkEdit';
import {handleApiError, scrollToNode} from '../../shared/services';
import {
  calculateNonMOSTStepAdjustedTMUs,
} from '../services';
import {withRouter} from 'react-router';
import {
  loadNonMOSTElementDetails,
  toggleSelectElementStep,
} from '../../elements/actions';
import {parentTypes} from '../constants';

class NonMOSTStepContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {nonMOSTStep, editNonMOSTStep} = this.props;
    editNonMOSTStep(nonMOSTStep.get('id'));
  }

  handleNonMOSTStepFieldChanged(event) {
    const {name, value} = event.target;
    const {nonMOSTStep, setNonMOSTStepModelProperty} = this.props;

    setNonMOSTStepModelProperty(nonMOSTStep.get('id'), name, value);
  }

  handleSave() {
    const {nonMOSTStep, timeFormat, updateNonMOSTStep, router, loadNonMOSTElementDetails, parentId, parentType} = this.props;
    updateNonMOSTStep(nonMOSTStep.get('id'), nonMOSTStep, timeFormat)
      .then(() => {
        if (parentType === parentTypes.ELEMENT) loadNonMOSTElementDetails(parentId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Timed Step.'));
  }

  handleCancelEdit() {
    const {nonMOSTStep, cancelEditNonMOSTStep} = this.props;
    cancelEditNonMOSTStep(nonMOSTStep.get('id'));
  }

  handleDelete() {
    const {nonMOSTStep, showDeleteNonMOSTStep} = this.props;
    showDeleteNonMOSTStep(nonMOSTStep);
  }

  handleSimoToggle() {
    const {updateNonMOSTStep, router, loadNonMOSTElementDetails, parentId, parentType} = this.props;
    let nonMOSTStep = this.props.nonMOSTStep.asMutable();
    nonMOSTStep = nonMOSTStep.set('simultaneous', !nonMOSTStep.get('simultaneous'));
    nonMOSTStep = nonMOSTStep.set('adjustedMeasuredTimeMeasurementUnits', calculateNonMOSTStepAdjustedTMUs(nonMOSTStep));
    updateNonMOSTStep(nonMOSTStep.get('id'), nonMOSTStep)
      .then(() => {
        if (parentType === parentTypes.ELEMENT) loadNonMOSTElementDetails(parentId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Timed Step.'));
  }

  handleCreate(insertAtNumber) {
    const {parentType, parentId, createNonMOSTStep, router, loadNonMOSTElementDetails} = this.props;
    createNonMOSTStep(parentType, parentId, insertAtNumber)
      .then(() => {
        if (parentType === parentTypes.ELEMENT) loadNonMOSTElementDetails(parentId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add the Timed Step.'));
  }

  handleMove(action) {
    const {nonMOSTStep, moveNonMOSTStep, loadNonMOSTElementDetails, parentId, parentType} = this.props;
    const id = nonMOSTStep.get('id');

    moveNonMOSTStep(id, {action}).then(() => {
      scrollToNode(this.props.scrollNode(id));
      if (parentType === parentTypes.ELEMENT) loadNonMOSTElementDetails(parentId);
    });
  }

  handleSelectElementStep() {
    const {toggleSelectElementStep, nonMOSTStep} = this.props;
    toggleSelectElementStep(nonMOSTStep.get('id'));
  }

  render() {
    const {
      readOnly,
      creating,
      editing,
      saving,
      moving,
      nonMOSTStep,
      nonMOSTStepsCount,
      timeFormat,
      stepValidationErrors,
      handleShowMoveToPosition,
      addScrollNode,
      selectedElementIds,
      disabledBulkEdit,
    } = this.props;

    let nonMOSTStepComponent;
    const isSelectedForBulkEdit = selectedElementIds.indexOf(nonMOSTStep.get('id')) >= 0;

    if (editing) {
      nonMOSTStepComponent = (
        <NonMOSTStepEditor
          nonMOSTStep={nonMOSTStep}
          timeFormat={timeFormat}
          readOnly={readOnly}
          disabled={readOnly || saving || creating || moving}
          stepValidationErrors={stepValidationErrors}
          canMove={nonMOSTStepsCount > 1}
          addScrollNode={addScrollNode}
          onNonMOSTStepFieldChanged={this.handleNonMOSTStepFieldChanged}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onDelete={this.handleDelete}
          onMove={this.handleMove}
          onMoveToPosition={handleShowMoveToPosition} />
      );
    } else {
      nonMOSTStepComponent = (
        <NonMOSTStep
          nonMOSTStep={nonMOSTStep}
          readOnly={readOnly}
          disabled={readOnly || saving || creating || moving}
          disabledBulkEdit={saving || creating || moving || disabledBulkEdit}
          timeFormat={timeFormat}
          canMove={nonMOSTStepsCount > 1}
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
      <div className="non-most-step-container">
        {nonMOSTStep.get('number') === 1
          ? <ListItemInsertBar onClick={this.handleCreate} disabled={readOnly}
            insertAtIndex={nonMOSTStep.get('number')} /> : null}
        {nonMOSTStepComponent}
        <ListItemInsertBar onClick={this.handleCreate} disabled={readOnly}
          insertAtIndex={nonMOSTStep.get('number') + 1} />
      </div>
    );
  }
}

NonMOSTStepContainer.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  disabledBulkEdit: PropTypes.bool,
  nonMOSTStep: PropTypes.instanceOf(Map),
  nonMOSTStepsCount: PropTypes.number.isRequired,
  addScrollNode: PropTypes.func.isRequired,
};

function makeMapStateToProps() {
  const editingSelector = makeEditingNonMOSTStepSelector();
  const savingSelector = makeSavingNonMOSTStepSelector();
  const stepValidationErrorsSelector = makeNonMOSTStepValidationErrorsSelector();

  return (state, ownProps) => ({
    parentId: parentIdSelector(state),
    parentType: parentTypeSelector(state),
    creating: creatingSelector(state),
    editing: editingSelector(state, ownProps),
    saving: savingSelector(state, ownProps),
    moving: movingSelector(state, ownProps),
    timeFormat: timeFormatSelector(state),
    stepValidationErrors: stepValidationErrorsSelector(state, ownProps),
    scrollNode: nonMOSTStepScrollNodeSelector(state),
    selectedElementIds: selectedStepIdsSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    createNonMOSTStep,
    editNonMOSTStep,
    setNonMOSTStepModelProperty,
    cancelEditNonMOSTStep,
    updateNonMOSTStep,
    showDeleteNonMOSTStep,
    moveNonMOSTStep,
    handleShowMoveToPosition: showMoveNonMOSTStepToPosition,
    loadNonMOSTElementDetails,
    toggleSelectElementStep,
  }
)(NonMOSTStepContainer));
