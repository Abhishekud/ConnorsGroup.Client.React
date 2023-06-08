import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {
  showSelector,
  modelSelector,
  dirtySelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import {
  cancelEdit,
  update,
  updateWfdEndpoint,
  setPropertyForEdit,
  showDeleteModal,
  loadEndpointsList,
} from '../actions';
import {
  EndpointForm,
  WfdEndpointForm,
} from './';
import {makeSelectListOptionsArraySelector} from '../../../selectListOptions/selectors';
import {KRONOS_ENDPOINT_STATUSES} from '../../../selectListOptions/constants/selectListTypes';
import kronosIntegrationVersionSelector from '../selectors/modals/createEndpoint/kronosIntegrationVersionSelector';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../constants/KronosVersions';

class EditEndpointSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.cancelEdit();
  }

  handleSave(event) {
    event.preventDefault();

    const {update, model, kronosIntegrationVersion} = this.props;
    const isWfd = kronosIntegrationVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFD;
    if (isWfd) {
      this.handleWfdSave(event);
    } else {
      update(model)
        .then(() => this.props.loadEndpointsList);
    }
  }

  handleWfdSave(event) {
    event.preventDefault();

    const {updateWfdEndpoint, model} = this.props;
    updateWfdEndpoint(model)
      .then(() => this.props.loadEndpointsList);
  }

  handleDelete() {
    const {showDeleteModal, model} = this.props;
    showDeleteModal(model);
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForEdit(id, value);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setPropertyForEdit(id, checked);
  }

  render() {
    const {
      show,
      saving,
      model,
      cancelEdit,
      dirty,
      formValidationErrors,
      kronosEndpointStatuses,
      kronosIntegrationVersion,
      canEdit,
    } = this.props;

    if (!show) return null;
    const isWfd = kronosIntegrationVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFD;
    return (
      <Sidebar className="classifications-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          dirty={dirty}
          onCancel={cancelEdit}
          onSave={this.handleSave}
          hasPermission={canEdit} />
        <div className="sidebar-scrollable">
          <SidebarSection className="kronos-endpoint" title="Edit Kronos Endpoint" collapsible={false} />
          {isWfd
            ? <WfdEndpointForm
              onFieldChange={this.handleFieldChange}
              formValidationErrors={formValidationErrors}
              //onSubmit={this.handleWfdSave}
              kronosEndpointStatuses={kronosEndpointStatuses}
              model={model}
              kronosIntegrationVersion={kronosIntegrationVersion}
              onCheckboxChange={this.handleCheckboxChange}
              disabled={!canEdit} />
            : <EndpointForm
              onFieldChange={this.handleFieldChange}
              formValidationErrors={formValidationErrors}
              //onSubmit={this.handleSave}
              kronosEndpointStatuses={kronosEndpointStatuses}
              model={model}
              disabled={!canEdit} />
          }
        </div>
      </Sidebar>
    );
  }
}

EditEndpointSidebar.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool,
  cancelEdit: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  setPropertyForEdit: PropTypes.func.isRequired,
};

function makeMapStateToProps() {
  const kronosEndpointStatusesSelector = makeSelectListOptionsArraySelector(KRONOS_ENDPOINT_STATUSES);

  return state => ({
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    dirty: dirtySelector(state),
    formValidationErrors: validationErrorsSelector(state),
    kronosEndpointStatuses: kronosEndpointStatusesSelector(state),
    kronosIntegrationVersion: kronosIntegrationVersionSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps, {
    cancelEdit,
    update,
    setPropertyForEdit,
    showDeleteModal,
    loadEndpointsList,
    updateWfdEndpoint,
  }
)(EditEndpointSidebar));
