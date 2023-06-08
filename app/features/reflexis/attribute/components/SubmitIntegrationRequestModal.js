import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';

import {REFLEXIS_INTEGRATION_ENDPOINTS} from '../../../selectListOptions/constants/selectListTypes';
import {CreateEditModal} from '../../../shared/components';
import {Select} from '../../../forms/components';
import {handleApiError} from '../../../shared/services';
import {loadSelectListOptions} from '../../../selectListOptions/actions';
import {
  showModalSelector,
  processingSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createIntegrationRequest';
import {
  createIntegrationRequest,
  setCreateIntegrationRequestProperty,
  hideCreateIntegrationRequestModal,
} from '../actions';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../../selectListOptions/selectors';

class SubmitIntegrationRequestModal extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    const {loadSelectListOptions, router} = this.props;
    loadSelectListOptions(REFLEXIS_INTEGRATION_ENDPOINTS)
      .catch(error => handleApiError(error, router, 'Unable to load Reflexis integration endpoints.'));
  }

  handleSave(event) {
    event.preventDefault();
    const {createIntegrationRequest, model, router} = this.props;

    createIntegrationRequest(model)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to trigger an integration.'));
  }

  handleCancel() {
    this.props.hideCreateIntegrationRequestModal();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateIntegrationRequestProperty(name, value);
  }

  render() {
    const {
      show,
      saving,
      endpoints,
      model,
      processing,
      validationErrors,
    } = this.props;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New integration request"
        onCancel={this.handleCancel}
        onSave={this.handleSave}>
        <form onSubmit={this.handleSave}>
          <fieldset disabled={processing}>
            <Select
              id="endpointId" label="Integration Endpoint"
              value={model.get('endpointId')} options={endpoints}
              onChange={this.handleFieldChange} formValidationErrors={validationErrors} />
          </fieldset>
        </form>
      </CreateEditModal>
    );
  }
}

SubmitIntegrationRequestModal.propTypes = {
  show: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  endpoints: PropTypes.array,
  model: PropTypes.object.isRequired,

  loadSelectListOptions: PropTypes.func.isRequired,
  createIntegrationRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const endpointsSelector = makeSelectListOptionsArrayWithBlankSelector(REFLEXIS_INTEGRATION_ENDPOINTS);

  return {
    show: showModalSelector(state),
    saving: processingSelector(state),
    endpoints: endpointsSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
};

const actions = {
  createIntegrationRequest,
  loadSelectListOptions,
  setCreateIntegrationRequestProperty,
  hideCreateIntegrationRequestModal,
};

export default withRouter(connect(mapStateToProps, actions)(SubmitIntegrationRequestModal));
