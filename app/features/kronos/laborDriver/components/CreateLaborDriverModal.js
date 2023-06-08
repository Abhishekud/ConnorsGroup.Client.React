import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../../shared/components';
import {handleApiError} from '../../../shared/services';
import {
  showSelector,
  modelSelector,
  validationErrorsSelector,
  savingSelector,
} from '../selectors/modals/createLaborDriver';
import {
  hideCreateModal,
  setPropertyForCreate,
  create,
} from '../actions';
import {LaborDriverForm} from './';

class CreateLaborDriverModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.hideCreateModal();
  }

  handleSave(event) {
    event.preventDefault();

    const {create, model, router} = this.props;
    create(model)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to save the Labor Driver.', 'error'));
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForCreate(id, value);
  }

  render() {
    const {show, saving, model, validationErrors} = this.props;
    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={'New Labor Driver'}
        onCancel={this.handleCancel}
        onSave={this.handleSave} >
        <LaborDriverForm
          onFieldChange={this.handleFieldChange}
          formValidationErrors={validationErrors}
          onSubmit={this.handleSave}
          model={model} />
      </CreateEditModal>
    );
  }
}

CreateLaborDriverModal.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,

  setPropertyForCreate: PropTypes.func.isRequired,
  hideCreateModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    saving: savingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps, {
    hideCreateModal,
    setPropertyForCreate,
    create,
  }
)(CreateLaborDriverModal));
