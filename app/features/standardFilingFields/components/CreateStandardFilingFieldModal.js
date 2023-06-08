import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateEditStandardFilingFieldForm from './CreateEditStandardFilingFieldForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateStandardFilingField,
  createStandardFilingField,
  selectStandardFilingField,
  setCreateStandardFilingFieldModelProperty,
} from '../actions';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateStandardFilingFieldModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    let {value} = event.target;
    const {name, type, checked} = event.target;
    if (type === 'checkbox') value = checked;
    this.props.setCreateStandardFilingFieldModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createStandardFilingField, selectStandardFilingField, model, router} = this.props;

    createStandardFilingField(model)
      .then(response => {
        selectStandardFilingField(fromJS(response.action.payload.data));
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Standard Filing Field.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditStandardFilingFieldForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Standard Filing Field"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateStandardFilingField,
    setCreateStandardFilingFieldModelProperty,
    createStandardFilingField,
    selectStandardFilingField,
  }
)(CreateStandardFilingFieldModal));
