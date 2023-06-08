import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {
  addEndpointProperty,
  updateEndpointProperty,
  cancelEndpointEdit,
  loadIntegrationEndpoints,
  updateEndpoint,
} from '../actions';
import {
  showSelector,
  savingSelector,
  modelSelector,
  loadingSelector,
  dirtySelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import {IntegrationEndpointForm} from '.';
import {REFLEXIS_INTEGRATION_EDIT} from '../../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';

class EditIntegrationEndpointSidebar extends Component {

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleCancel() {
    this.props.cancelEndpointEdit();
  }

  handleSave() {
    event.preventDefault();

    const {updateEndpoint, model, loadIntegrationEndpoints} = this.props;
    updateEndpoint(model).then(loadIntegrationEndpoints);
  }

  handleFieldChange({target}) {
    const {id, value} = target;
    this.props.updateEndpointProperty(id, value);
  }

  handleAddingProperty() {
    this.props.addEndpointProperty();
  }

  handleNavigationToStatuses() {
    const {router, model} = this.props;
    router.push(`/reflexis/integration-endpoints/${model.get('id')}/requests`);
  }

  render() {
    const {
      show,
      saving,
      loading,
      model,
      canEdit,
      dirty,
      formValidationErrors,
      errorMessage,
    } = this.props;

    const hasStatus = true;

    if (!show) return null;

    return (
      <Sidebar className="reflexis-endpoint-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          dirty={dirty}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          hasPermission={canEdit}
          editActions={
            <Button bsStyle="link" bsSize="small" disabled={!hasStatus} onClick={this.handleNavigationToStatuses}>
              Integration Status
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="reflexis-endpoint" title="Edit Reflexis Endpoint" collapsible={false} />
          <IntegrationEndpointForm
            model={model}
            formValidationErrors={formValidationErrors}
            genericError={errorMessage}
            disabled={loading}
            create={false}
            onSubmit={this.handleSave}
            onFieldChange={this.handleFieldChange}
            onAddEndpointProperty={this.handleAddingProperty} />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const hasEditAccessSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_INTEGRATION_EDIT);
  return {
    show: showSelector(state),
    saving: savingSelector(state),
    loading: loadingSelector(state),
    model: modelSelector(state),
    formValidationErrors: validationErrorsSelector(state),
    errorMessage: 'Loading...',
    dirty: dirtySelector(state),
    canEdit: hasEditAccessSelector(state),
  };
}

const action = {
  addEndpointProperty,
  updateEndpointProperty,
  cancelEndpointEdit,
  loadIntegrationEndpoints,
  updateEndpoint,
};

EditIntegrationEndpointSidebar.propTypes = {
  /* Actions */
  addEndpointProperty: PropTypes.func.required,
  updateEndpointProperty: PropTypes.func.required,
  cancelEndpointEdit: PropTypes.func.required,
  loadIntegrationEndpoints: PropTypes.func.required,
  updateEndpoint: PropTypes.func.required,
};

export default withRouter(connect(mapStateToProps, action)(EditIntegrationEndpointSidebar));
