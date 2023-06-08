import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditStandardFilingFieldOptionModelProperty,
  updateStandardFilingFieldOption,
  showDeleteStandardFilingFieldOption,
  closeEditStandardFilingFieldOptionSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  standardFilingFieldIdSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import CreateEditStandardFilingFieldOptionForm from './CreateEditStandardFilingFieldOptionForm';
import DeleteStandardFilingFieldOptionModal from './DeleteStandardFilingFieldOptionModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {selectedStandardFilingFieldSelector} from '../../standardsListManagement/selectors';

class EditStandardFilingFieldOptionSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditStandardFilingFieldOptionModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {
      updateStandardFilingFieldOption,
      closeEditStandardFilingFieldOptionSidebar,
      standardFilingFieldId,
      model,
      router,
    } = this.props;

    updateStandardFilingFieldOption(standardFilingFieldId, model)
      .then(() => closeEditStandardFilingFieldOptionSidebar())
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Standard Filing Field.'));
  }

  handleCancel() {
    this.props.closeEditStandardFilingFieldOptionSidebar();
  }

  handleDelete() {
    const {
      model,
      showDeleteStandardFilingFieldOption,
      standardFilingFieldId,
    } = this.props;
    showDeleteStandardFilingFieldOption(standardFilingFieldId, model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      selectedStandardFilingField,
      dirty,
      canEditFilingFields,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="edit-standard-filing-field-option-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onCancel={this.handleCancel} onSave={this.handleSave}
          hasPermission={canEditFilingFields}
          editActions={
            canEditFilingFields && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="standardFilingFieldOption" title={`Edit ${selectedStandardFilingField.get('name')}`} collapsible={false}>
            <CreateEditStandardFilingFieldOptionForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canEditFilingFields} />
          </SidebarSection>
          <DeleteStandardFilingFieldOptionModal />
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
    standardFilingFieldId: standardFilingFieldIdSelector(state),
    selectedStandardFilingField: selectedStandardFilingFieldSelector(state),
    dirty: dirtySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditStandardFilingFieldOptionModelProperty,
    updateStandardFilingFieldOption,
    showDeleteStandardFilingFieldOption,
    closeEditStandardFilingFieldOptionSidebar,
  }
)(EditStandardFilingFieldOptionSidebar));
