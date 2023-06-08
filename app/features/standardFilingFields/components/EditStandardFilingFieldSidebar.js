import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditStandardFilingFieldModelProperty,
  updateStandardFilingField,
  showDeleteStandardFilingField,
  closeEditStandardFilingFieldSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import CreateEditStandardFilingFieldForm from './CreateEditStandardFilingFieldForm';
import DeleteStandardFilingFieldModal from './DeleteStandardFilingFieldModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';

class EditStandardFilingFieldSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    let {value} = event.target;
    const {name, type, checked} = event.target;

    if (type === 'checkbox') value = checked;

    this.props.setEditStandardFilingFieldModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateStandardFilingField, closeEditStandardFilingFieldSidebar, model, router} = this.props;

    updateStandardFilingField(model)
      .then(() => closeEditStandardFilingFieldSidebar())
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Standard Filing Field.'));
  }

  handleCancel() {
    this.props.closeEditStandardFilingFieldSidebar();
  }

  handleDelete() {
    const {model, showDeleteStandardFilingField} = this.props;
    showDeleteStandardFilingField(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      canEditFilingFields,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="edit-standard-filing-field-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onCancel={this.handleCancel} onSave={this.handleSave}
          hasPermission={canEditFilingFields}
          editActions={
            canEditFilingFields && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="standardFilingField" title="Edit Filing Field" collapsible={false}>
            <CreateEditStandardFilingFieldForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canEditFilingFields} />
          </SidebarSection>
          <DeleteStandardFilingFieldModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditStandardFilingFieldModelProperty,
    updateStandardFilingField,
    showDeleteStandardFilingField,
    closeEditStandardFilingFieldSidebar,
  }
)(EditStandardFilingFieldSidebar));
