import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import {CreateEditModal} from '../../../shared/components';
import {handleApiError} from '../../../shared/services';
import {IntegrationEndpointForm} from './';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateEndpoint,
  updateEndpointProperty,
  createEndpoint,
  addEndpointProperty,
  loadIntegrationEndpoints,
} from '../actions';

class CreateIntegrationEndpointModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.cancelCreateEndpoint();
  }

  handleSave() {
    const {createEndpoint, router, model, loadIntegrationEndpoints} = this.props;
    createEndpoint(model)
      .then(loadIntegrationEndpoints)
      .catch(error => handleApiError(error, router, `An error occurred while attempting to add this endpoint. ${error}`));
  }

  handleFieldChange({target}) {
    const {id, value} = target;
    this.props.updateEndpointProperty(id, value);
  }

  handleAddingProperty() {
    this.props.addEndpointProperty();
  }

  render() {
    const {show, saving, model, formValidationErrors, errorMessage} = this.props;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={'New Integration Endpoint'}
        onCancel={this.handleCancel}
        onSave={this.handleSave} >
        <IntegrationEndpointForm
          model={model}
          formValidationErrors={formValidationErrors}
          genericError={errorMessage}
          disabled={false}
          create={false}
          onSubmit={this.handleSave}
          onFieldChange={this.handleFieldChange}
          onAddEndpointProperty={this.handleAddingProperty} />
      </CreateEditModal>
    );
  }
}

function makeMapStateToProps() {
  //const kronosEndpointStatusesSelector = makeSelectListOptionsArraySelector(KRONOS_ENDPOINT_STATUSES);

  return state => ({
    show: showSelector(state),
    saving: savingSelector(state),
    model: modelSelector(state),
    formValidationErrors: validationErrorsSelector(state),
    //  kronosEndpointStatuses: kronosEndpointStatusesSelector(state),
    //  kronosIntegrationVersion: kronosIntegrationVersionSelector(state),
  });
}

CreateIntegrationEndpointModal.propTypes = {
  show: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  formValidationErrors: PropTypes.object,

  //handler
  cancelCreateEndpoint: PropTypes.func.isRequired,
  updateEndpointProperty: PropTypes.func.isRequired,
  createEndpoint: PropTypes.func.isRequired,
  addEndpointProperty: PropTypes.func.isRequired,
  loadIntegrationEndpoints: PropTypes.func.isRequired,
};

const actions = {
  cancelCreateEndpoint,
  updateEndpointProperty,
  createEndpoint,
  addEndpointProperty,
  loadIntegrationEndpoints,
};

export default withRouter(connect(
  makeMapStateToProps(), actions
)(CreateIntegrationEndpointModal));
