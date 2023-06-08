import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../../shared/components';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createEndpoint';
import {
  hideCreateModal,
  setPropertyForCreate,
  create,
  loadEndpointsList,
  createWfdEndpoint,
} from '../actions';
import {
  EndpointForm,
  WfdEndpointForm,
} from './';
import {makeSelectListOptionsArraySelector} from '../../../selectListOptions/selectors';
import {KRONOS_ENDPOINT_STATUSES} from '../../../selectListOptions/constants/selectListTypes';
import kronosIntegrationVersionSelector from '../selectors/modals/createEndpoint/kronosIntegrationVersionSelector';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../constants/KronosVersions';

class CreateEndpointModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.hideCreateModal();
  }

  handleSave(event) {
    event.preventDefault();

    const {create, model} = this.props;
    create(model)
      .then(() => this.props.loadEndpointsList);
  }

  handleWfdSave(event) {
    event.preventDefault();

    const {createWfdEndpoint, model} = this.props;
    createWfdEndpoint(model)
      .then(() => this.props.loadEndpointsList);
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForCreate(id, value);
  }


  render() {
    const {show, saving, model, formValidationErrors, kronosEndpointStatuses, kronosIntegrationVersion} = this.props;
    const isWfd = kronosIntegrationVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFD;
    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={'New Kronos Endpoint'}
        onCancel={this.handleCancel}
        onSave={isWfd ? this.handleWfdSave : this.handleSave} >
        {isWfd
          ? <WfdEndpointForm
            onFieldChange={this.handleFieldChange}
            formValidationErrors={formValidationErrors}
            kronosEndpointStatuses={kronosEndpointStatuses}
            model={model}
            kronosIntegrationVersion={kronosIntegrationVersion}
            create />
          : <EndpointForm
            onFieldChange={this.handleFieldChange}
            formValidationErrors={formValidationErrors}
            kronosEndpointStatuses={kronosEndpointStatuses}
            model={model}
            create />
        }
      </CreateEditModal>
    );
  }
}

CreateEndpointModal.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,

  setPropertyForCreate: PropTypes.func.isRequired,
  hideCreateModal: PropTypes.func.isRequired,
};

function makeMapStateToProps() {
  const kronosEndpointStatusesSelector = makeSelectListOptionsArraySelector(KRONOS_ENDPOINT_STATUSES);

  return state => ({
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    formValidationErrors: validationErrorsSelector(state),
    kronosEndpointStatuses: kronosEndpointStatusesSelector(state),
    kronosIntegrationVersion: kronosIntegrationVersionSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps, {
    hideCreateModal,
    setPropertyForCreate,
    create,
    loadEndpointsList,
    createWfdEndpoint,
  }
)(CreateEndpointModal));
