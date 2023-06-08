import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {handleApiError, scrollToNode} from '../../shared/services';
import {
  cancelSelectStandardElementGroupToMoveTo,
  setSelectStandardElementGroupToMoveToModelProperty,
  moveStandardElementToGroup,
  loadStandardDetails,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/modals/selectStandardElementGroupToMoveTo';
import {CreateEditModal} from '../../shared/components';
import SelectStandardElementGroupToMoveToForm from './SelectStandardElementGroupToMoveToForm';
import {standardElementGroupOptionsArraySelector, standardItemScrollNodeSelector} from '../selectors/pages/standardProfile';
import {withRouter} from 'react-router';

class SelectStandardElementGroupToMoveToModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setSelectStandardElementGroupToMoveToModelProperty(name, value);
  }

  handleOK(event) {
    event.preventDefault();

    const {moveStandardElementToGroup, model, router} = this.props;

    moveStandardElementToGroup(
      model.get('standardId'),
      model.get('standardElementId'),
      model.get('standardElementGroupId'),
    )
      .then(() => {
        this.props.loadStandardDetails(model.get('standardId'));
        scrollToNode(this.props.scrollNode(model.get('standardElementId')));
      })
      .catch(error => handleApiError(error, router, 'An error occurred moving the Standard Element to a group.'));
  }

  render() {
    const {
      show,
      saving,
      model,
      validationErrors,
      standardElementGroupOptions,
      handleCancel,
    } = this.props;

    const form =
      <SelectStandardElementGroupToMoveToForm
        saving={saving}
        model={model}
        standardElementGroupOptions={standardElementGroupOptions}
        validationErrors={validationErrors}
        onSubmit={this.handleOK}
        onFieldChange={this.handleFieldChange} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        form={form}
        title="Select Group to Move To"
        onCancel={handleCancel}
        onSave={this.handleOK} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    standardElementGroupOptions: standardElementGroupOptionsArraySelector(state),
    scrollNode: standardItemScrollNodeSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setSelectStandardElementGroupToMoveToModelProperty,
    handleCancel: cancelSelectStandardElementGroupToMoveTo,
    moveStandardElementToGroup,
    loadStandardDetails,
  },
)(SelectStandardElementGroupToMoveToModal));

