import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {
  cancelMoveStandardItemToPosition,
  setMoveStandardItemToPositionModelProperty,
  moveStandardItem,
} from '../actions';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/moveStandardItemToPosition';
import {standardItemScrollNodeSelector} from '../selectors/pages/standardProfile';
import {CreateEditModal} from '../../shared/components';
import MoveStandardItemToPositionForm from './MoveStandardItemToPositionForm';
import {MOVE_STANDARD_ITEM_POSITION} from '../constants/moveStandardItemActionTypes';
import {INSERT_BELOW_TARGET_ITEM, INSERT_BEHAVIORS_SELECT_LIST} from '../../shared/constants/moveToPositionBehaviors';
import {scrollToNode} from '../../shared/services';

class MoveStandardItemToPosition extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSave(event) {
    event.preventDefault();

    const {model, moveStandardItem} = this.props;
    const id = model.get('id');

    const payload = {
      actionType: MOVE_STANDARD_ITEM_POSITION,
      position: model.get('position'),
      insertBelow: model.get('insertBehavior') === INSERT_BELOW_TARGET_ITEM,
    };

    moveStandardItem(model.get('standardId'), id, payload)
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
      <MoveStandardItemToPositionForm
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
        title="Move Standard Item to Position"
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
    scrollNode: standardItemScrollNodeSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    handleCancel: cancelMoveStandardItemToPosition,
    setModelProperty: setMoveStandardItemToPositionModelProperty,
    moveStandardItem,
  }
)(MoveStandardItemToPosition);
