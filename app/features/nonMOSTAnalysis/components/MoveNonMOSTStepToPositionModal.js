import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {
  cancelMoveNonMOSTStepToPosition,
  setMoveNonMOSTStepToPositionModelProperty,
  moveNonMOSTStep,
} from '../actions';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/moveToPosition';
import {nonMOSTStepScrollNodeSelector} from '../selectors/containers/nonMOSTSteps';
import {CreateEditModal} from '../../shared/components';
import {scrollToNode} from '../../shared/services';
import MoveNonMOSTStepToPositionForm from './MoveNonMOSTStepToPositionForm';
import {MOVE_NON_MOST_STEP_POSITION} from '../constants/moveNonMOSTStepActionTypes';
import {INSERT_BELOW_TARGET_ITEM, INSERT_BEHAVIORS_SELECT_LIST} from '../../shared/constants/moveToPositionBehaviors';

class MoveNonMOSTStepToPosition extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSave(e) {
    e.preventDefault();

    const {model, moveNonMOSTStep} = this.props;
    const id = model.get('id');

    const payload = {
      action: MOVE_NON_MOST_STEP_POSITION,
      position: model.get('position'),
      insertBelow: model.get('insertBehavior') === INSERT_BELOW_TARGET_ITEM,
    };

    moveNonMOSTStep(id, payload)
      .then(() => scrollToNode(this.props.scrollNode(id)));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setModelProperty(name, value);
  }

  render() {
    const {
      handleCancel,
      show,
      saving,
      model,
      validationErrors,
    } = this.props;

    const form =
      <MoveNonMOSTStepToPositionForm
        saving={saving}
        model={model}
        insertBehaviors={INSERT_BEHAVIORS_SELECT_LIST}
        validationErrors={validationErrors}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        form={form}
        title="Move Step to Position"
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    saving: savingSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    scrollNode: nonMOSTStepScrollNodeSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    handleCancel: cancelMoveNonMOSTStepToPosition,
    setModelProperty: setMoveNonMOSTStepToPositionModelProperty,
    moveNonMOSTStep,
  }
)(MoveNonMOSTStepToPosition);
