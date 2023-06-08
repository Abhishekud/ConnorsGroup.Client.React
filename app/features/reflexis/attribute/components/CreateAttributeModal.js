import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';

import {CreateEditModal} from '../../../shared/components';
import {handleApiError} from '../../../shared/services';
import {
  createAttribute,
  hideCreateAttributeModal,
  setCreateAttributeProperty,
  loadAttributes,
} from '../actions';
import {CreateEditAttributeForm} from './';
import {
  modelSelector,
  showSelector,
  savingSelector,
  formValidationErrorsSelector,
} from '../selectors/modals/createAttribute';

class CreateAttributeModal extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleSave(event) {
    event.preventDefault();
    const {createAttribute, loadAttributes, model, router} = this.props;

    createAttribute(model)
      .then(loadAttributes)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to trigger an integration.'));
  }

  handleCancel() {
    this.props.hideCreateAttributeModal();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateAttributeProperty(name, value);
  }

  render() {
    const {
      show,
      saving,
      model,
      formValidationErrors,
    } = this.props;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Attribute"
        onCancel={this.handleCancel}
        onSave={this.handleSave}>
        <CreateEditAttributeForm
          model={model}
          formValidationErrors={formValidationErrors}
          disabled={false}
          onSubmit={this.handleSave}
          onFieldChange={this.handleFieldChange} />
      </CreateEditModal>
    );
  }
}

CreateAttributeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  formValidationErrors: PropTypes.object,

  // actions
  createAttribute: PropTypes.func.isRequired,
  setCreateAttributeProperty: PropTypes.func.isRequired,
  hideCreateAttributeModal: PropTypes.func.isRequired,
  loadAttributes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  show: showSelector(state),
  saving: savingSelector(state),
  model: modelSelector(state),
  formValidationErrors: formValidationErrorsSelector(state),
});

const actions = {
  createAttribute,
  setCreateAttributeProperty,
  hideCreateAttributeModal,
  loadAttributes,
};

export default withRouter(connect(mapStateToProps, actions)(CreateAttributeModal));
