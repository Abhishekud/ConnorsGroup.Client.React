import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {
  cancelMoveMOSTStepToPosition,
  setMoveMOSTStepToPositionModelProperty,
  moveMOSTStep,
} from '../actions';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/moveToPosition';
import {mostStepScrollNodeSelector} from '../selectors/containers/mostSteps';
import {CreateEditModal} from '../../shared/components';
import {scrollToNode} from '../../shared/services';
import MoveMOSTStepToPositionForm from './MoveMOSTStepToPositionForm';
import {MOVE_MOST_STEP_POSITION} from '../constants/moveMOSTStepActionTypes';
import {INSERT_BELOW_TARGET_ITEM, INSERT_BEHAVIORS_SELECT_LIST} from '../../shared/constants/moveToPositionBehaviors';

class MoveMOSTStepToPosition extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSave(e) {
    e.preventDefault();

    const {model, moveMOSTStep} = this.props;
    const id = model.get('id');

    const payload = {
      action: MOVE_MOST_STEP_POSITION,
      position: model.get('position'),
      insertBelow: model.get('insertBehavior') === INSERT_BELOW_TARGET_ITEM,
    };

    moveMOSTStep(id, payload)
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
      <MoveMOSTStepToPositionForm
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
    scrollNode: mostStepScrollNodeSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    handleCancel: cancelMoveMOSTStepToPosition,
    setModelProperty: setMoveMOSTStepToPositionModelProperty,
    moveMOSTStep,
  }
)(MoveMOSTStepToPosition);
